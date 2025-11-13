import { NextResponse } from 'next/server';
export async function POST() {
  try {
    const res = await fetch(
      'https://cps.safarnameh24.com/api/v1/token/refresh/',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}), // Django reads refresh_token from cookie
      },
    );

    if (!res.ok) throw new Error('Refresh failed');

    // Forward new Set-Cookie headers from Django
    const response = NextResponse.json({ success: true });
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      response.headers.set('Set-Cookie', setCookie);
    }
    return response;
  } catch {
    return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
  }
}
