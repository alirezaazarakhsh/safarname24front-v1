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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let isError = false;
  let comingSoonIsActive = false;

  const access = request.cookies.get('access_token');
  console.log(access)

  try {
    const response = await fetch(apiBaseUrl + '/config/coming-soon/');

    const json = await response.json();
    comingSoonIsActive = json.data.is_active;
  } catch (error) {
    isError = true;
  }

  if (
    (comingSoonIsActive || isError) &&
    pathname !== '/' &&
    !isSystemPath(pathname)
  ) {
    return redirectTo('/', request);
  }

  if (pathname.startsWith('/dashboard') && !access) {
    return redirectTo('/', request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
