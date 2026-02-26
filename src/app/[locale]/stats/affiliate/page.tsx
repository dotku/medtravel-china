import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import AffiliateApplyCard from "@/components/AffiliateApplyCard";
import { auth0 } from "@/lib/auth0";
import { stripe } from "@/lib/stripe";
import {
  AFFILIATE_COMMISSION_BPS,
  calculateAffiliateCommissionCents,
  isValidAffiliateRef,
} from "@/lib/affiliate";

type Props = { params: Promise<{ locale: string }> };

type AffiliateSummary = {
  ref: string;
  orders: number;
  paidOrders: number;
  revenueCents: number;
  commissionCents: number;
};

type AffiliateProfile = {
  status: "active" | "none";
  ref?: string;
  commissionBps: number;
};

const USD_TO_RMB_RATE = Number(process.env.USD_TO_RMB_RATE ?? "7.2");

function formatMoneyByLocale(locale: string, usdCents: number): string {
  const isZh = locale === "zh";
  const amount = isZh ? (usdCents / 100) * USD_TO_RMB_RATE : usdCents / 100;
  const value = amount.toLocaleString(isZh ? "zh-CN" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${value} ${isZh ? "RMB" : "USD"}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.stats.affiliate",
  });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

function canAccessAffiliateStats(userEmail?: string): boolean {
  if (!userEmail) return false;
  const raw = process.env.AFFILIATE_ADMIN_EMAILS ?? "";
  const allowList = raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowList.length === 0) {
    return false;
  }

  return allowList.includes(userEmail.toLowerCase());
}

async function getAffiliateProfile(
  userEmail: string,
): Promise<AffiliateProfile> {
  const customers = await stripe.customers.list({
    email: userEmail,
    limit: 1,
  });

  const customer = customers.data[0];
  if (!customer) {
    return {
      status: "none",
      commissionBps: AFFILIATE_COMMISSION_BPS,
    };
  }

  const ref = customer.metadata?.affiliateRef;
  const status = customer.metadata?.affiliateStatus;
  const commissionBps = Number(customer.metadata?.affiliateCommissionBps);

  return {
    status:
      status === "active" && ref && isValidAffiliateRef(ref)
        ? "active"
        : "none",
    ref: ref && isValidAffiliateRef(ref) ? ref : undefined,
    commissionBps: Number.isFinite(commissionBps)
      ? commissionBps
      : AFFILIATE_COMMISSION_BPS,
  };
}

export default async function AffiliateStatsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const session = await auth0.getSession();
  if (!session?.user) {
    redirect(`/auth/login?returnTo=/${locale}/stats/affiliate`);
  }

  const isAdmin = canAccessAffiliateStats(session.user.email);
  const userEmail = session.user.email;
  if (!userEmail) {
    redirect(`/${locale}/stats`);
  }

  const profile = await getAffiliateProfile(userEmail);

  const sessions = await stripe.checkout.sessions.list({ limit: 100 });

  if (!isAdmin && profile.status !== "active") {
    return (
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("pages.stats.affiliate.title")}
              </h1>
              <p className="mt-2 text-gray-600">
                {t("pages.stats.affiliate.subtitle")}
              </p>
            </div>
            <Link
              href={`/${locale}/stats`}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              {t("pages.stats.affiliate.back")}
            </Link>
          </div>

          <AffiliateApplyCard
            title={t("pages.stats.affiliate.apply.title")}
            description={t("pages.stats.affiliate.apply.description")}
            applyLabel={t("pages.stats.affiliate.apply.button")}
            applyingLabel={t("pages.stats.affiliate.apply.applying")}
            successLabel={t("pages.stats.affiliate.apply.success")}
            errorLabel={t("pages.stats.affiliate.apply.error")}
          />
        </div>
      </div>
    );
  }

  if (!isAdmin && profile.ref) {
    const myRows = sessions.data.filter(
      (checkoutSession) =>
        checkoutSession.metadata?.affiliateRef === profile.ref,
    );

    const orders = myRows.length;
    const paidRows = myRows.filter(
      (checkoutSession) => checkoutSession.payment_status === "paid",
    );
    const paidOrders = paidRows.length;
    const revenueCents = paidRows.reduce(
      (sum, checkoutSession) => sum + (checkoutSession.amount_total ?? 0),
      0,
    );
    const commissionCents = calculateAffiliateCommissionCents(revenueCents);
    const baseUrl = process.env.APP_BASE_URL ?? "http://localhost:3000";
    const referralLink = `${baseUrl}/${locale}?ref=${profile.ref}`;

    return (
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("pages.stats.affiliate.title")}
              </h1>
              <p className="mt-2 text-gray-600">
                {t("pages.stats.affiliate.subtitle")}
              </p>
            </div>
            <Link
              href={`/${locale}/stats`}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              {t("pages.stats.affiliate.back")}
            </Link>
          </div>

          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t("pages.stats.affiliate.myRef")}
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {profile.ref}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t("pages.stats.affiliate.myLink")}
                </p>
                <p className="mt-1 break-all text-sm text-emerald-700">
                  {referralLink}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              {t("pages.stats.affiliate.commissionRate", {
                rate: (profile.commissionBps / 100).toString(),
              })}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">
                {t("pages.stats.affiliate.table.orders")}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {orders}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">
                {t("pages.stats.affiliate.table.paidOrders")}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {paidOrders}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">
                {t("pages.stats.affiliate.table.revenue")}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {formatMoneyByLocale(locale, revenueCents)}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">
                {t("pages.stats.affiliate.table.commission")}
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-700">
                {formatMoneyByLocale(locale, commissionCents)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const map = new Map<string, AffiliateSummary>();

  for (const checkoutSession of sessions.data) {
    const ref = checkoutSession.metadata?.affiliateRef;
    if (!ref) continue;

    const current = map.get(ref) ?? {
      ref,
      orders: 0,
      paidOrders: 0,
      revenueCents: 0,
      commissionCents: 0,
    };

    current.orders += 1;

    if (checkoutSession.payment_status === "paid") {
      current.paidOrders += 1;
      current.revenueCents += checkoutSession.amount_total ?? 0;
      current.commissionCents = calculateAffiliateCommissionCents(
        current.revenueCents,
      );
    }

    map.set(ref, current);
  }

  const rows = Array.from(map.values()).sort(
    (a, b) => b.revenueCents - a.revenueCents,
  );
  const baseUrl = process.env.APP_BASE_URL ?? "http://localhost:3000";

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("pages.stats.affiliate.title")}
            </h1>
            <p className="mt-2 text-gray-600">
              {t("pages.stats.affiliate.subtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/stats`}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            {t("pages.stats.affiliate.back")}
          </Link>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            {t("pages.stats.affiliate.empty")}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    {t("pages.stats.affiliate.table.ref")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    {t("pages.stats.affiliate.table.orders")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    {t("pages.stats.affiliate.table.paidOrders")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    {t("pages.stats.affiliate.table.revenue")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    {t("pages.stats.affiliate.table.commission")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    {t("pages.stats.affiliate.table.link")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((item) => (
                  <tr key={item.ref} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {item.ref}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.orders}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.paidOrders}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatMoneyByLocale(locale, item.revenueCents)}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-700">
                      {formatMoneyByLocale(locale, item.commissionCents)}
                    </td>
                    <td className="px-6 py-4 text-sm text-emerald-700">
                      {`${baseUrl}/${locale}?ref=${item.ref}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
