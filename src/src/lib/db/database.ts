"use server"

import {
    AgentQuestionsType,
    Booking,
    Data,
    DataCategory,
    DataType,
    EMail,
    Maintenance,
    type Prisma,
    Property,
    Survey
} from "@prisma";
import {
    AI_SUPPORT_ORDER,
    DATASET_ORDER,
    NUM_DATA_INDICES,
    NUM_DATA_PER_SURVEY_STEP,
    NUM_SURVEY_STEPS,
    NUM_SURVEY_TYPES,
    SURVEY_TYPES_WITH_AGENT_RESPONSE_MOTIVATION
} from "../config";
import prisma from "./prisma";
import {getSession, setSession, updateSession} from "@/lib/security/session";
import {SnapshotFrom} from "xstate";
import surveyFlowMachine from "@/app/ui/propertyManagement/surveyManager/stateMachine";
import {AISupport} from "@/lib/types"
import {UnknownError} from "@/lib/exceptions";

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


    } catch (error) {
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

        const survey = await _getNextSurvey();

        if (survey === null) {
            return false;
        }

        const newParticipation = await prisma.participation.create({
            data: {
                surveyGroupId: surveyGroup.id,
                surveyType: survey.nextSurveyType,
                dataSetOrder: survey.nextDataSetOrder,
            },
        });
        await setSession({userId: newParticipation.id, surveyState: "InitialQuestions"})
        return true;

    } catch (error) {
        console.error('Error finding survey', error);
        return false;
    }
}


async function _getNextSurvey(): Promise<Survey | null> {
    const surveys = await prisma.survey.findMany({
        orderBy: {
            id: 'asc',
        },
        take: 2,
    });
    if (surveys === null || surveys.length === 0) {
        return null;
    }
    // Return first survey and increase, when no fillers there
    if (surveys.length === 1) {
        const survey = surveys[0];
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
        return survey;
    }
    // Return filler and delete otherwise
    const survey = surveys[1];
    await prisma.survey.delete({
        where: {
            id: survey.id,
        },
    });
    return survey;
}

