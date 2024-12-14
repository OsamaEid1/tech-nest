import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getUserCardinalities from 'app/helpers/auth/getUserCardinalities';

// Secret key for JWT verification (same key used for signing)
const encoder = new TextEncoder();
const SECRET_KEY = encoder.encode(process.env.SECRET_KEY || 'e87ae886e49904ac30df7b0d6c934d70be9598420512a159cf2d43ccfba7effaa900e801b7ce807deaa37150dd606b301da11b87441a1ecf0beee5243296313f');

export async function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('token');
    
    // If no token is found, redirect to login page
    if (!tokenCookie) 
        return NextResponse.redirect(new URL('/signin', req.url));
    
    // Extract the token string from the RequestCookie object
    const token = tokenCookie.value;
    const { pathname } = req.nextUrl;
    
    try {
        // Verify the JWT token 
        const userCardinalities = await getUserCardinalities(token, SECRET_KEY);
        if (!userCardinalities) 
            throw new Error("Failed to verify token");
        
        // Check User Access Permission
        if (pathname.startsWith('/admin') && userCardinalities.role !== 'admin') 
            throw new Error(`path name: ${pathname.split("")[0]} WITH role: ${userCardinalities.role}`)

        // Proceed with the request if the token and role are valid
        return NextResponse.next();
    } catch (error) {
        console.error("Error, while trying to access unauthorized pages, ", error);
        // If token verification fails OR trying to access unauzarized page, redirect to login page
        return NextResponse.redirect(new URL('/signin', req.url));
    }
}

export const config = {
    matcher: [
        '/((?!_next/.*|signin|signup|api|favicon.ico|sitemap.xml|robots.txt).*)', /*** Exclude _next (static files ex: images & css files) and api (any api route) signin/signup pages */
    ],
};
