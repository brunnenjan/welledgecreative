import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18nConfig, isLocale } from "./src/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Remove port from host if present (e.g., "example.com:443" -> "example.com")
  const host = (request.headers.get('host') || '').split(':')[0] || '';

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

  // Check if path already has a locale
  const missingLocale = i18nConfig.locales.every((locale) => {
    return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
  });

  if (!missingLocale) {
    return;
  }

  // Domain-based routing for all paths without locale
  // Determine locale based on domain
  let locale: string;

  // Check for English domain first (most specific)
  if (host === 'well-edge-creative.com' || host === 'www.well-edge-creative.com') {
    locale = 'en';
  }
  // All other domains should use German
  else if (
    host === 'welledgecreative.de' || host === 'www.welledgecreative.de' ||
    host === 'welledgecreative.com' || host === 'www.welledgecreative.com' ||
    host === 'well-edge-creative.de' || host === 'www.well-edge-creative.de'
  ) {
    locale = 'de';
  }
  // Fallback to preferred locale from cookie/accept-language for unknown domains
  else {
    locale = getPreferredLocale(request);
  }

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
