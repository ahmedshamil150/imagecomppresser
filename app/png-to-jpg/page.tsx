import ToolPage, { toolPageMetadata } from "@/components/ToolPage";

const page = {
  path: "/png-to-jpg",
  title: "PNG to JPG Converter — Free, No Software",
  description:
    "Convert PNG to JPG online for free. Turn PNG screenshots and graphics into compact JPG photos directly in your browser — no upload, no watermark, instant download.",
  h1: "PNG to JPG Converter",
  intro:
    "Convert PNG files to JPG in one drop. JPG files are dramatically smaller than PNG for photographs and screenshots, and PickShrink converts yours locally in the browser with a white background so transparency never turns black.",
  preset: { format: "image/jpeg" as const, hideFormat: true },
  sectionHeading: "Why convert PNG to JPG?",
  paragraphs: [
    "PNG stores every pixel losslessly, which makes it perfect for logos and icons — but also heavy for photographs and detailed screenshots. JPG uses lossy compression designed for photos, and the same image can come out 5–10× smaller with barely any visible difference.",
    "Convert when your PNG is a photo, a scan, or a screenshot destined for the web. Keep PNG when the image has sharp transparency, flat-color logos, or text that must stay pixel-perfect. When you convert here, transparent areas are flattened onto white, matching what most websites and documents expect.",
  ],
  bullets: [
    "Quality slider — control exactly how small the JPG gets",
    "Transparent pixels become white, not black",
    "Optionally resize while converting",
    "Batch convert up to 30 PNGs and download as ZIP",
    "No upload: files stay on your device",
    "Works from any modern browser, including mobile",
  ],
  stepsTitle: "How to convert PNG to JPG",
  steps: [
    {
      name: "Drop your PNG files",
      text: "Drag one or many PNG images into the converter above.",
    },
    {
      name: "Set quality",
      text: "Choose the JPG quality — 80 is ideal for photos, 90 for screenshots with text.",
    },
    {
      name: "Download as JPG",
      text: "Click download on each result, or grab every converted file as a ZIP archive.",
    },
  ],
  faqs: [
    {
      question: "Does converting PNG to JPG lose quality?",
      answer:
        "JPG is lossy, so some data is discarded — but at quality 80–90 the difference is hard to spot on photos and screenshots. If you need perfect pixels, keep PNG instead.",
    },
    {
      question: "What happens to transparent backgrounds?",
      answer:
        "JPG does not support transparency. PickShrink flattens transparent areas onto a white background, which is what documents, email clients and most websites expect.",
    },
    {
      question: "How much smaller does the file get?",
      answer:
        "Typically 5–10× smaller for photos and screenshots. A 3 MB PNG photo often becomes a 200–400 KB JPG with similar perceived quality.",
    },
    {
      question: "Is the conversion free and private?",
      answer:
        "Yes. Conversion runs entirely in your browser — the file is read from your device and the JPG is written back to your device. Nothing is uploaded to any server.",
    },
  ],
  related: [
    { href: "/png-to-webp", label: "PNG to WebP" },
    { href: "/jpg-to-webp", label: "JPG to WebP" },
    { href: "/webp-to-jpg", label: "WebP to JPG" },
    { href: "/compress-image", label: "Compress images" },
    { href: "/blog/convert-png-to-jpg", label: "PNG vs JPG guide" },
  ],
};

export const metadata = toolPageMetadata(page);

export default function PngToJpgPage() {
  return <ToolPage {...page} />;
}
