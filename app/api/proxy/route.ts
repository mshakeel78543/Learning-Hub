import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, method, headers, body } = await request.json();

    const options: RequestInit = {
      method: method || 'GET',
      headers: headers || {},
    };

    if (body && method !== 'GET' && method !== 'HEAD') {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const responseBody = await response.text();

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Request failed' },
      { status: 500 }
    );
  }
}
