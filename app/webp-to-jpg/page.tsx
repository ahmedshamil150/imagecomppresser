import ToolPage, { toolPageMetadata } from "@/components/ToolPage";

const page = {
  path: "/webp-to-jpg",
  title: "WebP to JPG Converter — Free Online, Works Everywhere",
  description:
    "Convert WebP to JPG online for free. Turn WebP images into universally compatible JPG files in your browser — no upload, no watermark, instant download.",
  h1: "WebP to JPG Converter",
  intro:
    "Convert WebP images to JPG in one drop. JPG works in every app, document, and website ever made — use this converter when a WebP file will not open in your editor, upload form, or older software.",
  preset: { format: "image/jpeg" as const, hideFormat: true },
  sectionHeading: "When you need a JPG instead of WebP",
  paragraphs: [
    "WebP is excellent for websites, but plenty of software still does not understand it. Photo editors, e-commerce upload forms, email attachments, Word documents, and older apps often reject WebP files outright — the fastest fix is converting to JPG, which everything supports.",
    "This converter decodes your WebP locally and re-encodes it as JPG at the quality you choose. Transparent backgrounds are flattened onto white, and you can resize in the same pass. Because nothing is uploaded, even private images stay on your device.",
  ],
  bullets: [
    "JPG opens in virtually every app and platform",
    "Transparency flattened onto a clean white background",
    "Quality slider with instant size comparison",
    "Resize while converting if you need smaller dimensions",
    "Batch convert up to 30 WebP files as a ZIP",
    "No upload, no account, no watermark",
  ],
  stepsTitle: "How to convert WebP to JPG",
  steps: [
    {
      name: "Drop WebP files",
      text: "Drag your WebP images into the converter above or click to browse.",
    },
    {
      name: "Choose JPG quality",
      text: "Quality 85 is a safe default for photos you plan to edit again.",
    },
    {
      name: "Download the JPG",
      text: "Save the converted JPG, or download all results at once as a ZIP.",
    },
  ],
  faqs: [
    {
      question: "Why won't my WebP file upload or open?",
      answer:
        "Many platforms and older programs only accept JPG, PNG and GIF. Converting the WebP to JPG solves it instantly — JPG has near-universal compatibility.",
    },
    {
      question: "Does converting to JPG reduce quality?",
      answer:
        "WebP to JPG is a lossy-to-lossy conversion, so there is a small quality change. At quality 85 or above it is rarely noticeable. If the source has transparency, it is replaced by a white background because JPG cannot store alpha.",
    },
    {
      question: "Can I convert WebP to JPG on my phone?",
      answer:
        "Yes. The converter runs in the browser, so it works on Android, iPhone and tablets exactly like on a desktop — drop the file and download the JPG.",
    },
    {
      question: "Is the WebP file uploaded anywhere?",
      answer:
        "No. Decoding and re-encoding happen in your browser tab using local APIs. Your image never reaches a server.",
    },
  ],
  related: [
    { href: "/jpg-to-webp", label: "JPG to WebP" },
    { href: "/png-to-jpg", label: "PNG to JPG" },
    { href: "/compress-image", label: "Compress images" },
    { href: "/formats", label: "Formats explained" },
    { href: "/blog/jpg-vs-png-vs-webp-vs-avif", label: "Format comparison" },
  ],
};

export const metadata = toolPageMetadata(page);

export default function WebpToJpgPage() {
  return <ToolPage {...page} />;
}
