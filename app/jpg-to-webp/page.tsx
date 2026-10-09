import ToolPage, { toolPageMetadata } from "@/components/ToolPage";

const page = {
  path: "/jpg-to-webp",
  title: "JPG to WebP Converter — Free Online, Instant Download",
  description:
    "Convert JPG to WebP online for free. Make your photos 30–70% smaller with modern WebP compression — processed in your browser, no upload, no watermark.",
  h1: "JPG to WebP Converter",
  intro:
    "Convert JPG photos to WebP in one drop. WebP delivers noticeably smaller files than JPG at the same visual quality, and this converter runs entirely in your browser so your photos are never uploaded anywhere.",
  preset: { format: "image/webp" as const, hideFormat: true },
  sectionHeading: "Why WebP is the better web format",
  paragraphs: [
    "WebP was built for the web: it uses modern prediction and compression techniques to squeeze 25–50% more quality out of the same file size compared with JPG. Google has served WebP across its properties for years, and every modern browser now supports it — including Safari since version 14.",
    "For blogs, online stores, and landing pages, switching images from JPG to WebP is one of the easiest speed wins available. Page-weight drops immediately, Largest Contentful Paint improves, and with a JPG fallback you keep support for older software. Use the quality slider below to find the sweet spot for your photos.",
  ],
  bullets: [
    "Typically 30–70% smaller than the original JPG",
    "Keeps transparency if the source has it",
    "Supported by all modern browsers and CDNs",
    "Quality slider with instant before/after sizes",
    "Batch convert up to 30 photos, download as ZIP",
    "100% local processing — nothing leaves your device",
  ],
  stepsTitle: "How to convert JPG to WebP",
  steps: [
    {
      name: "Drop your JPG photos",
      text: "Drag JPG files into the converter, or click to browse your device.",
    },
    {
      name: "Adjust the quality",
      text: "Quality 80 suits most photos; lower it for thumbnails, raise it for detailed shots.",
    },
    {
      name: "Download WebP files",
      text: "Save each WebP individually or download all converted files as a ZIP.",
    },
  ],
  faqs: [
    {
      question: "What is the difference between JPG and WebP?",
      answer:
        "Both are lossy formats, but WebP uses more advanced compression, so at the same visual quality a WebP file is usually 30–70% smaller than JPG. WebP also supports transparency and animation, which JPG does not.",
    },
    {
      question: "Do all websites support WebP images?",
      answer:
        "All modern browsers do (Chrome, Edge, Firefox, Safari 14+). If you need to support very old software, upload WebP with a JPG fallback using the picture element or a CMS plugin.",
    },
    {
      question: "What quality setting should I use for WebP?",
      answer:
        "Quality 75–85 is the practical sweet spot: files stay small while photos remain sharp. Social media thumbnails can go as low as 60 without looking bad.",
    },
    {
      question: "Can I convert multiple JPGs at once?",
      answer:
        "Yes — drop up to 30 JPGs, let them all convert, then use the Download all (ZIP) button to save every WebP file in one archive.",
    },
  ],
  related: [
    { href: "/webp-to-jpg", label: "WebP to JPG" },
    { href: "/png-to-webp", label: "PNG to WebP" },
    { href: "/compress-image", label: "Compress images" },
    { href: "/blog/convert-jpg-to-webp", label: "WebP guide" },
    { href: "/formats", label: "Formats explained" },
  ],
};

export const metadata = toolPageMetadata(page);

export default function JpgToWebpPage() {
  return <ToolPage {...page} />;
}
