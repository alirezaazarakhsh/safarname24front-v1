import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const comingSoonIsActive = false;

// =====================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isSystemPath =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico';

  if (comingSoonIsActive && pathname !== '/' && !isSystemPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
