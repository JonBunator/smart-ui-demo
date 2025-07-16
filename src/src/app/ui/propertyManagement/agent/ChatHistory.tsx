import { BotFilled } from "@fluentui/react-icons";
import {ChatMessage, ChatMessageCreator} from "smart-ui";
import "./ChatHistory.scss"
import { Avatar, Typography } from "@mui/material";
import Markdown from 'react-markdown'
import {ReactNode, useEffect, useRef} from "react";

function AgentMessage({children}: {children: ReactNode}) {
    return (
        <div className="chat-history-element agent-message">
            <Avatar className="ai-avatar"><BotFilled /></Avatar>
            <div  className="chat-history-message">
                {children}
            </div>
        </div>
    )
}

export interface ChatHistoryProps {
    history: ChatMessage[];
    loading: boolean;
    loadingText?: string;
}

export default function ChatHistory(props: ChatHistoryProps) {
    const {history, loading, loadingText} = props;
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);


    return (
        <div className="chat-history" ref={chatContainerRef}>
            <AgentMessage>
                Ich kann Ihnen helfen mit der Benutzeroberfläche zu interagieren. Fragen Sie etwas.
            </AgentMessage>
            {history
                .filter((item) => item.creator !== ChatMessageCreator.SYSTEM)
                .map((item, index) => (
                <div key={index} className={`chat-history-element ${item.creator === ChatMessageCreator.AGENT ? "agent-message" : "user-message"}`}>
                    {item.creator === ChatMessageCreator.AGENT && (<Avatar className="ai-avatar"><BotFilled /></Avatar>)}
                    <div  className="chat-history-message">
                        <div className="message">
                            <Markdown>
                                {item.creator === ChatMessageCreator.AGENT ? JSON.parse(item.message).naturalLanguageInteraction : item.message}
                            </Markdown>
                        </div>
                        {item.sentTime !== "" && <div className="time">
                            {(new Date(item.sentTime)).toLocaleTimeString().split(":").slice(0, 2).join(":")}
                        </div>}
                    </div>
                </div>
                ))}
            {loading && (
                <AgentMessage>
                    <div className="loading-message">
                        {loadingText && <i>{loadingText}</i>}
                        <div className="loader"/>
                    </div>
                </AgentMessage>
            )}
        </div>

    );
}