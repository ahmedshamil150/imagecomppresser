import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: `Terms of use for ${SITE_NAME}: acceptable use, disclaimers, and limitations for the free image tools.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of service" },
        ])}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Terms of service
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>

      <div className="mt-6 space-y-6 leading-7 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance</h2>
          <p className="mt-2">
            By using {SITE_NAME} (&ldquo;the service&rdquo;) you agree to these
            terms. If you do not agree, please do not use the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            2. Your content stays yours
          </h2>
          <p className="mt-2">
            You retain all rights to the images you process. Because processing
            happens locally in your browser, we never receive, store, or claim
            any rights to your files. You are solely responsible for ensuring
            you have the right to process the images you use with the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            3. Acceptable use
          </h2>
          <p className="mt-2">You agree not to:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>use the service for any unlawful purpose;</li>
            <li>
              attempt to disrupt, overload, or reverse engineer the website;
            </li>
            <li>
              use automated scripts to abuse the service or its content;
            </li>
            <li>
              reproduce substantial portions of the site without permission.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            4. No warranty
          </h2>
          <p className="mt-2">
            The service is provided &ldquo;as is&rdquo; without warranties of
            any kind. We do not guarantee that images will process without
            error, that results will meet your requirements, or that the service
            will be uninterrupted. Always keep backups of your original files.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            5. Limitation of liability
          </h2>
          <p className="mt-2">
            To the maximum extent permitted by law, {SITE_NAME} shall not be
            liable for any indirect, incidental, or consequential damages
            arising from your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">6. Contact</h2>
          <p className="mt-2">
            Questions about these terms? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-indigo-600 underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
