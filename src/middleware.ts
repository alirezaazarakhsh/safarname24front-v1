import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nextAction = request.headers.get('next-action');

  // Block vulnerability scanner probes sending dummy Server Action headers (e.g. "x")
  if (nextAction && (nextAction === 'x' || nextAction.length < 32)) {
    return new NextResponse('Invalid Server Action', { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
