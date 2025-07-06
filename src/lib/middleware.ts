import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/admin'];
  
  // Admin-only routes
  const adminRoutes = ['/dashboard/admin'];
  
  // Auth routes (login, register) - redirect to dashboard if already authenticated
  const authRoutes = ['/login', '/register'];
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is admin-only
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // If no token and trying to access protected route, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If token exists, verify it
  if (token) {
    const payload = verifyToken(token);
    
    // If token is invalid, clear it and redirect to login
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set({
        name: 'auth-token',
        value: '',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      });
      return response;
    }
    
    // Check admin access for admin routes
    if (isAdminRoute && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // If authenticated and trying to access auth routes, redirect to dashboard
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
