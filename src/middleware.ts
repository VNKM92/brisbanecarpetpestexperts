import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'brisbane-carpet-pest-experts-secret-key-2026-super-secure';
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export const config = {
  matcher: [
    /*
     * Match all requests except static files and image optimizations
     */
    '/((?!_next/static|_next/image|favicon.ico|images|assets|icons|font).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_token')?.value;

  let isAuthenticated = false;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, encodedSecret);
      if (payload && payload.userId) {
        isAuthenticated = true;
      }
    } catch (err) {
      isAuthenticated = false;
    }
  }

  // 1. If accessing old /admin/login, redirect to canonical /login
  if (pathname === '/admin/login') {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Protect Admin Web Routes: /admin and /admin/*
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      if (pathname !== '/admin') {
        loginUrl.searchParams.set('returnUrl', pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Protect Admin API Routes: /api/admin/*
  if (pathname.startsWith('/api/admin')) {
    if (!isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access Denied: You must be authenticated to access this protected resource.',
        },
        { status: 401 }
      );
    }
  }

  // 4. If already authenticated and visits /login, redirect to /admin
  if (pathname === '/login' && isAuthenticated) {
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/admin';
    return NextResponse.redirect(new URL(returnUrl, request.url));
  }

  // 5. Build Response with Enterprise Security Headers
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}
