import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip if already has locale or is a special path
  if (
    pathname.startsWith('/en') ||
    pathname.startsWith('/de') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get host from headers
  const forwardedHost = req.headers.get('x-forwarded-host');
  const regularHost = req.headers.get('host');
  const host = forwardedHost || regularHost || '';

  // Determine if .de or .com domain
  const isDeDomain = host.includes('.de');
  const locale = isDeDomain ? 'de' : 'en';

  // Redirect to localized path
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|api|.*\\..*).*)'
  ],
};
