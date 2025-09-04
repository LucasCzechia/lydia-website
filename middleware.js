import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings/account'
];

const authRoutes = [
  '/login'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  let isAuthenticated = false;

  if (accessToken) {
    try {
      await jwtVerify(accessToken, JWT_SECRET);
      isAuthenticated = true;
    } catch (error) {
      if (refreshToken) {
        try {
          const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Cookie': `refreshToken=${refreshToken}`
            }
          });

          if (response.ok) {
            const newCookies = response.headers.get('set-cookie');
            const res = NextResponse.next();
            
            if (newCookies) {
              res.headers.set('set-cookie', newCookies);
            }
            
            isAuthenticated = true;
            return res;
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }
    }
  }

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos).*)',
  ],
};
