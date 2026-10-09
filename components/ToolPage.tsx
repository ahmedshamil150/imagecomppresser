import AdSlot from "@/components/AdSlot";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import ImageTool, { type ToolPreset } from "@/components/ImageTool";
import StepsSection, { type Step } from "@/components/StepsSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webAppJsonLd } from "@/lib/seo";
import Link from "next/link";

interface RelatedLink {
  href: string;
  label: string;
}

interface ToolPageProps {
  path: string;
  title: string;
  h1: string;
  intro: string;
  description: string;
  preset?: ToolPreset;
  sectionHeading: string;
  paragraphs: string[];
  bullets?: string[];
  stepsTitle: string;
  steps: Step[];
  faqs: FaqItem[];
  related?: RelatedLink[];
}

export function toolPageMetadata(props: ToolPageProps) {
  return pageMetadata({
    title: props.title,
    description: props.description,
    path: props.path,
  });
}

export default function ToolPage(props: ToolPageProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <JsonLd
        data={webAppJsonLd(props.h1, props.description, props.path)}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: props.h1 },
        ])}
      />
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        {props.h1}
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">{props.intro}</p>

      <div className="mt-8">
        <ImageTool preset={props.preset} />
      </div>

      <AdSlot slot="1000000001" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">
          {props.sectionHeading}
        </h2>
        {props.paragraphs.map((paragraph, index) => (
          <p key={index} className="mt-4 leading-7 text-slate-600">
            {paragraph}
          </p>
        ))}
        {props.bullets && props.bullets.length > 0 ? (
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {props.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 rounded-lg bg-slate-50 px-3.5 py-2.5 text-sm leading-6 text-slate-700"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <StepsSection
        title={props.stepsTitle}
        steps={props.steps}
        path={props.path}
      />

      <AdSlot slot="1000000002" />

      <FaqSection faqs={props.faqs} />

      {props.related && props.related.length > 0 ? (
        <section aria-labelledby="related-heading" className="mt-12">
          <h2 id="related-heading" className="text-xl font-bold text-slate-900">
            Related tools
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {props.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-400 hover:text-indigo-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
