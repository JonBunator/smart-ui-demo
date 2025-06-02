import {NextRequest, NextResponse} from 'next/server'
import {getSession} from '@/lib/security/session'

const protectedRoutes = ['/survey']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const sessionId = await getSession();

    // Redirect to / if the user is not authenticated
    if (isProtectedRoute && !sessionId) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}