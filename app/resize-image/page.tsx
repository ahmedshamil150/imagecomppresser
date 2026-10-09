import ToolPage, { toolPageMetadata } from "@/components/ToolPage";

const page = {
  path: "/resize-image",
  title: "Resize Images Online — Free Image Resizer No Software",
  description:
    "Resize images online for free. Change photo dimensions by width, percentage or maximum size in your browser — aspect ratio preserved, no upload, no watermark.",
  h1: "Resize Images Online",
  intro:
    "Resize any image to exact dimensions in seconds. Set a target width, scale by percentage, or cap the longest side — PickShrink keeps the aspect ratio intact and sharpens the result with step-wise downscaling, all locally in your browser.",
  preset: { resizeMode: "width" as const, resizeValue: 1200 },
  sectionHeading: "Resize images the right way",
  paragraphs: [
    "Resizing is more than shrinking pixels — it is about how those pixels are resampled. A naive one-shot downscale turns fine detail into mush, especially on photos with text, foliage, or high contrast edges. PickShrink scales images down in repeated halving steps, which preserves detail the way professional editors do.",
    "Choose your mode above: set an exact pixel width for a blog header, scale by percentage for a quick reduction, or set the maximum longest side to fit a 1600 px social-media limit. Results show the new dimensions and file size before you download.",
  ],
  bullets: [
    "Exact width, percentage, or max-side resize modes",
    "Aspect ratio always preserved — no stretched photos",
    "Progressive downscaling keeps edges sharp",
    "Combine resizing and compression in one pass",
    "Works on JPG, PNG, WebP, AVIF and GIF",
    "Nothing is uploaded — processing stays in your browser",
  ],
  stepsTitle: "How to resize an image",
  steps: [
    {
      name: "Upload by dropping the file",
      text: "Drag your image into the box or click to select it from your device.",
    },
    {
      name: "Set the new dimensions",
      text: "Pick a resize mode — width, percentage, or maximum side — and enter the target value.",
    },
    {
      name: "Download the resized image",
      text: "The new size and dimensions appear instantly. Download the file or batch-resize more.",
    },
  ],
  faqs: [
    {
      question: "How do I resize an image without losing quality?",
      answer:
        "Downscale in steps instead of one jump, and avoid resizing the same file repeatedly. PickShrink automatically halves the image progressively until it reaches the target size, which keeps edges and fine detail sharp.",
    },
    {
      question: "Will resizing change the aspect ratio?",
      answer:
        "No. Every mode preserves the original proportions — when you set a width, the height is calculated automatically, and the max-side mode scales both dimensions by the same factor.",
    },
    {
      question: "What size should images be for the web?",
      answer:
        "A good default is 1600 px on the longest side for full-width hero images and 800 px for inline content. Export at 2× those widths only if you need crispness on retina displays and can afford the extra bytes.",
    },
    {
      question: "Can I resize and compress at the same time?",
      answer:
        "Yes — set the resize options and the quality/format controls together. The tool applies both in a single pass, which is faster and produces better results than resizing first and compressing later.",
    },
    {
      question: "Does it work on iPhone HEIC photos?",
      answer:
        "If your browser can decode the file, the tool can process it. Safari on macOS and iOS decodes HEIC natively; in other browsers, convert HEIC to JPG first (for example by opening it in Photos and exporting).",
    },
  ],
  related: [
    { href: "/compress-image", label: "Compress images" },
    { href: "/bulk-image-compressor", label: "Bulk compressor" },
    { href: "/jpg-to-webp", label: "JPG to WebP" },
    { href: "/blog/how-to-resize-an-image", label: "Resizing guide" },
    { href: "/how-it-works", label: "How it works" },
  ],
};

export const metadata = toolPageMetadata(page);

export default function ResizeImagePage() {
  return <ToolPage {...page} />;
}
