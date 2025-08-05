"use server"

import {
    Booking,
    BookingCreateInput,
    Data,
    DataCategory,
    DataType,
    EMail,
    Maintenance,
    MaintenanceCreateInput,
    InitialQuestionsCreateInput,
    NoAgentQuestionsCreateInput,
    AgentQuestionsCreateInput,
    Property,
    PropertyCreateInput
} from "@prisma";
import {
    AI_SUPPORT_ORDER,
    DATASET_ORDER,
    NUM_DATA_INDICES,
    NUM_DATA_PER_SURVEY_STEP,
    NUM_SURVEY_STEPS,
    NUM_SURVEY_TYPES
} from "../config";
import prisma from "./prisma";
import {getSession, setSession, updateSession} from "@/lib/security/session";
import {SnapshotFrom} from "xstate";
import surveyFlowMachine from "@/app/ui/propertyManagement/surveyManager/stateMachine";
import {AISupport} from "@/lib/types"

/**
 * Checks if the invite code is valid. False when not, true when valid.
 * @param inviteCode The invite code.
 */
export async function isInviteCodeValid(inviteCode: string): Promise<boolean> {
    try {
        const surveyGroup = await prisma.surveyGroup.findUnique({
            where: {
                invitationCode: inviteCode,
            },
        });

        return !(!surveyGroup || !surveyGroup.active);


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
        const surveyGroup = await prisma.surveyGroup.findUnique({
            where: {
                invitationCode: inviteCode,
            },
        });

        if (!surveyGroup || !surveyGroup.active) {
            return false;
        }

        const survey = await prisma.survey.findFirst();

        if (!survey) {
            return false;
        }

        const newParticipation = await prisma.participation.create({
            data: {
                surveyGroupId: surveyGroup.id,
                surveyType: survey.nextSurveyType,
                dataSetOrder: survey.nextDataSetOrder,
            },
        });

        const nextSurveyType = (survey.nextSurveyType + 1) % NUM_SURVEY_TYPES;
        const nextDataSetOrder = (survey.nextDataSetOrder + 1) % NUM_DATA_INDICES;

        await prisma.survey.update({
            where: {
                id: survey.id,
            },
            data: {
                nextSurveyType: nextSurveyType,
                nextDataSetOrder: nextDataSetOrder,
            },
        });
        await setSession({userId: newParticipation.id, surveyState: "InitialQuestions"})
        return true;

    } catch(error) {
        console.error('Error finding survey', error);
        return false;
    }
}

export async function getAISupportForCurrentSurveyStep(): Promise<AISupport | null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getAISupportForCurrentSurveyStep: Session is invalid');
        return null;
    }

    const surveyStep = await getSurveyStep();
    if(surveyStep === null) {
        throw new Error(`surveyStep is invalid`);
    }

    if(surveyStep >= NUM_SURVEY_STEPS) {
        throw new Error(`Index must be smaller than ${NUM_SURVEY_STEPS}.`)
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

        return AI_SUPPORT_ORDER[participation.surveyType][surveyStep];


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
 * Returns emails for survey steps where the sequence is less than or equal to the dataIndex.
 */
export async function getAllEMails(): Promise<EMail[]|null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getAllEMails: Session is invalid');
        return null;
    }

    const surveyStepData = await _getSurveyStepData();
    if(!surveyStepData) {
        return [];
    }
    const surveyStep = surveyStepData.surveyStep;
    const dataIndex = Math.min(NUM_DATA_PER_SURVEY_STEP - 1, surveyStepData.dataIndex);

    if(surveyStep >= NUM_SURVEY_STEPS) {
        throw new Error(`surveyStep must be smaller than ${NUM_SURVEY_STEPS}.`)
    }

    const dataSet = await _getDataSet(surveyStep);
    if(dataSet === null) {
        throw new Error(`dataSet not found.`)
    }

    try {
        const data = await prisma.data.findMany({
            where: {
                category: DataCategory.GroundTruth,
                dataSet: dataSet,
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
        console.error('Error getting survey step', error);
        return null;
    }
}

export async function getGroundTruthData(surveyStep: number, dataIndex: number): Promise<Data|null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getGroundTruthData: Session is invalid');
        return null;
    }

    if(surveyStep >= NUM_SURVEY_STEPS) {
        throw new Error(`surveyStep must be smaller than ${NUM_SURVEY_STEPS}.`)
    }

    dataIndex = Math.min(NUM_DATA_PER_SURVEY_STEP - 1, dataIndex);

    const dataSet = await _getDataSet(surveyStep);
    if(dataSet === null) {
        throw new Error(`dataSet not found.`)
    }

    try {
        const data = await prisma.data.findFirst({
            where: {
                category: DataCategory.GroundTruth,
                dataSet: dataSet,
                order: dataIndex,
            }
        });

        if (!data) {
            console.error('Error getting data');
            return null;
        }
        return data;

    } catch(error) {
        console.error('Error getting survey step', error);
        return null;
    }
}
 async function _getDataSet(surveyStep: number): Promise<number|null> {
     const sessionData = await getSession();
     if (!sessionData) {
         console.error('_getDataSet: Session is invalid');
         return null;
     }
     try {
         const participation = await prisma.participation.findUnique({
             where: {
                 id: sessionData.userId,
             },
         });

         if (!participation) {
             console.error('Error getting data');
             return null;
         }
         return DATASET_ORDER[participation.dataSetOrder][surveyStep];

     } catch(error) {
         console.error('Error getting survey step', error);
         return null;
     }
 }

