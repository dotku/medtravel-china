import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations();

  const sectionKeys = [
    "introduction",
    "collection",
    "usage",
    "sharing",
    "gdpr",
    "cpra",
    "pipl",
    "retention",
    "security",
    "contact",
  ] as const;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t("pages.privacy.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            {t("pages.privacy.subtitle")}
          </p>
          <p className="mt-4 text-sm text-emerald-200">
            {t("pages.privacy.lastUpdated")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sectionKeys.map((key) => {
              const hasItems = ["collection", "usage", "sharing", "gdpr", "cpra", "pipl"].includes(key);
              const hasAdditionalContent = ["collection", "sharing", "gdpr", "cpra", "pipl"].includes(key);
              const isContact = key === "contact";

              return (
                <div key={key} className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t(`pages.privacy.sections.${key}.title`)}
                  </h2>
                  <p className="mt-4 leading-relaxed text-gray-600">
                    {t(`pages.privacy.sections.${key}.content`)}
                  </p>

                  {hasItems && (
                    <ul className="mt-4 space-y-2">
                      {(t.raw(`pages.privacy.sections.${key}.items`) as string[]).map(
                        (item, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-600">
                            <svg
                              className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500"
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
                            <span className="text-sm">{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {hasAdditionalContent && (
                    <p className="mt-4 text-sm leading-relaxed text-gray-600">
                      {t(`pages.privacy.sections.${key}.additionalContent`)}
                    </p>
                  )}

                  {isContact && (
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p>{t("pages.privacy.sections.contact.email")}</p>
                      <p>{t("pages.privacy.sections.contact.phone")}</p>
                      <p>{t("pages.privacy.sections.contact.address")}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
