import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "order.success" });
  return { title: t("title") };
}

export default async function OrderSuccessPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "order.success" });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
        <p className="text-emerald-700 font-medium mb-6">{t("subtitle")}</p>
        <p className="text-gray-600 leading-relaxed mb-8">{t("message")}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
