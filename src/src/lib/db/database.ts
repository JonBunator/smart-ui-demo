"use server"

import prisma from "./prisma";
import {getSession, setSession} from "@/lib/security/session";

/**
 * Checks if the invite code is valid. False when not, true when valid.
 * @param inviteCode The invite code.
 */
export async function isInviteCodeValid(inviteCode: string): Promise<boolean> {
    try {
        const survey = await prisma.survey.findUnique({
            where: {
                invitationCode: inviteCode,
            },
        });

        return !(!survey || !survey.active);


    } catch {
        console.error('Error finding survey');
        return false;
    }

}

/**
 * Starts a new survey and returns the true when the invite code is valid and participation creation was successful.
 * @param inviteCode The invite code.
 */
export async function startNewSurvey(inviteCode: string): Promise<boolean> {
    try {
        const survey = await prisma.survey.findUnique({
            where: {
                invitationCode: inviteCode,
            },
        });

        if (!survey || !survey.active) {
            return false;
        }

        const nextAISupportOrder = (survey.nextAISupportOrder + 1) % 6;

        const newParticipation = await prisma.participation.create({
            data: {
                surveyId: survey.id,
                aiSupportOrder: survey.nextAISupportOrder,
            },
        });

        await prisma.survey.update({
            where: {
                id: survey.id,
            },
            data: {
                nextAISupportOrder: nextAISupportOrder,
            },
        });
        await setSession(newParticipation.id)
        return true;

    } catch {
        console.error('Error finding survey');
        return false;
    }
}

export async function getAISupportForUseCase(index: number) {
    const sessionId = await getSession();
    if (!sessionId) {
        console.error('Session is invalid');
        return null;
    }

    if(index > 2) {
        throw new Error("Index must be smaller than 3.")
    }

    try {
        const participation = await prisma.participation.findUnique({
            where: {
                id: sessionId,
            },
        });

        const aiSupportOrder = [[0, 1, 2],
            [1, 0, 2],
            [2, 0, 1],
            [0, 2, 1],
            [1, 2, 0],
            [2, 1, 0]]

        if(!participation) {
            console.error('Participation not found');
            return null;
        }

        return aiSupportOrder[participation.aiSupportOrder][index];


    } catch {
        console.error('Error finding survey');
        return false;
    }
}