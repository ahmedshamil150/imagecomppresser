import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL } from "@/lib/site";

const YEAR = new Date().getFullYear();

const columns = [
  {
    title: "Tools",
    links: [
      { href: "/compress-image", label: "Compress images" },
      { href: "/resize-image", label: "Resize images" },
      { href: "/bulk-image-compressor", label: "Bulk image compressor" },
      { href: "/png-to-jpg", label: "PNG to JPG" },
      { href: "/jpg-to-webp", label: "JPG to WebP" },
      { href: "/webp-to-jpg", label: "WebP to JPG" },
      { href: "/png-to-webp", label: "PNG to WebP" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/formats", label: "Image formats explained" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-slate-900">{SITE_NAME}</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{SITE_DESCRIPTION}</p>
          <p className="mt-3 text-xs text-slate-400">
            Processed locally in your browser — nothing is uploaded.
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-sm font-semibold text-slate-900">{column.title}</p>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-slate-200 py-4">
        <p className="mx-auto w-full max-w-5xl px-4 text-xs text-slate-400">
          © {YEAR} {SITE_NAME}. All rights reserved. ·{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-indigo-600">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}
