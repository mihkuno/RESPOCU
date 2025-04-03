import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || request.nextUrl.origin;
    
    console.log('Middleware is running with host:', host);

    return NextResponse.next();
}