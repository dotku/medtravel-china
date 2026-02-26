import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "./BookButton";
import { SALES_CTA_URL } from "@/lib/sales-cta";
import type { PackageKey } from "@/lib/stripe-products";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function PricingPage() {
  const t = useTranslations();

  const categories = [
    { key: "dental", icon: "🦷", color: "blue" },
    { key: "tcm", icon: "🛁", color: "amber" },
  ];

  const dentalPackageKeys: PackageKey[] = ["single", "half-mouth", "full-mouth"];

  const colorClasses: Record<
    string,
    { bg: string; border: string; text: string }
  > = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-600",
    },
  };

  const packageItems = t.raw("pricing.packages.items") as string[];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("pricing.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            {t("pricing.subtitle")}
          </p>
        </div>
      </section>

      {/* Pricing Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {categories.map((category) => {
              const colors = colorClasses[category.color];
              const items = t.raw(
                `pricing.categories.${category.key}.items`,
              ) as Array<{
                name: string;
                price: string;
              }>;

              return (
                <div
                  key={category.key}
                  className={`overflow-hidden rounded-2xl border ${colors.border} ${colors.bg}`}
                >
                  <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{category.icon}</span>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {t(`pricing.categories.${category.key}.name`)}
                      </h2>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-white/50">
                          <th className="px-6 py-3 text-left text-base font-semibold text-gray-900">
                            {t("services.dentalCare.name").split(" ")[0] ===
                            "Dental"
                              ? "Service"
                              : "服务项目"}
                          </th>
                          <th className="px-6 py-3 text-right text-base font-semibold text-gray-900">
                            {t("services.dentalCare.name").split(" ")[0] ===
                            "Dental"
                              ? "Price"
                              : "价格"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {items.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-base text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span
                                className={`text-base font-semibold ${colors.text}`}
                              >
                                {item.price}
                              </span>
                              {category.key === "dental" && dentalPackageKeys[index] && (
                                <BookButton packageKey={dentalPackageKeys[index]} />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All-Inclusive Packages */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {t("pricing.packages.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t("pricing.packages.subtitle")}
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-white p-8">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("pricing.packages.includes")}
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {packageItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <span className="text-base text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={SALES_CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-emerald-700"
              >
                {t("common.getQuote")}
              </Link>
              <Link
                href={SALES_CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 shadow transition-all hover:bg-gray-50"
              >
                {t("common.contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">{t("pricing.disclaimer")}</p>
        </div>
      </section>
    </div>
  );
}
