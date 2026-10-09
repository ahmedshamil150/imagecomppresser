"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  formatBytes,
  isImageFile,
  processFile,
  savedPercent,
  FORMAT_LABEL,
  type FormatChoice,
  type OutputFormat,
  type ProcessOptions,
  type Processed,
  type ResizeMode,
} from "@/lib/image";

interface Item {
  id: string;
  file: File;
  status: "queued" | "processing" | "done" | "error";
  result?: Processed;
  url?: string;
  error?: string;
}

export interface ToolPreset {
  format?: FormatChoice;
  hideFormat?: boolean;
  resizeMode?: ResizeMode;
  resizeValue?: number;
  hideResize?: boolean;
}

interface Props {
  preset?: ToolPreset;
}

const MAX_FILES = 30;
const CONCURRENCY = 2;

const FORMAT_OPTIONS: { value: FormatChoice; label: string }[] = [
  { value: "auto", label: "Auto (best compression)" },
  { value: "image/jpeg", label: "JPG" },
  { value: "image/webp", label: "WebP" },
  { value: "image/png", label: "PNG (lossless)" },
  { value: "image/avif", label: "AVIF (smallest)" },
];

const RESIZE_OPTIONS: { value: ResizeMode; label: string; unit: string }[] = [
  { value: "none", label: "Keep original size", unit: "" },
  { value: "percent", label: "Scale to %", unit: "%" },
  { value: "width", label: "Set width", unit: "px wide" },
  { value: "max", label: "Max longest side", unit: "px max" },
];

function errorText(err: unknown): string {
  if (err instanceof Error) {
    if (err.message === "not-an-image") return "That file is not an image.";
    if (err.message.startsWith("decode"))
      return "Could not read this image — the format may not be supported by your browser.";
    if (err.message.startsWith("encode"))
      return "Encoding failed — try a different output format.";
  }
  return "Something went wrong while processing this file.";
}

