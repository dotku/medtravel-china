import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const t = useTranslations();

  const features = [
    {
      key: "quality",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
    },
    {
      key: "cost",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      key: "tcm",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      ),
    },
    {
      key: "tourism",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      ),
    },
  ];

  const services = [
    {
      key: "dentalCare",
      image:
        "https://images.pexels.com/photos/4269369/pexels-photo-4269369.jpeg?auto=compress&cs=tinysrgb&w=1200",
      color: "from-blue-500/80 to-blue-600/80",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Friendly dentist consultation in clinic"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/92 via-gray-900/75 to-gray-900/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
              🦷 Guangxi Dental Tourism · Nanning
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("home.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              {t("home.hero.subtitle")}
            </p>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-emerald-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Swiss ITI · US Zirconia · Korean Osstem
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-emerald-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                German Kavo 3D CBCT Imaging
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-emerald-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                20-Year Implant Warranty · Gov&apos;t Licensed
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-400 hover:shadow-emerald-500/25"
              >
                {t("home.hero.cta")}
                <svg
                  className="ml-2 h-4 w-4"
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
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                {t("common.getQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "20年", labelKey: "warranty" },
            { value: "300+", labelKey: "clinics" },
            { value: "700万+", labelKey: "tourists" },
            { value: "60%+", labelKey: "services" },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 text-center shadow-xl"
            >
              <div className="text-3xl font-bold text-emerald-600">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {t(`home.stats.${stat.labelKey}`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t("home.whyChooseUs.title")}
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.key}
                className="group relative rounded-2xl bg-gray-50 p-8 transition-all hover:bg-emerald-50 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {t(`home.whyChooseUs.${feature.key}.title`)}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  {t(`home.whyChooseUs.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section id="services" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t("home.featuredServices.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t("home.featuredServices.subtitle")}
            </p>
          </div>
          <div className="mt-16 max-w-lg mx-auto">
            {services.map((service) => (
              <div
                key={service.key}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={t(`services.${service.key}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.color}`}
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-gray-900 backdrop-blur">
                      {t(`services.${service.key}.name`)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-base leading-relaxed text-gray-600">
                    {t(`services.${service.key}.description`)}
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-4 inline-flex items-center text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                    {t("common.learnMore")}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guilin Feature Section */}
      <section className="relative overflow-hidden bg-gray-900 py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=1920&q=80"
            alt="Li River, Guilin"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("home.recovery.title")}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                {t("home.recovery.description")}
              </p>
              <ul className="mt-8 space-y-4">
                {(t.raw("home.recovery.items") as string[]).map(
                  (item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <svg
                        className="h-5 w-5 text-emerald-400"
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
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&q=80"
                  alt="Sunrise over mountains"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-emerald-600 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02IDItNCAyLTYtMi00LTItNiAyLTQgMi02LTItNC0yLTZ2LTJoMnYyYzAgMiAyIDQgMiA2cy0yIDQtMiA2IDIgNCAyIDYtMiA0LTIgNiAyIDQgMiA2LTIgNC0yIDYgMiA0IDIgNi0yIDQtMiA2djJoLTJ2LTJjMC0yLTItNC0yLTZzMi00IDItNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("home.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            {t("home.cta.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
            >
              {t("common.contact")}
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white hover:text-emerald-600"
            >
              {t("common.pricing")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
