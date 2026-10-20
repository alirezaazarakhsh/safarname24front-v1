import { NextRequest, NextResponse } from 'next/server';

const TARGET_BASE_URL = 'https://cps.safarnameh24.com/api/v1';

async function proxyHandler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join('/') : '';
  const search = req.nextUrl.search;

  // Preserve trailing slash if present in original path
  const hasTrailingSlash = req.nextUrl.pathname.endsWith('/');
  const targetPath = path + (hasTrailingSlash && path && !path.endsWith('/') ? '/' : '');
  const targetUrl = `${TARGET_BASE_URL}/${targetPath}${search}`;

  const requestHeaders = new Headers();
  req.headers.forEach((value, key) => {
    // Exclude host/connection headers
    if (
      key.toLowerCase() !== 'host' &&
      key.toLowerCase() !== 'connection' &&
      key.toLowerCase() !== 'content-length'
    ) {
      requestHeaders.set(key, value);
    }
  });

  let body: any = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    try {
      const buffer = await req.arrayBuffer();
      if (buffer && buffer.byteLength > 0) {
        body = buffer;
      }
    } catch {
      body = undefined;
    }
  }

  try {
    const res = await fetch(targetUrl, {
      method: req.method,
      headers: requestHeaders,
      body,
      cache: 'no-store',
    });

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        responseHeaders.set(key, value);
      }
    });

    const responseData = await res.arrayBuffer();

    return new NextResponse(responseData, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch (err: any) {
    console.error('API Proxy Error:', err);
    return NextResponse.json(
      { error: 'Backend proxy error', details: err?.message || 'Network error' },
      { status: 502 }
    );
  }
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const DELETE = proxyHandler;
export const PATCH = proxyHandler;
export const OPTIONS = proxyHandler;
export const HEAD = proxyHandler;
