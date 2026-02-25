import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.hospitals" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function HospitalsPage() {
  const t = useTranslations();

  const hospitals = [
    {
      key: "xiangya",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
      beds: "8+",
      established: "2018",
      location: "Nanning",
      specialties: ["cardiology", "oncology", "neurology", "orthopedics"],
    },
    {
      key: "guangxiMedical",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      beds: "3000+",
      established: "1934",
      location: "Nanning",
      specialties: ["research", "transplant", "pediatrics", "tcm"],
    },
    {
      key: "nanningFirst",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
      beds: "1800+",
      established: "1914",
      location: "Nanning",
      specialties: ["cardiology", "oncology", "neurology", "emergency"],
    },
  ];

  const features = [
    { icon: "🏆", key: "accredited" },
    { icon: "🌍", key: "international" },
    { icon: "🔬", key: "technology" },
    { icon: "👨‍⚕️", key: "specialists" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t("pages.hospitals.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            {t("pages.hospitals.subtitle")}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.key} className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t(`pages.hospitals.features.${feature.key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t(`pages.hospitals.features.${feature.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitals List */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {hospitals.map((hospital, index) => (
              <div
                key={hospital.key}
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={hospital.image}
                      alt={t(`hospitals.${hospital.key}.name`)}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-white">
                        {hospital.beds} {t("pages.hospitals.beds")}
                      </span>
                      <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900">
                        {t("pages.hospitals.established")} {hospital.established}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {hospital.location}, Guangxi
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {t(`hospitals.${hospital.key}.name`)}
                  </h2>
                  <p className="mt-4 text-gray-600">
                    {t(`hospitals.${hospital.key}.description`)}
                  </p>
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900">{t("pages.hospitals.specialties")}</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
                        >
                          {t(`pages.hospitals.specialtyList.${specialty}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex gap-4">
                    <Link
                      href="/contact"
                      className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                      {t("pages.hospitals.bookConsultation")}
                    </Link>
                    <Link
                      href="/services"
                      className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      {t("pages.hospitals.viewServices")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">{t("pages.hospitals.cta.title")}</h2>
          <p className="mt-4 text-lg text-gray-300">{t("pages.hospitals.cta.subtitle")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-emerald-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-emerald-400"
          >
            {t("common.contact")}
          </Link>
        </div>
      </section>
    </div>
  );
}
