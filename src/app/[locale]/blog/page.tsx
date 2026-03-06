import type { Metadata } from "next";
import Link from "next/link";
import { getLocalizedBlogPosts } from "@/lib/blog-posts";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "zh"
        ? "博客 | 中国医旅"
        : "Blog | MedTravel China",
    description:
      locale === "zh"
        ? "了解牙科植牙、医疗旅游和广西旅行的最新资讯"
        : "Expert guides on dental implants, dental tourism costs, safety tips, and travel to Guangxi, China.",
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = getLocalizedBlogPosts(locale);

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {locale === "zh" ? "博客" : "Blog"}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {locale === "zh"
              ? "牙科植牙和医疗旅游的专家指南"
              : "Expert guides on dental implants, costs, and dental tourism"}
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl bg-gray-50 transition-all hover:shadow-lg"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(
                      locale === "zh" ? "zh-CN" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  {locale === "zh" ? "阅读更多" : "Read more"}
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
