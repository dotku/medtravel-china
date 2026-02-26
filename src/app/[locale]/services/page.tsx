import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SALES_CTA_URL } from "@/lib/sales-cta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function ServicesPage() {
  const t = useTranslations();

  const services = [
    {
      key: "dentalCare",
      image:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
      icon: "🦷",
      color: "blue",
    },
    {
      key: "healthCheckup",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
      icon: "🩺",
      color: "green",
    },
    {
      key: "tcm",
      image:
        "https://images.unsplash.com/photo-1758116448135-e989799305da?auto=format&fit=crop&w=800&q=80",
      icon: "🛁",
      color: "amber",
    },
  ];

  const colorClasses: Record<
    string,
    { bg: string; text: string; light: string }
  > = {
    blue: { bg: "bg-blue-600", text: "text-blue-600", light: "bg-blue-50" },
    green: { bg: "bg-green-600", text: "text-green-600", light: "bg-green-50" },
    amber: { bg: "bg-amber-600", text: "text-amber-600", light: "bg-amber-50" },
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t("pages.services.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            {t("pages.services.subtitle")}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const colors = colorClasses[service.color];
              return (
                <div
                  key={service.key}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="relative h-64 flex-shrink-0 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={t(`services.${service.key}.name`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{service.icon}</span>
                        <h3 className="text-xl font-bold text-white">
                          {t(`services.${service.key}.name`)}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-gray-600">
                      {t(`services.${service.key}.description`)}
                    </p>
                    <div className="mt-6 flex gap-3">
                      <Link
                        href="/pricing"
                        className={`inline-flex flex-1 items-center justify-center rounded-lg ${colors.bg} px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90`}
                      >
                        {t("pages.services.viewPricing")}
                      </Link>
                      <Link
                        href={SALES_CTA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex flex-1 items-center justify-center rounded-lg ${colors.light} px-4 py-2.5 text-sm font-medium ${colors.text} transition-colors hover:opacity-80`}
                      >
                        {t("pages.services.inquire")}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {t("pages.services.process.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t("pages.services.process.subtitle")}
            </p>
          </div>
          <div className="relative mt-16">
            <div className="grid gap-6 md:grid-cols-4 md:gap-4">
              {(
                t.raw("pages.services.process.steps") as Array<{
                  title: string;
                  description: string;
                }>
              ).map((step, index) => {
                const icons = [
                  <svg
                    key="1"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>,
                  <svg
                    key="2"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>,
                  <svg
                    key="3"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>,
                  <svg
                    key="4"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>,
                ];
                return (
                  <div
                    key={index}
                    className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center"
                  >
                    {/* Step indicator */}
                    <div className="flex flex-shrink-0 flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-xl font-bold text-white shadow-lg md:h-16 md:w-16 md:text-2xl">
                        {index + 1}
                      </div>
                      {/* Connecting line for mobile */}
                      {index < 3 && (
                        <div
                          className="mt-2 h-full w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-200 md:hidden"
                          style={{ minHeight: "40px" }}
                        />
                      )}
                    </div>

                    {/* Arrow for desktop */}
                    {index < 3 && (
                      <div
                        className="absolute left-full top-7 hidden w-full items-center justify-center md:flex"
                        style={{
                          width: "calc(100% - 4rem)",
                          left: "calc(50% + 2rem)",
                        }}
                      >
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-emerald-300" />
                        <svg
                          className="h-4 w-4 -ml-1 text-emerald-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 pb-6 md:mt-6 md:pb-0">
                      <div className="flex items-center gap-2 md:justify-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                          {icons[index]}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 md:mt-3">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            {t("pages.services.cta.title")}
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            {t("pages.services.cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={SALES_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {t("common.contact")}
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-emerald-600"
            >
              {t("common.pricing")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
