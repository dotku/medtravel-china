import { type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth0 } from "./lib/auth0";
import { AFFILIATE_COOKIE_NAME, isValidAffiliateRef } from "./lib/affiliate";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const referral = req.nextUrl.searchParams.get("ref");

  if (req.nextUrl.pathname.startsWith("/auth")) {
    const response = await auth0.middleware(req);
    if (referral && isValidAffiliateRef(referral)) {
      response.cookies.set(AFFILIATE_COOKIE_NAME, referral, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }
    return response;
  }

  const response = intlMiddleware(req);
  if (referral && isValidAffiliateRef(referral)) {
    response.cookies.set(AFFILIATE_COOKIE_NAME, referral, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
