"use server"

import {AISupport, DataCategory, EMail} from "@prisma";
import {AI_SUPPORT_ORDER, NUM_DATA_PER_USE_CASE, NUM_USE_CASES, USE_CASE_INDEX_TYPES} from "../config";
import prisma from "./prisma";
import {getSession, setSession, updateSession} from "@/lib/security/session";
import {SnapshotFrom} from "xstate";
import surveyFlowMachine from "@/app/ui/propertyManagement/surveyManager/stateMachine";

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


    } catch(error) {
        console.error('Error finding survey', error);
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
        await setSession({userId: newParticipation.id, surveyState: "NotStarted"})
        return true;

    } catch(error) {
        console.error('Error finding survey', error);
        return false;
    }
}

export async function getAISupportForCurrentUseCase(): Promise<AISupport | null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getAISupportForUseCase: Session is invalid');
        return null;
    }

    const useCaseIndex = await getUseCaseIndex();
    if(useCaseIndex === null) {
        throw new Error(`UseCaseIndex is invalid`);
    }

    if(useCaseIndex >= NUM_USE_CASES) {
        throw new Error(`Index must be smaller than ${NUM_USE_CASES}.`)
    }

    try {
        const participation = await prisma.participation.findUnique({
            where: {
                id: sessionData.userId,
            },
        });



        if(!participation) {
            console.error('Participation not found');
            return null;
        }

        return AI_SUPPORT_ORDER[participation.aiSupportOrder][useCaseIndex];


    } catch(error) {
        console.error('Error finding participation', error);
        return null;
    }
}

/**
 * Sets the current state of the survey state machine.
 * @param state Stringified JSON state.
 */
export async function setParticipationState(state: string) {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('setParticipationState: Session is invalid');
        return;
    }

    try {
        const stateObject: SnapshotFrom<typeof surveyFlowMachine> = JSON.parse(state);
        await updateSession({...sessionData, surveyState: stateObject.value})

        await prisma.participation.update({
            where: {
                id: sessionData.userId,
            },
            data: {
                state: state
            }
        });


    } catch(error) {
        console.error('Error updating state', error);
        return;
    }
}

/**
 * Gets the saved survey state machine state.
 */
export async function getParticipationState(): Promise<SnapshotFrom<typeof surveyFlowMachine> | null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getParticipationState: Session is invalid');
        return null;
    }

    try {
        const participation = await prisma.participation.findUnique({
            where: {
                id: sessionData.userId,
            },
        });

        if (!participation) {
            console.error('Error getting participation');
            return null;
        }
        return participation.state ? JSON.parse(participation.state) : null;

    } catch(error) {
        console.error('Error getting state', error);
        return null;
    }
}

/**
 * Returns emails for use cases where the sequence is less than or equal to the dataIndex.
 */
export async function getAllEMails(): Promise<EMail[]|null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getAllEMails: Session is invalid');
        return null;
    }

    const useCaseData = await _getUseCaseData();
    if(!useCaseData) {
        return [];
    }
    const useCaseIndex = useCaseData.useCaseIndex;
    const dataIndex = useCaseData.dataIndex;

    if(useCaseIndex >= NUM_USE_CASES) {
        throw new Error(`useCaseIndex must be smaller than ${NUM_USE_CASES}.`)
    }

    if(dataIndex >= NUM_DATA_PER_USE_CASE) {
        throw new Error(`dataIndex must be smaller than ${NUM_DATA_PER_USE_CASE}.`)
    }

    const type = USE_CASE_INDEX_TYPES[useCaseIndex];

    try {
        const data = await prisma.data.findMany({
            where: {
                category: DataCategory.GroundTruth,
                type: type,
                order: {
                    lte: dataIndex,
                },
            },
            include: {
                EMail: true,
            },
            orderBy: {
                order: 'desc',
            },
        });

        if (!data || data.length === 0) {
            console.error('Error getting data');
            return null;
        }
        return data.map(d => d.EMail).filter(email => email !== null);

    } catch(error) {
        console.error('Error getting use case', error);
        return null;
    }
}

/**
 * Returns emails for use cases where the sequence is less than or equal to the dataIndex.
 */
export async function getEMail(useCaseIndex: number, dataIndex: number): Promise<EMail|null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getEMail: Session is invalid');
        return null;
    }

    if(useCaseIndex >= NUM_USE_CASES) {
        throw new Error(`useCaseIndex must be smaller than ${NUM_USE_CASES}.`)
    }

    if(dataIndex >= NUM_DATA_PER_USE_CASE) {
        throw new Error(`dataIndex must be smaller than ${NUM_DATA_PER_USE_CASE}.`)
    }

    const type = USE_CASE_INDEX_TYPES[useCaseIndex];

    try {
        const data = await prisma.data.findFirst({
            where: {
                category: DataCategory.GroundTruth,
                type: type,
                order: dataIndex,
            },
            include: {
                EMail: true,
            },
        });

        if (!data || !data.EMail) {
            console.error('Error getting data');
            return null;
        }
        return data.EMail;

    } catch(error) {
        console.error('Error getting use case', error);
        return null;
    }
}

/**
 * Returns index of current use case.
 */
export async function getUseCaseIndex(): Promise<number|null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getUseCaseIndex: Session is invalid');
        return null;
    }
    const useCaseData = await _getUseCaseData();
    if (useCaseData === null) {
        return 0;
    }
    return useCaseData.useCaseIndex;
}

interface UseCaseData {
    useCaseIndex: number;
    dataIndex: number;
}

export async function _getUseCaseData(): Promise<UseCaseData|null> {
    const surveyState = await getParticipationState();
    if(!surveyState) {
        return null;
    }

    const useCaseIndex = surveyState.context.useCaseIndex;
    const dataIndex = surveyState.context.dataIndex;
    return {useCaseIndex, dataIndex};
}