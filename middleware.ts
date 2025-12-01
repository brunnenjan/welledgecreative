import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18nConfig, isLocale } from "./src/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/phpmailer") ||
    pathname === "/contact-simple.php" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Domain-based routing for root path
  if (pathname === '/') {
    const germanHosts = [
      'welledgecreative.de',
      'www.welledgecreative.de',
      'welledgecreative.com',
      'www.welledgecreative.com',
      'well-edge-creative.de',
      'www.well-edge-creative.de',
    ];

    const englishHosts = [
      'well-edge-creative.com',
      'www.well-edge-creative.com',
    ];

    if (germanHosts.includes(host)) {
      return NextResponse.redirect(new URL('/de', request.url));
    }
    if (englishHosts.includes(host)) {
      return NextResponse.redirect(new URL('/en', request.url));
    }
  }

  const missingLocale = i18nConfig.locales.every((locale) => {
    return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
  });

  if (!missingLocale) {
    return;
  }

  const locale = getPreferredLocale(request);
  const localizedPath = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(new URL(localizedPath, request.url));
}

function getPreferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const languages = acceptLanguage.split(",").map((entry) => entry.split(";")[0]?.trim());
    for (const language of languages) {
      if (!language) continue;
      const normalized = language.toLowerCase();
      if (isLocale(normalized)) {
        return normalized;
      }
      const base = normalized.split("-")[0];
      if (base && isLocale(base)) {
        return base;
      }
    }
  }

  return i18nConfig.defaultLocale;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|assets|favicon.ico|contact-simple\\.php|phpmailer).*)"],
};
