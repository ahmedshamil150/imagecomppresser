import Link from "next/link";
import FaqSection from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Image Formats Explained — JPG vs PNG vs WebP vs AVIF",
  description:
    "JPG, PNG, WebP and AVIF compared: compression, transparency, quality and browser support — with practical advice on which format to use.",
  path: "/formats",
});

const formats = [
  {
    name: "JPG (JPEG)",
    best: "Photographs",
    text: "The veteran lossy format. Excellent compression for photos, universal compatibility, no transparency. Quality degrades each time you re-save, so convert once and keep the original.",
    compress: (
      <Link href="/compress-image">Compress JPG</Link>
    ),
  },
  {
    name: "PNG",
    best: "Screenshots, logos, graphics",
    text: "Lossless with full transparency and crisp text. Larger files than JPG or WebP — ideal when every pixel must survive, wasteful for photographs.",
    compress: (
      <Link href="/png-to-webp">Convert PNG to WebP</Link>
    ),
  },
  {
    name: "WebP",
    best: "Modern websites",
    text: "Google's web format: 25–50% smaller than JPG at the same quality, with transparency and animation support. Supported by every modern browser since 2020.",
    compress: (
      <Link href="/jpg-to-webp">Convert JPG to WebP</Link>
    ),
  },
  {
    name: "AVIF",
    best: "Smallest possible files",
    text: "The newest format, built from the AV1 video codec. Typically 20–40% smaller than WebP at similar quality. Encoding is slower, so use it for final web assets.",
    compress: (
      <Link href="/compress-image">Compress to AVIF</Link>
    ),
  },
];

export default function FormatsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Image formats" },
        ])}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        JPG vs PNG vs WebP vs AVIF
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        Use <strong>JPG</strong> for photos, <strong>PNG</strong> for graphics
        that need transparency and pixel-perfect text,{" "}
        <strong>WebP</strong> as the default for modern websites, and{" "}
        <strong>AVIF</strong> when you want the smallest file possible. WebP
        and AVIF both support transparency, and every format works with
        PickShrink&apos;s free converter tools.
      </p>

      <div className="mt-8 space-y-4">
        {formats.map((format) => (
          <section
            key={format.name}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                {format.name}
              </h2>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                Best for: {format.best}
              </span>
            </div>
            <p className="mt-2 leading-7 text-slate-600">{format.text}</p>
            <p className="mt-3 text-sm font-medium">{format.compress}</p>
          </section>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Quick comparison table
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500">
                <th className="py-2.5 pr-4 font-semibold">Format</th>
                <th className="py-2.5 pr-4 font-semibold">Compression</th>
                <th className="py-2.5 pr-4 font-semibold">Transparency</th>
                <th className="py-2.5 font-semibold">Relative size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-medium">JPG</td>
                <td className="py-2.5 pr-4">Lossy</td>
                <td className="py-2.5 pr-4">No</td>
                <td className="py-2.5">Medium</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">PNG</td>
                <td className="py-2.5 pr-4">Lossless</td>
                <td className="py-2.5 pr-4">Yes</td>
                <td className="py-2.5">Large</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">WebP</td>
                <td className="py-2.5 pr-4">Lossy + lossless</td>
                <td className="py-2.5 pr-4">Yes</td>
                <td className="py-2.5">Small</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">AVIF</td>
                <td className="py-2.5 pr-4">Lossy + lossless</td>
                <td className="py-2.5 pr-4">Yes</td>
                <td className="py-2.5">Smallest</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection
        faqs={[
          {
            question: "Which format is best for websites in 2026?",
            answer:
              "WebP is the safest default because it balances size, quality and universal browser support. Use AVIF when you can afford slower encoding for extra savings, and always provide a JPG fallback for older clients.",
          },
          {
            question: "Is AVIF better than WebP?",
            answer:
              "AVIF usually produces smaller files at the same quality — often 20–40% smaller — but encoding takes longer. For photographs on high-traffic pages, the extra optimization time is worth it.",
          },
          {
            question: "Why are my PNG files so big?",
            answer:
              "PNG stores every pixel losslessly, so photos and detailed screenshots become huge. Converting photo-like PNGs to WebP or JPG typically cuts the size by 80% or more.",
          },
        ]}
      />
    </div>
  );
}
