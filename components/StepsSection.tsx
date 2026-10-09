import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

export interface Step {
  name: string;
  text: string;
}

export default function StepsSection({
  title,
  steps,
  path,
}: {
  title: string;
  steps: Step[];
  path: string;
}) {
  return (
    <section aria-labelledby="steps-heading" className="mt-12">
      <h2 id="steps-heading" className="text-2xl font-bold text-slate-900">
        {title}
      </h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.name}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <h3 className="mt-3 font-semibold text-slate-800">{step.name}</h3>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">{step.text}</p>
          </li>
        ))}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: title,
          step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
          })),
          url: absoluteUrl(path),
        }}
      />
    </section>
  );
}
