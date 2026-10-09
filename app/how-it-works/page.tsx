import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import StepsSection from "@/components/StepsSection";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How It Works",
  description:
    "Learn how PickShrink compresses and resizes images entirely inside your browser — no uploads, no servers, no watermarks.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How it works" },
        ])}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        How PickShrink works
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        PickShrink processes images inside your browser using the same HTML5
        canvas APIs that power modern web apps — the file is read from your
        device, optimized locally, and written back to your device. Nothing is
        ever sent to a server, which is why the tool is free and private at the
        same time.
      </p>

      <StepsSection
        title="The three-step flow"
        path="/how-it-works"
        steps={[
          {
            name: "Decode locally",
            text: "Your browser reads the image file with createImageBitmap or an image element — no network request is made.",
          },
          {
            name: "Resize and re-encode",
            text: "The image is drawn onto a canvas at the target dimensions, then re-encoded as JPG, PNG, WebP or AVIF at your chosen quality.",
          },
          {
            name: "Download the result",
            text: "The optimized file is handed back to you as a normal download. Close the tab and every trace disappears from memory.",
          },
        ]}
      />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Why browser-side processing matters
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          Traditional converters upload your file to a server, queue it, process
          it, and let you download it again — wasting bandwidth, introducing
          privacy risk, and creating a storage liability. PickShrink skips the
          server entirely.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-600">
          <li>
            <strong className="text-slate-800">Private by design:</strong> no
            upload means no one — including us — can see your images.
          </li>
          <li>
            <strong className="text-slate-800">Instant:</strong> results appear
            as soon as your device finishes encoding; there is no queue.
          </li>
          <li>
            <strong className="text-slate-800">Free to run:</strong> with zero
            server costs, the tool can stay unlimited and ad-supported.
          </li>
          <li>
            <strong className="text-slate-800">Works offline:</strong> once the
            page is loaded, processing continues even if your connection drops.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Under the hood</h2>
        <p className="mt-4 leading-7 text-slate-600">
          Decoding and encoding for JPG, PNG and WebP use your browser&apos;s
          built-in codecs through <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">canvas.toBlob()</code>.
          AVIF output uses a WebAssembly build of libavif (via jSquash) that is
          downloaded only when you choose AVIF, keeping the initial page light.
          Large images are downscaled in repeated halving steps so the final
          picture stays sharp.
        </p>
        <p className="mt-4 leading-7 text-slate-600">
          Ready to try it? Head back to the{" "}
          <Link href="/" className="font-medium text-indigo-600 underline">
            image compressor
          </Link>{" "}
          or read the{" "}
          <Link href="/formats" className="font-medium text-indigo-600 underline">
            image format guide
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
