import {NextRequest, NextResponse} from 'next/server'
import {getSession} from '@/lib/security/session'

const protectedRoutes = ['/survey', '/questions', '/completed']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = path !== '/' && protectedRoutes.some(route => path.startsWith(route));
    const sessionData = await getSession();

    // Redirect to / if the user is not authenticated
    if (isProtectedRoute && !sessionData) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    if(sessionData) {
        const surveyState = sessionData.surveyState;
        if (surveyState === "Finished") {
            return redirectWhenAuthenticated("/completed");

        } else if((surveyState === "NotStarted" || surveyState["SurveyStep"] === "Running" || surveyState["SurveyStep"] === "NotStarted" || surveyState["SurveyStep"] === "NoMoreData")) {
            return redirectWhenAuthenticated("/survey");

        } else if(surveyState["SurveyStep"] === "Questions") {
            return redirectWhenAuthenticated("/questions");
        }
    }

    return NextResponse.next();

    function redirectWhenAuthenticated(redirectPath: string) {
        if(!path.startsWith(redirectPath)) {
            return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
        }
        return NextResponse.next();
    }
}



// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.svg$|.*\\.png$|.*\\.gif$).*)'],
}