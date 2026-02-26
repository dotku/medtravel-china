import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "review" });
  return { title: t("hero.title") };
}

// TODO: Replace these with your real profile URLs once registered
const platformLinks: Record<string, string> = {
  google: "https://maps.google.com",
  tripadvisor: "https://www.tripadvisor.com",
  xiaohongshu: "https://www.xiaohongshu.com",
};

const colorMap: Record<string, { bg: string; border: string; btn: string; badge: string }> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    btn: "bg-blue-600 hover:bg-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    btn: "bg-green-600 hover:bg-green-700",
    badge: "bg-green-100 text-green-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    btn: "bg-red-500 hover:bg-red-600",
    badge: "bg-red-100 text-red-700",
  },
};

const platformEmoji: Record<string, string> = {
  google: "🗺️",
  tripadvisor: "🦉",
  xiaohongshu: "📱",
};

export default async function ReviewPage({ params }: Props) {
  const { locale } = await params;

  const session = await auth0.getSession();
  if (!session) {
    redirect(`/auth/login?returnTo=/${locale}/review`);
  }

  const t = await getTranslations({ locale, namespace: "review" });

  type Platform = {
    id: string;
    name: string;
    audience: string;
    description: string;
    cta: string;
    color: string;
  };

  const platforms = t.raw("platforms") as Platform[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-emerald-600 to-emerald-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">⭐</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-emerald-100 text-lg">{t("hero.subtitle")}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Intro */}
        <p className="text-gray-600 text-center text-lg">{t("intro")}</p>

        {/* Platform Cards */}
        <div className="space-y-5">
          {platforms.map((platform) => {
            const colors = colorMap[platform.color] ?? colorMap.blue;
            const link = platformLinks[platform.id] ?? "#";
            const emoji = platformEmoji[platform.id] ?? "🔗";

            return (
              <div
                key={platform.id}
                className={`rounded-xl border p-6 flex flex-col sm:flex-row sm:items-center gap-5 ${colors.bg} ${colors.border}`}
              >
                <div className="text-4xl shrink-0">{emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="font-bold text-gray-900 text-lg">{platform.name}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
                      {platform.audience}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{platform.description}</p>
                </div>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`shrink-0 inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm ${colors.btn}`}
                >
                  {platform.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>

        {/* Note + Thank you */}
        <div className="text-center space-y-2 pt-4">
          <p className="text-sm text-gray-500 italic">{t("note")}</p>
          <p className="text-emerald-700 font-semibold text-lg">{t("thankYou")}</p>
        </div>

      </div>
    </div>
  );
}
