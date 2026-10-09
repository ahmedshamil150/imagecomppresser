import ToolPage, { toolPageMetadata } from "@/components/ToolPage";

const page = {
  path: "/bulk-image-compressor",
  title: "Bulk Image Compressor — Compress Multiple Images at Once",
  description:
    "Compress multiple images at once for free. Batch-compress up to 30 JPG, PNG, WebP or AVIF files in your browser and download them as a ZIP — no upload, no watermark.",
  h1: "Bulk Image Compressor",
  intro:
    "Compress dozens of images in one go. Drop up to 30 JPG, PNG, WebP or AVIF files, let PickShrink optimize them all with the same settings, and download the whole batch as a single ZIP file — everything stays in your browser.",
  sectionHeading: "Batch compression that respects your time",
  paragraphs: [
    "Optimizing images one by one is the most tedious part of publishing content. Whether you are preparing a product catalog, a photo gallery, or a folder of screenshots, batch compression turns an hour of clicking into a few seconds of waiting.",
    "PickShrink processes files two at a time to keep your device responsive, shows per-file savings as each result lands, and lets you re-run the entire batch with different quality settings instantly. The final ZIP keeps your original file names with a -pickshrink suffix so nothing collides.",
  ],
  bullets: [
    "Up to 30 images per batch",
    "One quality/format setting applied to the whole batch",
    "Live savings shown per file and for the total",
    "Single ZIP download with de-duplicated file names",
    "Re-run the batch instantly with new settings",
    "No upload — the entire batch is processed on your device",
  ],
  stepsTitle: "How to compress multiple images",
  steps: [
    {
      name: "Drop a folder of images",
      text: "Select up to 30 files at once from the picker, or drag them straight from your file manager.",
    },
    {
      name: "Tune one setting for all",
      text: "Pick format, quality and optional resize — every queued image re-optimizes automatically.",
    },
    {
      name: "Download the ZIP",
      text: "Hit Download all to receive every compressed image in one archive.",
    },
  ],
  faqs: [
    {
      question: "How many images can I compress at once?",
      answer:
        "Up to 30 files per batch, limited only by your device's memory. For larger sets, run a second batch — the tool resets in one click.",
    },
    {
      question: "Do all files get the same quality setting?",
      answer:
        "Yes, one setting applies to the whole batch, which keeps results consistent. If one file needs different treatment, remove it and process it separately.",
    },
    {
      question: "Will the ZIP keep my original file names?",
      answer:
        "Names are kept with a -pickshrink suffix and the new extension (for example photo-pickshrink.webp). Duplicates are renamed automatically so no file overwrites another.",
    },
    {
      question: "Is bulk compression free?",
      answer:
        "Completely free with no account and no watermarks. Because processing happens in your browser, there is no server cost to pass on to you.",
    },
    {
      question: "Can I compress images on a tablet or phone?",
      answer:
        "Yes. The batch picker and ZIP download both work on mobile browsers, so you can clean up a camera roll from your phone.",
    },
  ],
  related: [
    { href: "/compress-image", label: "Single image compressor" },
    { href: "/resize-image", label: "Resize images" },
    { href: "/png-to-webp", label: "PNG to WebP" },
    { href: "/jpg-to-webp", label: "JPG to WebP" },
    { href: "/blog/compress-images-in-bulk", label: "Bulk compression guide" },
  ],
};

export const metadata = toolPageMetadata(page);

export default function BulkImageCompressorPage() {
  return <ToolPage {...page} />;
}
