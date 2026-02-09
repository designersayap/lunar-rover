

import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    // 1. Allow public access to Staging routes and known public folders
    if (
        pathname.startsWith('/staging') ||
        pathname.startsWith('/themes') ||
        pathname.startsWith('/uat-files') ||
        pathname.startsWith('/fonts') ||
        pathname.startsWith('/images')
    ) {
        return NextResponse.next();
    }

    // 2. Allow public access to static assets and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/favicon.ico' ||
        pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|json|woff|woff2|ttf|eot|otf|map)$/i)
    ) {
        return NextResponse.next();
    }

    // 3. Protect Root and everything else
    // Allow access to login page
    if (pathname === '/login') {
        return NextResponse.next();
    }

    // Check for Auth Cookie
    const authToken = req.cookies.get('auth_token')?.value;
    const envPassword = process.env.AUTH_PASSWORD;

    // Log for debugging (server-side logs)
    // console.log(`Middleware: Path=${pathname}, AuthToken=${authToken ? 'Present' : 'Missing'}, PasswordSet=${!!envPassword}`);

    if (envPassword) {
        if (authToken === envPassword) {
            return NextResponse.next();
        }

        // Redirect to login if not authenticated
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/login';
        return NextResponse.redirect(loginUrl);
    }

    // If env var is not set, allow access (Dev mode)
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
