import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_HOST as PRIMARY_HOST } from '@/lib/site';

/** Our other domains, and the language each one stands for. */
const OTHER_HOSTS: Record<string, 'en' | 'de'> = {
  'welledgecreative.com': 'en',
  'welledgecreative.de': 'de',
  'www.welledgecreative.de': 'de',
  'well-edge-creative.com': 'en',
  'www.well-edge-creative.com': 'en',
  'well-edge-creative.de': 'de',
  'www.well-edge-creative.de': 'de',
};

const hasLocale = (path: string) => /^\/(en|de)(\/|$)/.test(path);

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const host = (req.headers.get('x-forwarded-host') || req.headers.get('host') || '')
    .toLowerCase()
    .split(':')[0];

  // Another domain: one permanent hop to the same page on welledgecreative.com. A .de domain
  // without a language in the path opens the German site.
  const lang = OTHER_HOSTS[host];
  if (lang) {
    const path = hasLocale(pathname) ? pathname : `/${lang}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(`https://${PRIMARY_HOST}${path}${search}`, 308);
  }

  // Skip if already has locale or is a special path
  if (
    hasLocale(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // On welledgecreative.com (and previews) a page without a language opens in English.
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|api|.*\\..*).*)'
  ],
};
