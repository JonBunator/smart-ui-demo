import { AISupport, DataType } from '@prisma'

// Duration of one use case in seconds
export const USE_CASE_DURATION = 3;

export const NUM_USE_CASES = 3;

export const NUM_DATA_PER_USE_CASE = 5;

// Order is important, because use case is querried by index
export const USE_CASE_INDEX_TYPES = [DataType.Booking, DataType.Property, DataType.Maintenance]

export const AI_SUPPORT_ORDER = [[AISupport.NONE, AISupport.AGENT, AISupport.PROACTIVE_AGENT],
    [AISupport.AGENT, AISupport.NONE, AISupport.PROACTIVE_AGENT],
    [AISupport.PROACTIVE_AGENT, AISupport.NONE, AISupport.AGENT],
    [AISupport.NONE, AISupport.PROACTIVE_AGENT, AISupport.AGENT],
    [AISupport.AGENT, AISupport.PROACTIVE_AGENT, AISupport.NONE],
    [AISupport.PROACTIVE_AGENT, AISupport.AGENT, AISupport.NONE]]