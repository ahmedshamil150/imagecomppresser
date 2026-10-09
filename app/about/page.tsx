import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "PickShrink is a free, privacy-first image compressor and resizer built for creators, bloggers and store owners who need fast images without uploading them anywhere.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About" },
        ])}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        About PickShrink
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        PickShrink is a free image compressor and resizer built for people who
        publish on the web — bloggers, students, store owners, and developers
        who need smaller images without installing software or trusting a
        stranger&apos;s server with their files.
      </p>

      <section className="mt-8 space-y-4 leading-7 text-slate-600">
        <p>
          Most image tools work by uploading your photo to a remote server,
          processing it there, and handing it back. That model is slow, wasteful
          and — for private photos, contracts, or unreleased product shots — a
          genuine risk. PickShrink takes the opposite approach: everything runs
          inside your browser using HTML canvas and WebAssembly, so your files
          never leave your device.
        </p>
        <p>
          The tool is free and supported by advertising. Because there are no
          server or bandwidth costs, the entire operation can run on a static
          site with minimal overhead — and stay free with no usage caps or
          accounts.
        </p>
        <p>
          Found a bug, need a format we don&apos;t support yet, or want to
          discuss advertising?{" "}
          <Link
            href="/contact"
            className="font-medium text-indigo-600 underline"
          >
            Get in touch
          </Link>{" "}
          at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-indigo-600 underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { stat: "0", label: "Files uploaded to servers" },
          { stat: "100%", label: "Free, with no account required" },
          { stat: "30", label: "Images per batch" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center"
          >
            <p className="text-3xl font-bold text-indigo-600">{item.stat}</p>
            <p className="mt-1 text-sm text-slate-600">{item.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
