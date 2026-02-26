import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { stripe } from "@/lib/stripe";
import {
  AFFILIATE_COMMISSION_BPS,
  generateAffiliateRefFromEmail,
} from "@/lib/affiliate";

export async function POST() {
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

  const ref = generateAffiliateRefFromEmail(userEmail);

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

  await stripe.customers.update(customer.id, {
    metadata: {
      ...customer.metadata,
      affiliateStatus: "active",
      affiliateRef: ref,
      affiliateAppliedAt:
        customer.metadata.affiliateAppliedAt ?? new Date().toISOString(),
      affiliateCommissionBps: String(AFFILIATE_COMMISSION_BPS),
    },
  });

  return NextResponse.json({
    ok: true,
    affiliate: {
      status: "active",
      ref,
      commissionBps: AFFILIATE_COMMISSION_BPS,
    },
  });
}
