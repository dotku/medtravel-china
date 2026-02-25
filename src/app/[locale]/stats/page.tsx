import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.stats" });
  return { title: t("hero.title") };
}

export default function StatsPage() {
  const t = useTranslations("pages.stats");

  type MetricItem = { label: string; value: string; desc: string };
  type TrafficItem = { label: string; value: string; desc: string; trend: string };
  type ServiceItem = { name: string; share: string; bar: number };

  const metrics = t.raw("metrics.items") as MetricItem[];
  const trafficItems = t.raw("traffic.items") as TrafficItem[];
  const topServices = t.raw("topServices.items") as ServiceItem[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Key Metrics */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("metrics.title")}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{item.value}</div>
                <div className="font-semibold text-gray-800 mb-1">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Traffic & Conversions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("traffic.title")}</h2>
          <p className="text-gray-500 mb-6">{t("traffic.subtitle")}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trafficItems.map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="font-semibold text-gray-700 mb-1">{item.label}</div>
                <div className="text-sm text-gray-500 mb-3">{item.desc}</div>
                <span className="inline-block text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Top Services */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("topServices.title")}</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
            {topServices.map((svc) => (
              <div key={svc.name}>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>{svc.name}</span>
                  <span>{svc.share}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all"
                    style={{ width: `${svc.bar}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vercel Analytics CTA */}
        <section>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("analytics.title")}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">{t("analytics.description")}</p>
            <a
              href="https://vercel.com/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t("analytics.cta")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p className="mt-4 text-sm text-gray-500">{t("analytics.note")}</p>
          </div>
        </section>

      </div>
    </div>
  );
}
