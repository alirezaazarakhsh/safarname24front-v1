import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let isError = false;
let comingSoonIsActive = false;

// =====================================

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // === Check for coming-soon or error ui
  try {
    const response = await fetch(
      'https://cps.safarnameh24.com/api/v1/config/coming-soon/',
    );
    const json = await response.json();
    comingSoonIsActive = json.data.is_active;
  } catch (error) {
    isError = true;
  }

  const isSystemPath =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico';

  if ((comingSoonIsActive || isError) && pathname !== '/' && !isSystemPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
