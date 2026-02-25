import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    { icon: "❤️", key: "care" },
    { icon: "🎯", key: "excellence" },
    { icon: "🤝", key: "trust" },
    { icon: "🌏", key: "accessibility" },
  ];

  const team = [
    {
      name: "Dr. Li Wei",
      role: "Medical Director",
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Wu_Zunyou-20220322.jpg",
    },
    {
      name: "Sarah Chen",
      role: "Patient Coordinator",
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/XinQi_Dong.jpg",
    },
    {
      name: "Dr. Zhang Ming",
      role: "TCM Specialist",
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Xu_Kecheng.jpg",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
            alt="Medical team"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t("pages.about.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-emerald-100">
            {t("pages.about.subtitle")}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("pages.about.mission.title")}
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                {t("pages.about.mission.description")}
              </p>
              <div className="mt-8 space-y-4">
                {(t.raw("pages.about.mission.points") as string[]).map(
                  (point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 text-emerald-500"
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
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Healthcare professionals"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {t("pages.about.values.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t("pages.about.values.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.key}
                className="rounded-2xl bg-white p-8 text-center shadow-lg"
              >
                <span className="text-5xl">{value.icon}</span>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {t(`pages.about.values.items.${value.key}.title`)}
                </h3>
                <p className="mt-2 text-gray-600">
                  {t(`pages.about.values.items.${value.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Guangxi Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800&q=80"
                alt="Guilin landscape"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900">
                {t("pages.about.whyGuangxi.title")}
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                {t("pages.about.whyGuangxi.description")}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {(
                  t.raw("pages.about.whyGuangxi.highlights") as Array<{
                    title: string;
                    value: string;
                  }>
                ).map((item, index) => (
                  <div key={index} className="rounded-lg bg-emerald-50 p-4">
                    <div className="text-2xl font-bold text-emerald-600">
                      {item.value}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {t("pages.about.team.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t("pages.about.team.subtitle")}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-lg"
              >
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            {t("pages.about.cta.title")}
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            {t("pages.about.cta.subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50"
          >
            {t("common.contact")}
          </Link>
        </div>
      </section>
    </div>
  );
}
