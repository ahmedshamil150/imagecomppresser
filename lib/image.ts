export type OutputFormat = "image/jpeg" | "image/webp" | "image/png" | "image/avif";

export type FormatChoice = OutputFormat | "auto";

export type ResizeMode = "none" | "width" | "percent" | "max";

export interface ProcessOptions {
  format: FormatChoice;
  quality: number;
  resizeMode: ResizeMode;
  resizeValue: number;
}

export interface Processed {
  blob: Blob;
  name: string;
  format: OutputFormat;
  width: number;
  height: number;
  sourceWidth: number;
  sourceHeight: number;
  sourceBytes: number;
  sourceType: string;
}

export const FORMAT_EXT: Record<OutputFormat, string> = {
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/png": "png",
  "image/avif": "avif",
};

export const FORMAT_LABEL: Record<OutputFormat, string> = {
  "image/jpeg": "JPG",
  "image/webp": "WebP",
  "image/png": "PNG",
  "image/avif": "AVIF",
};

export const IMAGE_EXT_RE = /\.(jpe?g|png|webp|avif|gif|bmp|ico|tiff?)$/i;

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/") || IMAGE_EXT_RE.test(file.name);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function savedPercent(before: number, after: number): number {
  if (before <= 0) return 0;
  return Math.round((1 - after / before) * 100);
}

export function resolveFormat(
  sourceType: string,
  sourceName: string,
  choice: FormatChoice,
): OutputFormat {
  if (choice !== "auto") return choice;
  const type = sourceType.toLowerCase();
  const name = sourceName.toLowerCase();
  if (type === "image/jpeg" || type === "image/jpg" || /\.jpe?g$/.test(name))
    return "image/jpeg";
  if (type === "image/webp") return "image/webp";
  if (type === "image/avif") return "image/avif";
  if (type === "image/png" || /\.png$/.test(name)) return "image/webp";
  if (type === "image/gif") return "image/webp";
  if (type === "image/bmp" || type === "image/tiff") return "image/webp";
  return "image/webp";
}

interface Decoded {
  source: CanvasImageSource;
  width: number;
  height: number;
  close: () => void;
}

async function decodeViaImage(file: File): Promise<Decoded> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("decode-failed"));
      el.src = url;
    });
    if (!img.naturalWidth || !img.naturalHeight) {
      throw new Error("decode-failed");
    }
    return {
      source: img,
      width: img.naturalWidth,
      height: img.naturalHeight,
      close: () => URL.revokeObjectURL(url),
    };
  } catch (err) {
    URL.revokeObjectURL(url);
    throw err;
  }
}

async function decode(file: File): Promise<Decoded> {
  if (!isImageFile(file)) throw new Error("not-an-image");
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      if (bitmap.width && bitmap.height) {
        return {
          source: bitmap,
          width: bitmap.width,
          height: bitmap.height,
          close: () => bitmap.close(),
        };
      }
      bitmap.close();
    } catch {
      // fall through to <img> decoding
    }
  }
  return decodeViaImage(file);
}

function computeTargetSize(
  sourceWidth: number,
  sourceHeight: number,
  mode: ResizeMode,
  value: number,
): { width: number; height: number } {
  const clamp = (n: number) => Math.max(1, Math.round(n));
  switch (mode) {
    case "percent":
      return {
        width: clamp((sourceWidth * value) / 100),
        height: clamp((sourceHeight * value) / 100),
      };
    case "width": {
      const scale = value / sourceWidth;
      return { width: clamp(value), height: clamp(sourceHeight * scale) };
    }
    case "max": {
      const longest = Math.max(sourceWidth, sourceHeight);
      if (longest <= value) return { width: sourceWidth, height: sourceHeight };
      const scale = value / longest;
      return {
        width: clamp(sourceWidth * scale),
        height: clamp(sourceHeight * scale),
      };
    }
    default:
      return { width: sourceWidth, height: sourceHeight };
  }
}

