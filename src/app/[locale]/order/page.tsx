import { auth0 } from "@/lib/auth0";
import { stripe } from "@/lib/stripe";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.orders" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function OrdersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const session = await auth0.getSession();

  if (!session?.user) {
    redirect(`/auth/login?returnTo=/${locale}/order`);
  }

  const userEmail = session.user.email;
  if (!userEmail) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("pages.orders.title")}</h1>
        <p className="mt-4 text-gray-600">{t("pages.orders.noEmail")}</p>
      </div>
    );
  }

  const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
  const customerId = customers.data[0]?.id;

  const sessions = customerId
    ? await stripe.checkout.sessions.list({ customer: customerId, limit: 20 })
    : { data: [] };

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("pages.orders.title")}</h1>
          <p className="mt-2 text-gray-600">{t("pages.orders.subtitle")}</p>
        </div>

        {sessions.data.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">{t("pages.orders.empty")}</p>
            <Link
              href={`/${locale}/pricing`}
              className="mt-6 inline-flex items-center rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {t("pages.orders.goPricing")}
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t("pages.orders.table.orderId")}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t("pages.orders.table.date")}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t("pages.orders.table.amount")}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t("pages.orders.table.status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sessions.data.map((checkoutSession) => {
                  const amount = checkoutSession.amount_total ?? 0;
                  const currency = (checkoutSession.currency ?? "usd").toUpperCase();
                  const createdAt = new Date(checkoutSession.created * 1000);

                  return (
                    <tr key={checkoutSession.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{checkoutSession.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{createdAt.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US")}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {(amount / 100).toLocaleString(locale === "zh" ? "zh-CN" : "en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} {currency}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {checkoutSession.payment_status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
