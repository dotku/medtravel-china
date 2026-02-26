export const AFFILIATE_COOKIE_NAME = "affiliate_ref";
export const AFFILIATE_COMMISSION_RATE = 0.05;
export const AFFILIATE_COMMISSION_BPS = 500;

const AFFILIATE_REF_REGEX = /^[a-zA-Z0-9_-]{2,64}$/;

export function isValidAffiliateRef(ref: string): boolean {
  return AFFILIATE_REF_REGEX.test(ref);
}

export function generateAffiliateRefFromEmail(email: string): string {
  const [localPart] = email.toLowerCase().split("@");
  const normalizedLocal = localPart.replace(/[^a-z0-9]/g, "").slice(0, 12);

  const suffix = Buffer.from(email.toLowerCase())
    .toString("base64url")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 8)
    .toLowerCase();

  const ref = `${normalizedLocal || "aff"}-${suffix}`.slice(0, 64);
  return isValidAffiliateRef(ref) ? ref : `aff-${suffix}`;
}

export function calculateAffiliateCommissionCents(
  revenueCents: number,
): number {
  return Math.round(revenueCents * AFFILIATE_COMMISSION_RATE);
}
