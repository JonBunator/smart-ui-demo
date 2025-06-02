"use server"
import {jwtVerify, SignJWT} from 'jose';
import {cookies} from "next/headers";

async function _generateJWTToken(userId: string) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';

    return await new SignJWT({id: userId})
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

export async function setSession(userId: string) {
    const token = await _generateJWTToken(userId);
    const cookieStore = await cookies();
    cookieStore.set('session', token, {httpOnly: true});
}

export async function getSession(): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value;
        if (!session) {
            return null;
        }
        const payload = await _verifyJWTToken(session);
        return payload.id as string ?? null;
    } catch {
        console.error('Invalid token');
        return null;
    }
}

export async function invalidateSession() {
    const cookieStore = await cookies();
    cookieStore.set('session', '', {httpOnly: true});
}


