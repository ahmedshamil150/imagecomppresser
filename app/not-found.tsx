import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  path: "/404",
});

const links = [
  { href: "/", label: "Home" },
  { href: "/compress-image", label: "Compress images" },
  { href: "/resize-image", label: "Resize images" },
  { href: "/blog", label: "Blog" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold text-indigo-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600">
        The page you are looking for may have been moved or does not exist.
      </p>
      <nav aria-label="Helpful links" className="mt-6 flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-400 hover:text-indigo-600"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
