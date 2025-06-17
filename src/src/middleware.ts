import {NextRequest, NextResponse} from 'next/server'
import {getSession} from '@/lib/security/session'

const protectedRoutes = ['/survey', '/questions', '/completed']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const sessionData = await getSession();

    // Redirect to / if the user is not authenticated
    if (isProtectedRoute && !sessionData) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    if(sessionData) {
        const surveyState = sessionData.surveyState;
        if (surveyState === "Finished") {
            return redirectWhenAuthenticated("/completed");

        } else if((surveyState === "NotStarted" || surveyState["UseCase"] === "Running" || surveyState["UseCase"] === "NotStarted")) {
            return redirectWhenAuthenticated("/survey");

        } else if(surveyState["UseCase"] === "Questions") {
            return redirectWhenAuthenticated("/questions");
        }
    }

    return NextResponse.next();

    function redirectWhenAuthenticated(redirectPath: string) {
        if(!path.startsWith(redirectPath)) {
            return NextResponse.redirect(new URL(path, req.nextUrl));
        }
    }
}



// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.svg$|.*\\.png$).*)'],
}