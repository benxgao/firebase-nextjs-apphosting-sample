import * as jose from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_AUTH_NAME } from './src/config/constants';

export async function middleware(request: NextRequest) {
  try {
    // Find joseToken from the cookie, which contains {token, exp, iat}
    const joseToken = request.cookies.get(COOKIE_AUTH_NAME)?.value;

    if (!joseToken) {
      throw new Error('No joseToken cookie');
    }

    const { token, exp } = jose.decodeJwt(joseToken as string);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firebaseToken = token; // this is the token containing the firebase info

    if (exp && exp < Date.now() / 1000) {
      console.error('middleware: token expired:', {
        expiredAt: exp,
        currentTime: Date.now() / 1000,
      });

      const response = NextResponse.redirect(new URL('/signin', request.url));
      response.cookies.delete('joseToken');

      return response;
    }

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_BACKEND_URL || request.nextUrl.origin;
      const url = `${BASE_URL}/api/auth-cookie/verify`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${joseToken}`,
        },
      });

      if (!res.ok) {
        console.error(`fetch error: ${JSON.stringify(res.status)}`);
        throw new Error(`Failed to fetch data: ${JSON.stringify(res.body)}`);
      }

      const data: any = await res.json(); // {"valid":true}

      console.log(`middleware: api/auth-cookie/verify data: ${JSON.stringify(data)}`);

      return NextResponse.next();
    } catch (error) {
      console.log(`middleware: failed to verify: ${JSON.stringify(error.toString())}`);

      return NextResponse.redirect(new URL('/signin', request.url));
    }
  } catch (error) {
    console.error('middleware error:', {
      message: error.message,
      code: error.code,
      // stack: error.stack,
    });

    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

// Add the paths that should be protected
export const config = {
  matcher: ['/main/:path*'],
};
