
export enum ChatMessageCreator {
    AGENT = 'agent',
    USER = 'user',
}

export interface ChatHistoryElement {
    creator: ChatMessageCreator
    message: string
}