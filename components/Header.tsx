import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const links = [
  { href: "/compress-image", label: "Compress" },
  { href: "/resize-image", label: "Resize" },
  { href: "/png-to-jpg", label: "PNG to JPG" },
  { href: "/jpg-to-webp", label: "JPG to WebP" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE_NAME} home`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            Ps
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            {SITE_NAME}
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm font-medium text-slate-600">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-indigo-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
