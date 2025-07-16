import { AISupport, DataType } from '@prisma'

// Duration of one use case in seconds
export const USE_CASE_DURATION = 300;

export const NUM_USE_CASES = 3;

export const NUM_DATA_PER_USE_CASE = 10;

// Order is important, because use case is querried by index
export const USE_CASE_INDEX_TYPES = [DataType.Booking, DataType.Property, DataType.Maintenance]

export const AI_SUPPORT_ORDER = [[AISupport.NONE, AISupport.AGENT, AISupport.PROACTIVE_AGENT],
    [AISupport.NONE, AISupport.PROACTIVE_AGENT, AISupport.AGENT]]

export const NUM_AI_SUPPORT_ORDER_ELEMENTS = AI_SUPPORT_ORDER.length;