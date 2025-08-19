import {AISupport} from "@/lib/types"

// Duration of one survey step in seconds
export const SURVEY_STEP_DURATION = 300;

export const NUM_SURVEY_STEPS = 2;

export const NUM_DATA_PER_SURVEY_STEP = 9;

export const NUM_SURVEY_TYPES = 2;

export const NUM_DATA_INDICES = 3;

export const AI_SUPPORT_ORDER = [
    [AISupport.NONE, AISupport.AGENT],
    [AISupport.NONE, AISupport.PROACTIVE_AGENT]]

export const DATASET_ORDER = [
    [0, 1],
    [1, 2],
    [2, 0],
]