/**
 * Returns emails for survey steps where the sequence is less than or equal to the dataIndex.
 */
export async function getEMail(surveyStep: number, dataIndex: number): Promise<EMail|null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getEMail: Session is invalid');
        return null;
    }

    if(surveyStep >= NUM_SURVEY_STEPS) {
        throw new Error(`surveyStep must be smaller than ${NUM_SURVEY_STEPS}.`)
    }

    dataIndex = Math.min(NUM_DATA_PER_SURVEY_STEP - 1, dataIndex);

    const dataSet = await _getDataSet(surveyStep);

    if(dataSet === null) {
        throw new Error(`dataSet not found.`)
    }

    try {
        const data = await prisma.data.findFirst({
            where: {
                category: DataCategory.GroundTruth,
                order: dataIndex,
                dataSet: dataSet,
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
        console.error('Error getting survey step', error);
        return null;
    }
}

/**
 * Gets last emails.
 * @param lastN The number of emails to get.
 */
export async function getEmails(lastN: number): Promise<EMail[]> {
    const sessionData = await getSession();
    if (!sessionData) {
        throw new Error('getEmails: Session is invalid');
    }

    const surveyStepData = await _getSurveyStepData();
    if (surveyStepData === null) {
        throw new Error("An error occured.");
    }

    const dataSet = await _getDataSet(surveyStepData.surveyStep);

    if(dataSet === null) {
        throw new Error("dataSet not found.");
    }

    try {
        const data = await prisma.data.findMany({
            where: {
                category: DataCategory.GroundTruth,
                dataSet: dataSet,
                order: {
                    lte: surveyStepData.dataIndex,
                },
            },
            orderBy: {
                order: 'desc',
            },
            include: {
                EMail: true,
            },
            take: lastN,
        });
        if (!data) {
            throw new Error("Data is undefined.");
        }
        return data.map(item => item.EMail).filter(item => item !== null);

    } catch(error) {
        console.error(error);
        throw new Error("An error occured.");
    }
}

export async function isInitialQuestions(): Promise<boolean> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('isInitialQuestions: Session is invalid');
        return false;
    }
    return sessionData.surveyState === "InitialQuestions";
}

/**
 * Returns index of step of the survey.
 */
export async function getSurveyStep(): Promise<number|null> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getSurveyStep: Session is invalid');
        return null;
    }
    const surveyStepData = await _getSurveyStepData();
    if (surveyStepData === null) {
        return 0;
    }
    return surveyStepData.surveyStep;
}

interface SurveyStepData {
    surveyStep: number;
    dataIndex: number;
}

export async function _getSurveyStepData(): Promise<SurveyStepData|null> {
    const surveyState = await getParticipationState();
    if(!surveyState) {
        return null;
    }

    const surveyStep = surveyState.context.surveyStep;
    const dataIndex = surveyState.context.dataIndex;
    return {surveyStep: surveyStep, dataIndex};
}

export async function addBooking(booking: BookingCreateInput) {
    await addData(DataType.Booking, booking);
}

