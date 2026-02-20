import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose'; 

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith('/comics');
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';

  if ((isProtectedRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      const payload = decodeJwt(token);

      if (isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      if (isAdminRoute && payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }

    } catch (error) {
      if (isProtectedRoute || isAdminRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/comics/:path*', '/admin/:path*', '/login'],
};