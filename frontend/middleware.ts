import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const publicRoutes = ['/events', '/signin', '/signup'];

  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const token = req.cookies.get('token')?.value;

  // If the user is accessing a public route
  if (isPublicRoute) {
    // If user is logged in and trying to access /signin or /signup, redirect to /events
    if (
      token &&
      (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/signup')
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // For non-public routes, check if the user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
