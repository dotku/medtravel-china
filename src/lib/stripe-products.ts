export type PackageKey = "single" | "half-mouth" | "full-mouth";

export const stripeProducts: Record<
  PackageKey,
  { labelEn: string; labelZh: string; amountCents: number }
> = {
  single: {
    labelEn: "Single Implant — 3-Week All-Inclusive Package",
    labelZh: "单颗种植牙 · 3周全包套餐",
    amountCents: 780000, // $7,800.00
  },
  "half-mouth": {
    labelEn: "Half-Mouth All-on-4 — 3-Week All-Inclusive Package",
    labelZh: "半口 All-on-4 · 3周全包套餐",
    amountCents: 1680000, // $16,800.00
  },
  "full-mouth": {
    labelEn: "Full-Mouth All-on-4 — 3-Week All-Inclusive Package",
    labelZh: "全口 All-on-4 · 3周全包套餐",
    amountCents: 2480000, // $24,800.00
  },
};
