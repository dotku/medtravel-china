import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "MedTravel China - Medical Tourism in Guangxi",
    zh: "中国医旅 - 广西医疗旅游服务",
  };

  const descriptions: Record<string, string> = {
    en: "Premium medical travel services to Guangxi, China. Experience world-class healthcare combined with stunning natural beauty.",
    zh: "广西高端医疗旅游服务。体验世界一流的医疗服务，感受广西的自然之美。",
  };

  const baseUrl = "https://medtravel-china.com";

  return {
    title: {
      default: titles[locale] || titles.en,
      template: `%s | ${locale === "zh" ? "中国医旅" : "MedTravel China"}`,
    },
    description: descriptions[locale] || descriptions.en,
    keywords: locale === "zh"
      ? ["医疗旅游", "广西", "桂林", "中医", "健康体检", "牙科", "医疗服务"]
      : ["medical tourism", "Guangxi", "Guilin", "TCM", "health checkup", "dental care", "healthcare"],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        zh: `${baseUrl}/zh`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      url: `${baseUrl}/${locale}`,
      siteName: locale === "zh" ? "中国医旅" : "MedTravel China",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "MedTravel China",
    description: "Premium medical travel services to Guangxi, China. Dental care, CT health checkups, and TCM herbal bath therapy.",
    url: "https://medtravel-china.com",
    telephone: "+1-415-851-1937",
    email: "carrie.lan998@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-415-851-1937",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English", "Chinese"],
      name: "Carrie Lan",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "600 California St",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94108",
      addressCountry: "US",
    },
    medicalSpecialty: ["Dentistry", "GeneralPractice", "PhysicalMedicine"],
    availableService: [
      { "@type": "MedicalTherapy", "name": "Dental Care" },
      { "@type": "MedicalTherapy", "name": "Health Checkup (CT Imaging)" },
      { "@type": "MedicalTherapy", "name": "TCM Herbal Bath Therapy" },
    ],
    priceRange: "$$",
    currenciesAccepted: "CNY, USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: ["Guilin", "Guangxi", "China"],
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Auth0Provider>
          <NextIntlClientProvider messages={messages}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ChatWidget />
          </NextIntlClientProvider>
        </Auth0Provider>
        <Analytics />
      </body>
    </html>
  );
}
