import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Vercel proxies -> always use x-forwarded-host first
  const host =
    req.headers.get('x-forwarded-host') ||
    req.headers.get('host') ||
    '';

  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("x-forwarded-host:", req.headers.get('x-forwarded-host'));
  console.log("host:", req.headers.get('host'));
  console.log("Final host value:", host);
  console.log("pathname:", url.pathname);

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

  console.log("isCom:", isCom);
  console.log("isDe:", isDe);

  // Only redirect the root path
  if (url.pathname === '/') {
    if (isCom) {
      console.log("→ Redirecting to /en");
      url.pathname = '/en';
      return NextResponse.redirect(url);
    }

    if (isDe) {
      console.log("→ Redirecting to /de");
      url.pathname = '/de';
      return NextResponse.redirect(url);
    }
  }

  console.log("→ No redirect, passing through");
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // apply only on homepage
};