function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function drawScaled(
  ctx: CanvasRenderingContext2D,
  decoded: Decoded,
  targetWidth: number,
  targetHeight: number,
) {
  const { source, width, height } = decoded;
  let src: CanvasImageSource = source;
  let srcWidth = width;
  let srcHeight = height;
  let working: HTMLCanvasElement | null = null;

  while (srcWidth / 2 >= targetWidth && srcHeight / 2 >= targetHeight) {
    const nextWidth = Math.max(targetWidth, Math.floor(srcWidth / 2));
    const nextHeight = Math.max(targetHeight, Math.floor(srcHeight / 2));
    const half = createCanvas(nextWidth, nextHeight);
    const halfCtx = half.getContext("2d");
    if (!halfCtx) break;
    halfCtx.imageSmoothingEnabled = true;
    halfCtx.imageSmoothingQuality = "high";
    halfCtx.drawImage(src, 0, 0, nextWidth, nextHeight);
    if (working && working !== half) {
      working.width = 0;
      working.height = 0;
    }
    working = half;
    src = half;
    srcWidth = nextWidth;
    srcHeight = nextHeight;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(src, 0, 0, targetWidth, targetHeight);

  if (working) {
    working.width = 0;
    working.height = 0;
  }
}

type AvifModule = {
  encode: (
    data: ImageData,
    width: number,
    height: number,
    options: Record<string, unknown>,
  ) => Uint8Array | null;
};

let avifModulePromise: Promise<AvifModule> | null = null;

async function encodeAvif(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  const [{ default: factory }, { initEmscriptenModule }, { defaultOptions }] =
    await Promise.all([
      import("@jsquash/avif/codec/enc/avif_enc.js"),
      import("@jsquash/avif/utils.js"),
      import("@jsquash/avif/meta.js"),
    ]);
  if (!avifModulePromise) {
    avifModulePromise = initEmscriptenModule(factory) as unknown as Promise<AvifModule>;
  }
  const mod = await avifModulePromise;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas-unavailable");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const output = mod.encode(imageData, canvas.width, canvas.height, {
    ...defaultOptions,
    quality,
    speed: 8,
  });
  if (!output) throw new Error("avif-encode-failed");
  return new Blob([new Uint8Array(output)], { type: "image/avif" });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: OutputFormat,
  quality: number,
): Promise<Blob> {
  if (format === "image/avif") return encodeAvif(canvas, quality);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error(`encode-failed:${format}`));
      },
      format,
      format === "image/png" ? undefined : quality / 100,
    );
  });
}

function outputName(name: string, format: OutputFormat): string {
  const base = name.replace(/\.[^.]+$/, "") || "image";
  return `${base}-picshrink.${FORMAT_EXT[format]}`;
}

export async function processFile(
  file: File,
  options: ProcessOptions,
): Promise<Processed> {
  const decoded = await decode(file);
  let canvas: HTMLCanvasElement | null = null;
  try {
    const format = resolveFormat(file.type, file.name, options.format);
    const target = computeTargetSize(
      decoded.width,
      decoded.height,
      options.resizeMode,
      options.resizeValue,
    );

    canvas = createCanvas(target.width, target.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas-unavailable");

    if (format === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, target.width, target.height);
    }
    drawScaled(ctx, decoded, target.width, target.height);

    const blob = await canvasToBlob(canvas, format, options.quality);

    return {
      blob,
      name: outputName(file.name, format),
      format,
      width: target.width,
      height: target.height,
      sourceWidth: decoded.width,
      sourceHeight: decoded.height,
      sourceBytes: file.size,
      sourceType: file.type || guessType(file.name),
    };
  } finally {
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
    decoded.close();
  }
}

function guessType(name: string): string {
  const lower = name.toLowerCase();
  if (/\.jpe?g$/.test(lower)) return "image/jpeg";
  if (/\.png$/.test(lower)) return "image/png";
  if (/\.webp$/.test(lower)) return "image/webp";
  if (/\.avif$/.test(lower)) return "image/avif";
  if (/\.gif$/.test(lower)) return "image/gif";
  if (/\.bmp$/.test(lower)) return "image/bmp";
  return "image/*";
}
