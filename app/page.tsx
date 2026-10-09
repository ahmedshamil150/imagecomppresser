import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import ImageTool from "@/components/ImageTool";
import { JsonLd } from "@/components/JsonLd";
import StepsSection from "@/components/StepsSection";
import {
  organizationJsonLd,
  pageMetadata,
  webAppJsonLd,
} from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Free Image Compressor & Resizer — Private, No Upload",
  description:
    "Compress and resize JPG, PNG, WebP and AVIF images free online. Files are processed in your browser and never uploaded — no watermarks, no account, instant download.",
});

const tools = [
  {
    href: "/compress-image",
    title: "Compress images",
    text: "Shrink JPG, PNG, WebP and AVIF files with a quality slider.",
  },
  {
    href: "/resize-image",
    title: "Resize images",
    text: "Set exact width, scale by percent, or cap the longest side.",
  },
  {
    href: "/bulk-image-compressor",
    title: "Bulk compressor",
    text: "Optimize up to 30 images at once and download as a ZIP.",
  },
  {
    href: "/png-to-jpg",
    title: "PNG to JPG",
    text: "Convert PNG photos and screenshots into compact JPGs.",
  },
  {
    href: "/jpg-to-webp",
    title: "JPG to WebP",
    text: "Modern WebP compression — 30–70% smaller than JPG.",
  },
  {
    href: "/webp-to-jpg",
    title: "WebP to JPG",
    text: "Turn WebP files into universally compatible JPGs.",
  },
  {
    href: "/png-to-webp",
    title: "PNG to WebP",
    text: "Cut PNG size in half while keeping transparency.",
  },
  {
    href: "/formats",
    title: "Formats explained",
    text: "JPG vs PNG vs WebP vs AVIF — when to use each one.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is the best free image compressor?",
    answer:
      "PickShrink compresses JPG, PNG, WebP and AVIF images for free in your browser. It adds no watermark, requires no account, and never uploads your files, which makes it one of the safest options for private photos.",
  },
  {
    question: "How do I compress an image without losing quality?",
    answer:
      "Drop the image into the compressor, leave quality at 80 for photos, and download the result. Typical savings are 50–80% with no visible difference. Use PNG output when the image must stay pixel-perfect.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. Your browser decodes, resizes and re-encodes the image locally using its own codecs. The file is read from your device and written back to your device — it never travels to a server.",
  },
  {
    question: "Which image format gives the smallest file?",
    answer:
      "AVIF is usually the smallest modern format, followed by WebP, then JPG, then PNG. AVIF and WebP keep good visual quality at small sizes, while PNG stays lossless and is best for graphics that need transparency and crisp text.",
  },
  {
    question: "Is there a limit on image size or count?",
    answer:
      "You can process up to 30 images per batch. File size is limited only by your device's memory — images up to about 40 MB work comfortably on a modern phone or laptop.",
  },
  {
    question: "Does it work on iPhone and Android?",
    answer:
      "Yes. The tool runs in any modern mobile browser, so you can compress and resize photos directly from your phone without installing an app.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <JsonLd
        data={webAppJsonLd(
          "PickShrink — Free Image Compressor & Resizer",
          "Compress and resize JPG, PNG, WebP and AVIF images free online. Files are processed in your browser and never uploaded.",
          "/",
        )}
      />
      <JsonLd data={organizationJsonLd()} />

      <section className="text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          Compress &amp; Resize Images — Free, Private, Instant
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Shrink JPG, PNG, WebP and AVIF files in your browser with one drop.
          No upload, no watermark, no account — your images never leave your
          device, and the optimized result downloads in seconds.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-medium">
          {["100% private", "Free forever", "No watermarks", "Up to 30 files"].map(
            (badge) => (
              <span
                key={badge}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700"
              >
                {badge}
              </span>
            ),
          )}
        </div>
      </section>

      <div className="mt-8" id="compressor">
        <ImageTool />
      </div>

      <AdSlot slot="1000000001" />

      <section aria-labelledby="tools-heading" className="mt-12">
        <h2 id="tools-heading" className="text-2xl font-bold text-slate-900">
          All image tools
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-400 hover:shadow-sm"
            >
              <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600">
                {tool.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                {tool.text}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <StepsSection
        title="How it works"
        path="/"
        steps={[
          {
            name: "Drop your images",
            text: "Drag files into the compressor above or pick them from your device — nothing is uploaded.",
          },
          {
            name: "Adjust settings",
            text: "Choose output format, quality and optional resize dimensions. Results update automatically.",
          },
          {
            name: "Download instantly",
            text: "Save individual files or grab the whole batch as a ZIP. Source files are untouched.",
          },
        ]}
      />

      <AdSlot slot="1000000002" />

      <FaqSection faqs={faqs} />

      <section className="mt-12 rounded-2xl bg-indigo-600 px-6 py-8 text-center sm:px-10">
        <h2 className="text-2xl font-bold text-white">
          Ready to shrink your images?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-indigo-100">
          Drop a photo into the compressor above — it takes seconds and costs
          nothing.
        </p>
        <a
          href="#compressor"
          className="mt-5 inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
        >
          Start compressing
        </a>
      </section>
    </div>
  );
}
