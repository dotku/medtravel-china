"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { PackageKey } from "@/lib/stripe-products";

type Props = {
  packageKey: PackageKey;
};

export function BookButton({ packageKey }: Props) {
  const { locale } = useParams<{ locale: string }>();
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("pricing");

  if (isLoading) return null;

  if (!user) {
    return (
      <a
        href={`/auth/login?returnTo=/${locale}/pricing`}
        className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md border border-emerald-600 text-emerald-700 font-semibold px-3 py-1.5 text-xs hover:bg-emerald-50 transition-colors"
      >
        {t("loginToBook")}
      </a>
    );
  }

  async function handleBook() {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageKey, locale }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBook}
      disabled={loading}
      className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold px-3 py-1.5 text-xs transition-colors"
    >
      {loading ? t("booking") : t("bookNow")}
    </button>
  );
}
