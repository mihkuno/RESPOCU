import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/encryption';

export async function middleware(request: NextRequest) {
    const host = request.headers.get('host') || request.nextUrl.origin;
    const cookieStore = await cookies();
    
    const token = cookieStore.get('token');

    if (token) {
        
          try {
                const decryptedData = await decrypt(token.value, process.env.ACCESS_SECRET);
                const parsedData = JSON.parse(decryptedData);
        
                if (parsedData) {
                    const { email, password, expires, type } = parsedData;
        
                    if (Date.now() > expires) {
                        return { status: "expired" };
                    }
        
                    // TODO: Check if the email and password are valid
                    // const account = await checkPassword(email, password);
                    // if (!account) {
                    //     return { status: "invalid" };
                    // }
        
                    let response = NextResponse.next();
                    response.headers.set('email', email);
                    response.headers.set('type', type);
                    return response;

                }
            } 
            
            catch (error) {
                console.error("Error decrypting token:", error);
                NextResponse.redirect(new URL('/auth/login', request.url));
            }
        
    }

    return NextResponse.next();
}