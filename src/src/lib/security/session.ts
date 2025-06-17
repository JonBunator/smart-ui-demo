"use server"
import {JWTPayload, jwtVerify, SignJWT} from 'jose';
import {cookies} from "next/headers";
import {SurveyFlowMachineState} from "@/app/ui/propertyManagement/surveyManager/stateMachine";

async function _generateJWTToken(sessionData: SessionDataWithUserID) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';

    return await new SignJWT(sessionData as unknown as JWTPayload)
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setIssuer('urn:ai_agent_survey:issuer')
        .setAudience('urn:ai_agent_survey:audience')
        .setExpirationTime('6h')
        .sign(secret);
}

async function _verifyJWTToken(jwtToken: string) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const {payload} = await jwtVerify(jwtToken, secret, {
        issuer: 'urn:ai_agent_survey:issuer',
        audience: 'urn:ai_agent_survey:audience',
        algorithms: ['HS256'],
    })
    return payload;
}

export interface SessionDataWithUserID extends SessionData {
    userId: string;
}

export interface SessionData {
    surveyState: SurveyFlowMachineState
}

export async function setSession(sessionDataWithUserID: SessionDataWithUserID) {
    const token = await _generateJWTToken(sessionDataWithUserID);
    const cookieStore = await cookies();
    cookieStore.set('session', token, {httpOnly: true});
}

export async function updateSession(sessionData: SessionData) {
    const session = await getSession();
    if(!session) {
        throw new Error("Session is invalid");
    }

    const token = await _generateJWTToken({userId: session.userId, ...sessionData});
    const cookieStore = await cookies();
    cookieStore.set('session', token, {httpOnly: true});
}

export async function getSession(): Promise<SessionDataWithUserID | null> {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value;
        if (!session) {
            return null;
        }
        const payload = await _verifyJWTToken(session);
        return payload as unknown as SessionDataWithUserID ?? null;
    } catch {
        console.error('Invalid token');
        return null;
    }
}

export async function invalidateSession() {
    const cookieStore = await cookies();
    cookieStore.set('session', '', {httpOnly: true});
}


