export const SITE_NAME = "PicShrink";

export const SITE_TAGLINE = "Free Online Image Compressor & Resizer";

export const SITE_DESCRIPTION =
  "Compress and resize JPG, PNG, WebP and AVIF images free online. Your files are processed in your browser and never uploaded — fast, private, no watermarks.";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@picshrink.app";

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