export async function getSurveyCompletedMessage(): Promise<string> {
    const sessionData = await getSession();
    if (!sessionData) {
        return "";
    }

    try {
        const surveyGroup = await prisma.surveyGroup.findFirst({
            where: {
                Participations: {
                    some: {
                        id: sessionData.userId,
                    },
                },
            },
        });
        return surveyGroup?.surveyCompletedMessage ?? "";
    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

export async function getAISupportForCurrentSurveyStep(): Promise<AISupport | null> {
    const sessionData = await getSession();
    if (!sessionData) {
        return null;
    }

    const surveyStep = await getSurveyStep();
    if (surveyStep === null) {
        throw new UnknownError();
    }

    if (surveyStep >= NUM_SURVEY_STEPS) {
        throw new UnknownError();
    }

    try {
        const participation = await prisma.participation.findUnique({
            where: {
                id: sessionData.userId,
            },
        });

        if (!participation) {
            throw new UnknownError();
        }

        return AI_SUPPORT_ORDER[participation.surveyType][surveyStep];

    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

export async function isAgentResponseWithMotivation(): Promise<boolean | null> {
    const sessionData = await getSession();
    if (!sessionData) {
        return null;
    }

    try {
        const participation = await prisma.participation.findUnique({
            where: {
                id: sessionData.userId,
            },
        });

        if (!participation) {
            throw new UnknownError();
        }

        return SURVEY_TYPES_WITH_AGENT_RESPONSE_MOTIVATION.includes(participation.surveyType);

    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}


/**
 * Sets the current state of the survey state machine.
 * @param state Stringified JSON state.
 */
export async function setParticipationState(state: string) {
    const sessionData = await getSession();
    if (!sessionData) {
        return;
    }

    try {
        const stateObject: SnapshotFrom<typeof surveyFlowMachine> = JSON.parse(state);
        const surveyState = stateObject.value

        await updateSession({...sessionData, surveyState: surveyState})

        type UpdateData = {
            state: string;
            surveyState: string;
            completionTimestamp?: Date;
        };

        let updateData: UpdateData = {
            state: state,
            surveyState: JSON.stringify(surveyState),
        };

        if (surveyState === "Finished") {
            updateData = {...updateData, completionTimestamp: new Date()}
        }

        await prisma.participation.update({
            where: {
                id: sessionData.userId,
            },
            data: updateData,
        });


    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

/**
 * Gets the saved survey state machine state.
 */
export async function getParticipationState(): Promise<SnapshotFrom<typeof surveyFlowMachine> | null> {
    const sessionData = await getSession();
    //Don't throw error since participation state should be callable when session is still invalid
    if (!sessionData) {
        return null;
    }

    try {
        const participation = await prisma.participation.findUnique({
            where: {
                id: sessionData.userId,
            },
        });

        if (!participation) {
            throw new UnknownError();
        }
        return participation.state ? JSON.parse(participation.state) : null;

    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

/**
 * Returns emails for survey steps where the sequence is less than or equal to the dataIndex.
 */
export async function getAllEMails(): Promise<EMail[]> {
    const sessionData = await getSession();
    if (!sessionData) {
        return [];
    }

    const surveyStepData = await _getSurveyStepData();
    if (surveyStepData === null) {
        return [];
    }
    const surveyStep = surveyStepData.surveyStep;
    const dataIndex = Math.min(NUM_DATA_PER_SURVEY_STEP - 1, surveyStepData.dataIndex);

    if (surveyStep >= NUM_SURVEY_STEPS) {
        throw new Error(`surveyStep must be smaller than ${NUM_SURVEY_STEPS}.`)
    }

    const dataSet = await _getDataSet(surveyStep);

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

        if (!data) {
            throw new UnknownError();
        }
        return data.map(d => d.EMail).filter(email => email !== null);

    } catch (error) {
        console.error(error);
        throw new UnknownError();

    }
}

async function _getGroundTruthData(surveyStep: number, dataIndex: number): Promise<Data | null> {
    const sessionData = await getSession();
    if (!sessionData) {
        return null;
    }

    if (surveyStep >= NUM_SURVEY_STEPS) {
        console.error(`surveyStep must be smaller than ${NUM_SURVEY_STEPS}.`);
        throw new UnknownError();
    }

    dataIndex = Math.min(NUM_DATA_PER_SURVEY_STEP - 1, dataIndex);

    const dataSet = await _getDataSet(surveyStep);

    try {
        const data = await prisma.data.findFirst({
            where: {
                category: DataCategory.GroundTruth,
                dataSet: dataSet,
                order: dataIndex,
            }
        });

        if (!data) {
            throw new UnknownError();
        }
        return data;

    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

async function _getDataSet(surveyStep: number): Promise<number | null> {
    const sessionData = await getSession();
    if (!sessionData) {
        return null;
    }

    try {
        const participation = await prisma.participation.findUnique({
            where: {
                id: sessionData.userId,
            },
        });

        if (!participation) {
            throw new UnknownError();
        }
        return DATASET_ORDER[participation.dataSetOrder][surveyStep];

    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

/**
 * Returns emails for survey steps where the sequence is less than or equal to the dataIndex.
 */
export async function getEMail(surveyStep: number, dataIndex: number): Promise<EMail | null> {
    const sessionData = await getSession();
    if (!sessionData) {
        return null;
    }

    if (surveyStep >= NUM_SURVEY_STEPS) {
        console.error(`surveyStep must be smaller than ${NUM_SURVEY_STEPS}.`);
        throw new UnknownError();
    }

    dataIndex = Math.min(NUM_DATA_PER_SURVEY_STEP - 1, dataIndex);

    const dataSet = await _getDataSet(surveyStep);

    if (dataSet === null) {
        throw new UnknownError();
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
            throw new UnknownError();
        }
        return data.EMail;

    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

/**
 * Gets last emails.
 * @param lastN The number of emails to get.
 */
export async function getEmails(lastN: number): Promise<EMail[]> {
    const sessionData = await getSession();
    if (!sessionData) {
        return [];
    }

    const surveyStepData = await _getSurveyStepData();
    if (surveyStepData === null) {
        throw new UnknownError();
    }

    const dataSet = await _getDataSet(surveyStepData.surveyStep);

    if (dataSet === null) {
        throw new UnknownError();
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
            throw new UnknownError();
        }
        return data.map(item => item.EMail).filter(item => item !== null);

    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

export async function isInitialQuestions(): Promise<boolean> {
    const sessionData = await getSession();
    if (!sessionData) {
        return false;
    }
    return sessionData.surveyState === "InitialQuestions";
}

/**
 * Returns index of step of the survey.
 */
export async function getSurveyStep(): Promise<number> {
    const sessionData = await getSession();
    if (!sessionData) {
        return 0;
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

export async function _getSurveyStepData(): Promise<SurveyStepData | null> {
    const surveyState = await getParticipationState();
    if (surveyState === null) {
        return null;
    }

    const surveyStep = surveyState.context.surveyStep;
    const dataIndex = surveyState.context.dataIndex;
    return {surveyStep: surveyStep, dataIndex};
}

type AddBookingType = Omit<Prisma.BookingCreateInput, "data">

export async function addBooking(booking: AddBookingType) {
    await _addData(DataType.Booking, booking);
}

type AddPropertyType = Omit<Prisma.PropertyCreateInput, "data">

export async function addProperty(property: AddPropertyType) {
    await _addData(DataType.Property, property);
}

type AddMaintenanceType = Omit<Prisma.MaintenanceCreateInput, "data">

export async function addMaintenance(maintenance: AddMaintenanceType) {
    await _addData(DataType.Maintenance, maintenance);
}

/**
 * Adds data of the corresponding type. Payload must be correct for the specified type.
 */
async function _addData(type: DataType, payload: unknown) {
    const sessionData = await getSession();
    if (!sessionData) {
        return;
    }

    const surveyStepData = await _getSurveyStepData();
    if (!surveyStepData) {
        throw new UnknownError();
    }

    const groundTruthData = await _getGroundTruthData(surveyStepData.surveyStep, surveyStepData.dataIndex);

    if (groundTruthData === null) {
        throw new UnknownError();
    }

    try {
        await prisma.participationData.create({
            data: {
                Participation: {
                    connect: {id: sessionData.userId}
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
    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

export async function getBookings(): Promise<Booking[]> {
    return await _getData(DataType.Booking) as unknown as Booking[];
}

export async function getProperties(): Promise<Property[]> {
    return await _getData(DataType.Property) as unknown as Property[];
}

export async function getMaintenances(): Promise<Maintenance[]> {
    return await _getData(DataType.Maintenance) as unknown as Maintenance[];
}

async function _getData(type: DataType) {
    const sessionData = await getSession();
    if (!sessionData) {
        return [];
    }

    try {
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
    } catch (error) {
        console.error(error);
        throw new UnknownError();
    }
}

export async function setPromptHistory(promptHistory: string) {
    const sessionData = await getSession();
    if (!sessionData) {
        return;
    }

    const aiSupport = await getAISupportForCurrentSurveyStep()

    if (aiSupport === null) {
        throw new UnknownError();
    }

    let promptHistoryKey;

    if (aiSupport === AISupport.AGENT) {
        promptHistoryKey = "promptHistoryAgent";
    } else if (aiSupport === AISupport.PROACTIVE_AGENT) {
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

    } catch (error) {
        console.error(error)
        throw new UnknownError();
    }
}

type AddInitialQuestionsType = Omit<Prisma.InitialQuestionsCreateInput, "Participation">

export async function addInitialQuestions(data: AddInitialQuestionsType): Promise<boolean> {
    const sessionData = await getSession();
    if (!sessionData) {
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
    } catch (error) {
        console.error(error)
        return false;
    }
    return true;
}

type AddNoAgentQuestionsType = Omit<Prisma.NoAgentQuestionsCreateInput, "Participation">

export async function addNoAgentQuestions(data: AddNoAgentQuestionsType): Promise<boolean> {
    const sessionData = await getSession();
    if (!sessionData) {
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
    } catch (error) {
        console.error(error)
        return false;
    }
    return true;
}

type AddAgentQuestionsType = Omit<Prisma.AgentQuestionsCreateInput, "type" | "Participation">

export async function addAgentQuestions(data: AddAgentQuestionsType): Promise<boolean> {
    const sessionData = await getSession();
    if (!sessionData) {
        return false;
    }

    const aiSupport = await getAISupportForCurrentSurveyStep();

    if (aiSupport === null) {
        throw new UnknownError();
    }

    const type = aiSupport === AISupport.AGENT ? AgentQuestionsType.AGENT : AgentQuestionsType.PROACTIVE_AGENT;
    const payload: Omit<Prisma.AgentQuestionsCreateInput, "Participation"> = {...data, type: type};
    try {
        await prisma.agentQuestions.create({
            data: {
                Participation: {
                    connect: {id: sessionData.userId}
                },
                ...payload
            },
        });
    } catch (error) {
        console.error(error)
        return false;
    }
    return true;
}