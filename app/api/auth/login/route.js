export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const { password } = await req.json();
        const envPassword = process.env.AUTH_PASSWORD;

        if (password && password === envPassword) {
            // Set HttpOnly cookie
            // In production, secure: true should be used. 
            // For localhost, secure: false is often needed unless using https.
            // Next.js handles this automatically if valid.

            const response = NextResponse.json({ success: true });

            response.cookies.set('auth_token', envPassword, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
                sameSite: 'strict',
            });

            return response;
        }

        return NextResponse.json({ success: false }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
