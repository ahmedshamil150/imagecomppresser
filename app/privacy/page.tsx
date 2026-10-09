import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `${SITE_NAME} privacy policy: images are processed locally in your browser and never uploaded. We do not sell personal data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy policy" },
        ])}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Privacy policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>

      <div className="mt-6 space-y-6 leading-7 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Your images never leave your device
          </h2>
          <p className="mt-2">
            {SITE_NAME} processes images entirely inside your browser. Files are
            read from your device, compressed or resized with local APIs, and
            returned to you as a download. No image is uploaded to our servers —
            we have no technical ability to view, store, or retain your files.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Information we collect
          </h2>
          <p className="mt-2">
            We do not require an account and do not collect names, emails, or
            payment details. Like most websites, our servers receive standard
            technical logs (IP address, browser, and the page requested) for
            security and reliability purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Cookies and advertising
          </h2>
          <p className="mt-2">
            We use a cookie to remember your consent choice. When advertising is
            enabled, our ad partner (Google AdSense) may use cookies to serve
            ads based on your prior visits. You can opt out of personalized
            advertising through your{" "}
            <a
              href="https://adssettings.google.com/"
              className="font-medium text-indigo-600 underline"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              Google Ads Settings
            </a>{" "}
            or by choosing &ldquo;Essential only&rdquo; in our consent banner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Analytics</h2>
          <p className="mt-2">
            We use privacy-friendly, cookieless analytics to understand which
            pages are popular and whether the tool works. Analytics data is
            aggregated and cannot be used to identify you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Your rights</h2>
          <p className="mt-2">
            Because we do not store personal data tied to your image files,
            there is nothing to delete for processed images. For questions about
            this policy, contact{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-indigo-600 underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">Changes</h2>
          <p className="mt-2">
            We may update this policy occasionally; the date at the top of the
            page always reflects the latest revision.
          </p>
        </section>
      </div>
    </div>
  );
}