export default function ImageTool({ preset }: Props) {
  const [format, setFormat] = useState<FormatChoice>(
    preset?.hideFormat && preset.format ? preset.format : (preset?.format ?? "auto"),
  );
  const [quality, setQuality] = useState(80);
  const [resizeMode, setResizeMode] = useState<ResizeMode>(preset?.resizeMode ?? "none");
  const [resizeValue, setResizeValue] = useState(preset?.resizeValue ?? 1200);
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const itemsRef = useRef<Item[]>([]);
  const runIdRef = useRef(0);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<ProcessOptions>({
    format,
    quality,
    resizeMode,
    resizeValue,
  });

  const commit = useCallback((next: Item[]) => {
    itemsRef.current = next;
    setItems(next);
  }, []);

  const runQueue = useCallback(
    async (targets: Item[], opts: ProcessOptions) => {
      if (!targets.length) return;
      const runId = ++runIdRef.current;
      setBusy(true);
      commit(
        itemsRef.current.map((item) =>
          targets.some((t) => t.id === item.id)
            ? { ...item, status: "queued" as const, error: undefined }
            : item,
        ),
      );

      let index = 0;
      const worker = async () => {
        while (index < targets.length) {
          if (runIdRef.current !== runId) return;
          const item = targets[index++];
          commit(
            itemsRef.current.map((i) =>
              i.id === item.id ? { ...i, status: "processing" as const } : i,
            ),
          );
          try {
            const result = await processFile(item.file, opts);
            if (runIdRef.current !== runId) return;
            const url = URL.createObjectURL(result.blob);
            commit(
              itemsRef.current.map((i) => {
                if (i.id !== item.id) return i;
                if (i.url) URL.revokeObjectURL(i.url);
                return { ...i, status: "done" as const, result, url, error: undefined };
              }),
            );
          } catch (err) {
            if (runIdRef.current !== runId) return;
            commit(
              itemsRef.current.map((i) =>
                i.id === item.id
                  ? { ...i, status: "error" as const, error: errorText(err), url: undefined }
                  : i,
              ),
            );
          }
        }
      };

      await Promise.all(
        Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker),
      );
      if (runIdRef.current === runId) setBusy(false);
    },
    [commit],
  );

  const addFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || !fileList.length) return;
      const incoming = Array.from(fileList);
      const images = incoming.filter(isImageFile);
      const skipped = incoming.length - images.length;
      const room = MAX_FILES - itemsRef.current.length;
      const accepted = images.slice(0, Math.max(0, room));

      if (skipped > 0) {
        setNotice(`${skipped} non-image file${skipped > 1 ? "s were" : " was"} skipped.`);
      } else if (images.length > accepted.length) {
        setNotice(`Batch limit is ${MAX_FILES} images — extra files were not added.`);
      } else {
        setNotice(null);
      }
      if (!accepted.length) return;

      const next = [
        ...itemsRef.current,
        ...accepted.map<Item>((file) => ({
          id: `f${++idRef.current}`,
          file,
          status: "queued",
        })),
      ];
      commit(next);
      void runQueue(
        next.filter((i) => accepted.includes(i.file)),
        optionsRef.current,
      );
    },
    [commit, runQueue],
  );

  useEffect(() => {
    optionsRef.current = { format, quality, resizeMode, resizeValue };
    if (!itemsRef.current.length) return;
    const timer = setTimeout(() => {
      void runQueue(itemsRef.current, optionsRef.current);
    }, 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, quality, resizeMode, resizeValue]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      runIdRef.current++;
      itemsRef.current.forEach((i) => {
        if (i.url) URL.revokeObjectURL(i.url);
      });
    };
  }, []);

  const removeItem = (id: string) => {
    const target = itemsRef.current.find((i) => i.id === id);
    if (target?.url) URL.revokeObjectURL(target.url);
    commit(itemsRef.current.filter((i) => i.id !== id));
  };

  const clearAll = () => {
    runIdRef.current++;
    itemsRef.current.forEach((i) => {
      if (i.url) URL.revokeObjectURL(i.url);
    });
    commit([]);
    setBusy(false);
    setNotice(null);
  };

  const triggerDownload = (href: string, name: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadItem = (item: Item) => {
    if (item.url && item.result) triggerDownload(item.url, item.result.name);
  };

  const downloadAll = async () => {
    const done = itemsRef.current.filter((i) => i.status === "done" && i.result);
    if (!done.length) return;
    if (done.length === 1) {
      downloadItem(done[0]);
      return;
    }
    setZipping(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const used = new Set<string>();
      for (const item of done) {
        const result = item.result!;
        let name = result.name;
        let counter = 2;
        while (used.has(name)) {
          name = result.name.replace(/(\.[^.]+)$/, `-${counter}$1`);
          counter++;
        }
        used.add(name);
        zip.file(name, result.blob);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "picshrink-images.zip");
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } finally {
      setZipping(false);
    }
  };

  const doneItems = items.filter((i) => i.status === "done" && i.result);
  const totalBefore = doneItems.reduce((sum, i) => sum + i.result!.sourceBytes, 0);
  const totalAfter = doneItems.reduce((sum, i) => sum + i.result!.blob.size, 0);
  const allSettled =
    items.length > 0 && items.every((i) => i.status === "done" || i.status === "error");

  const hideFormat = Boolean(preset?.hideFormat);
  const lockedFormat = preset?.format && preset.format !== "auto"
    ? (preset.format as OutputFormat)
    : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-xs font-medium text-slate-500">
        100% private — images are processed in your browser and never uploaded.
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {items.length === 0 ? (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
              dragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-300 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/40"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mb-3 h-10 w-10 text-indigo-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18v-1.5M16.5 12 12 7.5 7.5 12M12 7.5V16.5"
              />
            </svg>
            <span className="text-base font-semibold text-slate-800">
              Drag &amp; drop your images here
            </span>
            <span className="mt-1 text-sm text-slate-500">
              or click to browse — JPG, PNG, WebP, AVIF, GIF, BMP
            </span>
            <span className="mt-3 flex flex-wrap justify-center gap-2 text-[11px] font-medium">
              {["No upload", "No watermark", "Free", "Up to 30 files"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-indigo-700"
                >
                  {badge}
                </span>
              ))}
            </span>
          </label>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              Add more images
            </label>
            <span className="text-xs text-slate-500">
              {items.length} / {MAX_FILES} files in this batch
            </span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          {!hideFormat && (
            <div>
              <label htmlFor="tool-format" className="mb-1.5 block text-sm font-medium text-slate-700">
                Output format
              </label>
              <select
                id="tool-format"
                value={format}
                onChange={(e) => setFormat(e.target.value as FormatChoice)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {FORMAT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {hideFormat && lockedFormat && (
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Output format</span>
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
                {FORMAT_LABEL[lockedFormat]}
              </div>
            </div>
          )}
          {!preset?.hideResize && (
            <div>
              <label htmlFor="tool-resize-mode" className="mb-1.5 block text-sm font-medium text-slate-700">
                Resize
              </label>
              <select
                id="tool-resize-mode"
                value={resizeMode}
                onChange={(e) => setResizeMode(e.target.value as ResizeMode)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {RESIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!preset?.hideResize && resizeMode !== "none" && (
            <div>
              <label htmlFor="tool-resize-value" className="mb-1.5 block text-sm font-medium text-slate-700">
                Value
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="tool-resize-value"
                  type="number"
                  min={1}
                  max={resizeMode === "percent" ? 400 : 20000}
                  value={resizeValue}
                  onChange={(e) => setResizeValue(Number(e.target.value) || 1)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <span className="whitespace-nowrap text-xs text-slate-500">
                  {RESIZE_OPTIONS.find((o) => o.value === resizeMode)?.unit}
                </span>
              </div>
            </div>
          )}
          <div className={preset?.hideResize ? "sm:col-span-2" : ""}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <label htmlFor="tool-quality" className="block text-sm font-medium text-slate-700">
                Quality
              </label>
              <span className="text-xs font-semibold text-indigo-600">{quality}</span>
            </div>
            <input
              id="tool-quality"
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <p className="mt-1 text-xs text-slate-400">
              Applies to JPG, WebP and AVIF. PNG stays lossless.
            </p>
          </div>
        </div>

        {notice && (
          <p role="status" className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
            {notice}
          </p>
        )}

        {items.length > 0 && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p role="status" className="text-sm text-slate-600">
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                    Optimizing…
                  </span>
                ) : allSettled && doneItems.length > 0 ? (
                  <span>
                    Saved{" "}
                    <strong className="text-emerald-600">
                      {formatBytes(Math.max(0, totalBefore - totalAfter))} (
                      {savedPercent(totalBefore, totalAfter)}%)
                    </strong>{" "}
                    across {doneItems.length} image{doneItems.length > 1 ? "s" : ""}.
                  </span>
                ) : null}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => void downloadAll()}
                  disabled={zipping || !doneItems.length}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {zipping ? "Preparing…" : doneItems.length > 1 ? "Download all (ZIP)" : "Download"}
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>

            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {item.status === "done" && item.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className={`h-full w-full ${
                          item.status === "processing" || item.status === "queued"
                            ? "animate-pulse bg-indigo-100"
                            : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {item.file.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.status === "error" ? (
                        <span className="text-red-600">{item.error}</span>
                      ) : item.status === "done" && item.result ? (
                        <>
                          {item.result.sourceWidth}×{item.result.sourceHeight} →{" "}
                          {item.result.width}×{item.result.height} ·{" "}
                          {formatBytes(item.result.sourceBytes)} →{" "}
                          {formatBytes(item.result.blob.size)}{" "}
                          <span className="font-semibold text-emerald-600">
                            −{savedPercent(item.result.sourceBytes, item.result.blob.size)}%
                          </span>{" "}
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
                            {FORMAT_LABEL[item.result.format]}
                          </span>
                        </>
                      ) : (
                        "Processing…"
                      )}
                    </p>
                  </div>
                  {item.status === "done" && (
                    <button
                      type="button"
                      onClick={() => downloadItem(item)}
                      className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
                    >
                      Download
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.file.name}`}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  >
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
