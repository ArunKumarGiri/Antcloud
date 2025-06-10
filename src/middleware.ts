import { NextRequest, NextResponse } from 'next/server';

export function middleware(request:NextRequest) {

    const token = request.cookies.get('authToken')?.value;

    if (!token && request.nextUrl.pathname === '/xyz') {
        const signinUrl = new URL('/signin', request.url);
        signinUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);

        return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/xyz'],
}