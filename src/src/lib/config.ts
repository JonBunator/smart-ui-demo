import {DataType} from '@prisma'
import {AISupport} from "@/lib/types"

// Duration of one survey step in seconds
export const SURVEY_STEP_DURATION = 30000;

export const NUM_SURVEY_STEPS = 3;

export const NUM_DATA_PER_SURVEY_STEP = 10;

export const NUM_SURVEY_TYPES = 4;

export const NUM_DATA_INDICES = 6;

export const AI_SUPPORT_ORDER = [
    [AISupport.NONE, AISupport.AGENT, AISupport.PROACTIVE_AGENT],
    [AISupport.NONE, AISupport.PROACTIVE_AGENT, AISupport.AGENT],
    [AISupport.NONE, AISupport.AGENT, AISupport.PROACTIVE_AGENT],
    [AISupport.NONE, AISupport.PROACTIVE_AGENT, AISupport.AGENT]]

export const DATASET_ORDER = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 2, 0],
    [1, 0, 2],
    [2, 0, 1],
    [2, 1, 0]
]

export const CUSTOM_SYSTEM_PROMPT = `You are an assistant that helps users interact with user interfaces. The user is an\
 employee of a company that manages vacation homes. You help him interact with the management software. The tasks of the\
 user include adding bookings of customers, adding new vacation homes and adding maintenance requests. Bookings and maintenance requests\
 are received via email by customers. Vacation home properties that need to be added to the system can also be received via\
 email from the user's boss. You can access the emails of the user. Ask the user before accessing them.
Answer in german.\
 Interact with the UI based on the content provided by the user. The ui changes you suggest, still need to be accepted by the\
 user by clicking on accept or deny buttons to take effect. UI interactions are appended to the current state, you might\
 need to revert previously suggested changes. Don't invent new information if not asked specifically. Explain button\
 interactions to the user.`