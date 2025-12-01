import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headers = {
    'x-forwarded-host': request.headers.get('x-forwarded-host'),
    'host': request.headers.get('host'),
    'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
    'x-real-ip': request.headers.get('x-real-ip'),
    'referer': request.headers.get('referer'),
  };

  const url = request.nextUrl;

  return NextResponse.json({
    headers,
    url: {
      href: url.href,
      origin: url.origin,
      pathname: url.pathname,
      host: url.host,
      hostname: url.hostname,
    },
    timestamp: new Date().toISOString(),
  }, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
