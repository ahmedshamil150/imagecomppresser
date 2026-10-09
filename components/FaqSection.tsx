import { JsonLd } from "@/components/JsonLd";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection({
  faqs,
  heading = "Frequently asked questions",
}: {
  faqs: FaqItem[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="text-2xl font-bold text-slate-900">
        {heading}
      </h2>
      <dl className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {faqs.map((faq) => (
          <div key={faq.question} className="px-5 py-4">
            <dt className="text-base font-semibold text-slate-800">
              {faq.question}
            </dt>
            <dd className="mt-1.5 text-sm leading-6 text-slate-600">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
    </section>
  );
}
