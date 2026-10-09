import ToolPage, { toolPageMetadata } from "@/components/ToolPage";

const page = {
  path: "/compress-image",
  title: "Compress Images Online — Free JPG, PNG, WebP & AVIF Compressor",
  description:
    "Compress images online for free. Shrink JPG, PNG, WebP and AVIF file sizes in your browser with a quality slider — no upload, no watermark, no software.",
  h1: "Compress Images Online",
  intro:
    "Compress images for free without installing anything. PickShrink reduces the file size of JPG, PNG, WebP and AVIF photos directly in your browser — your files are never uploaded, and you keep full control of quality with a simple slider.",
  sectionHeading: "Why compress your images?",
  paragraphs: [
    "Large images are the number one cause of slow websites. A single uncompressed phone photo can weigh 5–10 MB, which slows page load times, hurts Core Web Vitals rankings, and burns mobile data. Compressing images before you publish typically cuts file sizes by 50–90% with little or no visible difference.",
    "PickShrink re-encodes your image at the quality level you choose. For photos, quality 80 gives an excellent balance of size and sharpness. For screenshots and graphics with text, switch the output format to PNG or WebP to keep edges crisp — or pick AVIF for the smallest possible file.",
  ],
  bullets: [
    "Runs entirely in your browser — files are never uploaded",
    "Quality slider from 10 to 100 with live before/after sizes",
    "Batch mode: compress up to 30 images and download as ZIP",
    "Works with JPG, PNG, WebP, AVIF, GIF and BMP",
    "No watermarks, no account, no size limits",
    "Optional resizing in the same step",
  ],
  stepsTitle: "How to compress an image in 3 steps",
  steps: [
    {
      name: "Drop your image",
      text: "Drag an image into the box above or click to browse. Multiple files work too.",
    },
    {
      name: "Pick quality and format",
      text: "Choose a quality level (80 is the sweet spot for photos) and an output format, or leave Auto for best compression.",
    },
    {
      name: "Download the result",
      text: "See the new file size instantly, then download the compressed image or grab all files as a ZIP.",
    },
  ],
  faqs: [
    {
      question: "How much can I compress an image?",
      answer:
        "Most photos shrink by 50–80% with no visible quality loss at quality 80. Screenshots and graphics with flat colors often shrink by 80–95%, especially when converted from PNG to WebP or AVIF.",
    },
    {
      question: "Does compressing reduce image quality?",
      answer:
        "Lossy compression (JPG, WebP, AVIF) discards data the eye rarely notices — at quality 80 most people cannot tell the difference from the original. For archival or screenshots that must stay pixel-perfect, choose PNG output, which is lossless.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "There is no server-side limit because processing happens in your browser. Practical limits depend on your device memory — files up to about 40 MB work comfortably on a modern laptop or phone.",
    },
    {
      question: "Are my images uploaded to a server?",
      answer:
        "No. Decoding, compression and download all happen locally in your browser tab. Your images never leave your device, which makes PickShrink safe for private or sensitive photos.",
    },
    {
      question: "What quality setting should I use?",
      answer:
        "Use 80 for photos, 60–70 for web graphics where size matters most, and 90+ for images with fine detail or text. Always check the before/after preview and adjust if the result looks too soft.",
    },
  ],
  related: [
    { href: "/resize-image", label: "Resize images" },
    { href: "/bulk-image-compressor", label: "Bulk compressor" },
    { href: "/png-to-webp", label: "PNG to WebP" },
    { href: "/formats", label: "Image formats guide" },
    { href: "/blog/how-to-compress-images", label: "Compression guide" },
  ],
};

export const metadata = toolPageMetadata(page);

export default function CompressImagePage() {
  return <ToolPage {...page} />;
}
