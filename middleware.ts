import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Vercel proxies -> always use x-forwarded-host first
  const host =
    req.headers.get('x-forwarded-host') ||
    req.headers.get('host') ||
    '';

  console.log("Middleware host:", host);

  // COM domains = EN
  const isCom =
    host === 'well-edge-creative.com' ||
    host === 'www.well-edge-creative.com' ||
    host === 'welledgecreative.com' ||
    host === 'www.welledgecreative.com';

  // DE domains = DE
  const isDe =
    host === 'well-edge-creative.de' ||
    host === 'www.well-edge-creative.de' ||
    host === 'welledgecreative.de' ||
    host === 'www.welledgecreative.de';

  // Only redirect the root path
  if (url.pathname === '/') {
    if (isCom) {
      url.pathname = '/en';
      return NextResponse.redirect(url);
    }

    if (isDe) {
      url.pathname = '/de';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // apply only on homepage
};
