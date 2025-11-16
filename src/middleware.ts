import { apiBaseUrl } from './constants';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SYSTEM_PATHS = ['/_next', '/api', '/images', '/favicon.ico'];

function isSystemPath(pathname: string) {
  return SYSTEM_PATHS.some((p) =>
    pathname === p ? true : pathname.startsWith(p),
  );
}

function redirectTo(path: string, request: NextRequest) {
  return NextResponse.redirect(new URL(path, request.url));
}

// -----------------------------

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let isError = false;
  let appIsInActive = false;

  try {
    const response = await fetch(apiBaseUrl + '/config/coming-soon/', {
      cache: 'no-store',
    });

    const json = await response.json();
    appIsInActive = json.data.is_active;
  } catch (error) {
    isError = true;
  }

  if (
    (appIsInActive || isError) &&
    pathname !== '/' &&
    !isSystemPath(pathname)
  ) {
    return redirectTo('/', request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
