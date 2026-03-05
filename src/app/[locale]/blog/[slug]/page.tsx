import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://medtravel.jytech.us/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mt-8">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>By {post.author}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{post.excerpt}</p>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-emerald mt-12 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-gray-900 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("**") && block.endsWith("**")) {
              return (
                <p key={i} className="font-semibold text-gray-900 mt-6 mb-2">
                  {block.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (block.startsWith("- ")) {
              const items = block.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="mt-4 space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-600">
                      <svg className="mt-1.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item
                            .replace("- ", "")
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="mt-4 text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: block.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong class='text-gray-900'>$1</strong>"
                  ),
                }}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-emerald-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Ready to Start Your Dental Tourism Journey?
          </h3>
          <p className="mt-3 text-gray-600">
            Get a free consultation and personalized cost breakdown within 24 hours.
          </p>
          <Link
            href={`/${locale}`}
            className="mt-6 inline-flex items-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </article>
  );
}
