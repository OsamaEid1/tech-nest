import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getUserCardinalities from 'app/helpers/auth/getUserCardinalities';

// Secret key for JWT verification (same key used for signing)
const encoder = new TextEncoder();
const SECRET_KEY = encoder.encode(process.env.SECRET_KEY || 'e87ae886e49904ac30df7b0d6c934d70be9598420512a159cf2d43ccfba7effaa900e801b7ce807deaa37150dd606b301da11b87441a1ecf0beee5243296313f');

export async function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('token');
    
    const { pathname } = req.nextUrl;
    // If no token is found, redirect to login page
    if (!tokenCookie) {
        if (pathname.startsWith("/signin") || pathname.startsWith('/signup')) {
            return;
        } else {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }
    
    // Extract the token string from the RequestCookie object
    const token = tokenCookie.value;

    // Verify the JWT token 
    const userCardinalities = await getUserCardinalities(token, SECRET_KEY);
    if (!userCardinalities) {
        console.error("Failed to verify token");
        return NextResponse.redirect(new URL('/signin', req.url));
    }
    
    // User Role
    const userRole = userCardinalities.role.toLowerCase();

    // Prevent Access Sign in & Sign Up Pages When Token is Found
    if (userCardinalities && (pathname.startsWith('/signin') || pathname.startsWith('/signup'))) {
        console.error("Trying to access signIn/SignUp routes while he is already signing !");
        if (userRole === 'admin')
            return NextResponse.redirect(new URL('/admin/manage-articles', req.url));
        else if (userRole === 'user')
            return NextResponse.redirect(new URL('/', req.url));
    }
    
    // Check User Access Permission
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
        console.error("Error, while trying to access unauthorized pages, ", `path name: ${pathname.split("")[0]} WITH role: user`);
        return NextResponse.redirect(new URL('/', req.url));
    } else if (userRole === 'admin' && !pathname.startsWith('/admin')) {
        // Check Admin Access Permission
        console.error("Error, while trying to access unauthorized pages, ", `path name: ${pathname.split("")[0]} WITH role: admin`);
        return NextResponse.redirect(new URL('/admin/manage-articles', req.url));
    }

    // Proceed with the request if the token and role are valid
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/.*|api|favicon.ico|sitemap.xml|robots.txt).*)', /*** Exclude _next (static files ex: images & css files) and api (any api route) signin/signup pages */
    ],
};
