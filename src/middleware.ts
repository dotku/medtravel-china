import { type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth0 } from "./lib/auth0";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/auth")) {
    return auth0.middleware(req);
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
