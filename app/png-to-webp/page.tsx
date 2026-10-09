import ToolPage, { toolPageMetadata } from "@/components/ToolPage";

const page = {
  path: "/png-to-webp",
  title: "PNG to WebP Converter — Free, Keeps Transparency",
  description:
    "Convert PNG to WebP online for free. Cut PNG file sizes by 50–80% while keeping transparency — processed in your browser, no upload, no watermark.",
  h1: "PNG to WebP Converter",
  intro:
    "Convert PNG graphics to WebP and watch file sizes drop by half or more. WebP keeps the transparency of your PNG while compressing far more efficiently — and this converter runs entirely in your browser, so nothing is uploaded.",
  preset: { format: "image/webp" as const, hideFormat: true },
  sectionHeading: "The best of both worlds",
  paragraphs: [
    "PNG gives you lossless quality and transparency, but those benefits come with a size penalty — screenshots, illustrations and product graphics often weigh several hundred kilobytes or more. WebP supports transparency too, while using modern compression to cut the same image down dramatically.",
    "That makes PNG-to-WebP one of the highest-impact optimizations for websites: graphics keep their clean edges and alpha channel, but the page loads faster. For photos stored as PNG (a common mistake), the savings are even larger — often 80–95%.",
  ],
  bullets: [
    "Transparency preserved — alpha channel survives conversion",
    "Typically 50–80% smaller than the original PNG",
    "Quality slider for lossy output, or push it to 100 for near-lossless",
    "Batch convert up to 30 PNGs with one-click ZIP download",
    "Optional resize in the same step",
    "Local processing — your files never leave your device",
  ],
  stepsTitle: "How to convert PNG to WebP",
  steps: [
    {
      name: "Drop your PNG files",
      text: "Drag PNG images into the box above, or click to select files from your device.",
    },
    {
      name: "Set quality",
      text: "Use quality 80–90 for graphics, or 100 if the image must stay as close to original as possible.",
    },
    {
      name: "Download WebP",
      text: "Download individual files or everything at once as a ZIP archive.",
    },
  ],
  faqs: [
    {
      question: "Does WebP keep PNG transparency?",
      answer:
        "Yes. WebP supports an alpha channel, so transparent backgrounds survive the conversion — unlike JPG, which would fill transparency with a solid color.",
    },
    {
      question: "How much smaller does PNG to WebP make a file?",
      answer:
        "Screenshots and illustrations usually shrink by 50–80%. Photo-like PNGs often shrink by 80–95% because photos do not benefit from PNG's lossless storage.",
    },
    {
      question: "Is WebP supported everywhere?",
      answer:
        "All modern browsers support WebP, and most CDNs and CMS platforms handle it automatically. For maximum compatibility, serve WebP with a PNG or JPG fallback using the HTML picture element.",
    },
    {
      question: "Can I convert PNG to WebP without losing quality?",
      answer:
        "Set the quality slider to 100 for the closest possible result, or use it at 85–90 for the best size-to-quality balance. Perfect pixel-identity is only possible with lossless mode, which browsers do not expose via canvas — keep PNG if you need that.",
    },
  ],
  related: [
    { href: "/png-to-jpg", label: "PNG to JPG" },
    { href: "/jpg-to-webp", label: "JPG to WebP" },
    { href: "/compress-image", label: "Compress images" },
    { href: "/bulk-image-compressor", label: "Bulk compressor" },
    { href: "/blog/jpg-vs-png-vs-webp-vs-avif", label: "Format comparison" },
  ],
};

export const metadata = toolPageMetadata(page);

export default function PngToWebpPage() {
  return <ToolPage {...page} />;
}