export async function addProperty(property: PropertyCreateInput) {
    await addData(DataType.Property, property);
}

export async function addMaintenance(maintenance: MaintenanceCreateInput) {
    await addData(DataType.Maintenance, maintenance);
}

/**
 * Adds data of the corresponding type. Payload must be correct for the specified type.
 */
async function addData(type: DataType, payload: unknown) {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('addData: Session is invalid');
        return;
    }
    const surveyStepData = await _getSurveyStepData();
    if (!surveyStepData) {
        throw new Error("SurveyStepData is null.");
    }

    const groundTruthData = await getGroundTruthData(surveyStepData.surveyStep, surveyStepData.dataIndex);
    if (!groundTruthData) {
        throw new Error("GroundTruthData is null.");
    }
    await prisma.participationData.create({
        data: {
            Participation: {
                connect: { id: sessionData.userId }
            },
            groundTruth: {
                connect: {id: groundTruthData.id}
            },
            surveyStep: surveyStepData.surveyStep,
            userData: {
                create: {
                    category: DataCategory.UserAdded,
                    type: type,
                    [type]: {
                        create: payload
                    }
                }
            }
        },
    });
}

export async function getBookings(): Promise<Booking[]> {
    return await getData(DataType.Booking) as unknown as Booking[];
}

export async function getProperties(): Promise<Property[]> {
    return await getData(DataType.Property) as unknown as Property[];
}

export async function getMaintenances(): Promise<Maintenance[]> {
    return await getData(DataType.Maintenance) as unknown as Maintenance[];
}

async function getData(type: DataType) {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('getData: Session is invalid');
        return null;
    }

    const userAddedData = await prisma.participationData.findMany({
        where: {
            Participation: {
                id: sessionData.userId
            },
            userData: {
                type: type
            }
        },
        select: {
            userData: {
                select: {
                    [type]: true,
                }
            }
        },
        orderBy: {
            userData: {
                timestamp: 'desc'
            }
        }
    });
    return userAddedData.map(data => data.userData[type]).filter(item => item !== null);
}

export async function setPromptHistory(promptHistory: string){
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('setPromptHistory: Session is invalid');
        return;
    }

    const aiSupport = await getAISupportForCurrentSurveyStep()
    if(aiSupport === null){
        throw new Error('Failed getting ai support.');
    }

    let promptHistoryKey;

    if (aiSupport === AISupport.AGENT) {
        promptHistoryKey = "promptHistoryAgent";
    } else if(aiSupport === AISupport.PROACTIVE_AGENT) {
        promptHistoryKey = "promptHistoryProactiveAgent";
    } else {
        return;
    }


        try {
        await prisma.participation.update({
            where: {
                id: sessionData.userId,
            },
            data: {
                [promptHistoryKey]: promptHistory,
            },
        });

    } catch {
        console.error("Failed to set prompt history")
    }
}

export async function addQuestionaireData(data: unknown) : Promise<boolean> {
    console.log(data);
    return true;
}

export async function addInitialQuestions(data: InitialQuestionsCreateInput) : Promise<boolean> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('addInitialQuestions: Session is invalid');
        return false;
    }
    try {
        await prisma.initialQuestions.create({
            data: {
                Participation: {
                    connect: {id: sessionData.userId}
                },
                ...data
            },
        });
    } catch {
        console.error("Failed to add initial questions")
        return false;
    }
    return true;
}

export async function addNoAgentQuestions(data: NoAgentQuestionsCreateInput) : Promise<boolean> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('addNoAgentQuestions: Session is invalid');
        return false;
    }
    try {
        await prisma.noAgentQuestions.create({
            data: {
                Participation: {
                    connect: {id: sessionData.userId}
                },
                ...data
            },
        });
    } catch {
        console.error("Failed to add no agent questions")
        return false;
    }
    return true;
}

export async function addAgentQuestions(data: NoAgentQuestionsCreateInput) : Promise<boolean> {
    const sessionData = await getSession();
    if (!sessionData) {
        console.error('addAgentQuestions: Session is invalid');
        return false;
    }
    try {
        await prisma.agentQuestions.create({
            data: {
                Participation: {
                    connect: {id: sessionData.userId}
                },
                ...data
            },
        });
    } catch {
        console.error("Failed to add agent questions")
        return false;
    }
    return true;
}