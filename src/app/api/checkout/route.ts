import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { stripe } from "@/lib/stripe";
import { stripeProducts, type PackageKey } from "@/lib/stripe-products";

export async function POST(req: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;
  if (!userEmail) {
    return NextResponse.json(
      { error: "User email is required" },
      { status: 400 },
    );
  }

  const body = await req.json();
  const { packageKey, locale } = body as {
    packageKey: PackageKey;
    locale: string;
  };

  const product = stripeProducts[packageKey];
  if (!product) {
    return NextResponse.json({ error: "Invalid package" }, { status: 400 });
  }

  const baseUrl = process.env.APP_BASE_URL ?? "http://localhost:3000";
  const label = locale === "zh" ? product.labelZh : product.labelEn;

  const existingCustomers = await stripe.customers.list({
    email: userEmail,
    limit: 1,
  });
  const customer =
    existingCustomers.data[0] ??
    (await stripe.customers.create({
      email: userEmail,
      name: session.user.name,
    }));

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: customer.id,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: product.amountCents,
          product_data: { name: label },
        },
      },
    ],
    metadata: {
      packageKey,
      locale,
      userEmail,
    },
    success_url: `${baseUrl}/${locale}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/${locale}/pricing`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
