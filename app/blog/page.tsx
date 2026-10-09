import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Blog — Image Optimization Guides",
  description: SITE_DESCRIPTION,
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog" },
        ])}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Image optimization guides
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        Practical, no-fluff articles on compressing images, choosing file
        formats, and making websites faster — written for people who publish
        online.
      </p>

      <ul className="mt-8 space-y-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-400"
            >
              <p className="text-xs font-medium text-indigo-600">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>
              <h2 className="mt-1.5 text-xl font-semibold text-slate-900 group-hover:text-indigo-600">
                {post.title}
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                {post.description}
              </p>
              {post.tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
