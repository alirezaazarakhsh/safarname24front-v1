import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { phone, otp } = await req.json();

  const res = await fetch('https://cps.safarnameh24.com/api/v1/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp }),
    credentials: 'include',
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  res.headers.getSetCookie?.().forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie);
  });

  return response;
}
