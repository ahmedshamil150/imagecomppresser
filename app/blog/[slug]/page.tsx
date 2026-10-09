import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import AdSlot from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

function MdxLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

const mdxComponents = {
  a: MdxLink,
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((other) => other.slug !== post.slug)
    .slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={articleJsonLd(
          post.title,
          post.description,
          `/blog/${post.slug}`,
          post.date,
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title },
        ])}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/blog" className="hover:text-indigo-600">
          Blog
        </Link>
      </nav>

      <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        <time dateTime={post.date}>{formattedDate}</time> · {SITE_NAME} team
        {post.tags.length > 0 ? (
          <>
            {" · "}
            {post.tags.join(", ")}
          </>
        ) : null}
      </p>

      <AdSlot slot="1000000003" />

      <div className="mdx-content mt-6">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <AdSlot slot="1000000004" />

      <section aria-labelledby="related-heading" className="mt-12">
        <h2 id="related-heading" className="text-xl font-bold text-slate-900">
          Keep reading
        </h2>
        <ul className="mt-4 space-y-3">
          {related.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/blog/${other.slug}`}
                className="group block rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-indigo-400"
              >
                <p className="font-semibold text-slate-800 group-hover:text-indigo-600">
                  {other.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {other.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
