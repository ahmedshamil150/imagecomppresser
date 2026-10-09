import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact the ${SITE_NAME} team — bug reports, feature requests, DMCA notices and advertising enquiries.`,
  path: "/contact",
});

const topics = [
  {
    title: "Bug reports",
    text: "Tell us which image failed, your browser and operating system, and what you expected to happen.",
  },
  {
    title: "Feature requests",
    text: "Missing a format or option? We review every request and prioritize what readers ask for most.",
  },
  {
    title: "Advertising",
    text: "Interested in direct ad placements or sponsorship? Include your site URL and traffic details.",
  },
  {
    title: "Legal & DMCA",
    text: "For copyright or legal enquiries, include the exact URL in question and your contact details.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact" },
        ])}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Contact us
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        We read every message. The fastest way to reach us is email — send it to{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-indigo-600 underline"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        and we usually reply within two business days.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <section
            key={topic.title}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <h2 className="font-semibold text-slate-800">{topic.title}</h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              {topic.text}
            </p>
          </section>
        ))}
      </div>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Email {CONTACT_EMAIL}
      </a>
    </div>
  );
}
