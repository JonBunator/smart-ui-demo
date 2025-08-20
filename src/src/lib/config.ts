import {AISupport} from "@/lib/types"

// Duration of one survey step in seconds
export const SURVEY_STEP_DURATION = 300;

export const NUM_SURVEY_STEPS = 3;

export const NUM_DATA_PER_SURVEY_STEP = 9;

export const NUM_SURVEY_TYPES = 4;

export const NUM_DATA_INDICES = 6;

export const AI_SUPPORT_ORDER = [
    [AISupport.NONE, AISupport.AGENT, AISupport.PROACTIVE_AGENT],
    [AISupport.NONE, AISupport.PROACTIVE_AGENT, AISupport.AGENT],
    [AISupport.NONE, AISupport.AGENT, AISupport.PROACTIVE_AGENT],
    [AISupport.NONE, AISupport.PROACTIVE_AGENT, AISupport.AGENT]]

export const SURVEY_TYPES_WITH_AGENT_RESPONSE_MOTIVATION = [1, 2];

export const DATASET_ORDER = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 2, 0],
    [1, 0, 2],
    [2, 0, 1],
    [2, 1, 0]
]
