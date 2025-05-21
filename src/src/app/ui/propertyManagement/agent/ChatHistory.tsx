import { BotFilled } from "@fluentui/react-icons";
import {ChatMessage, ChatMessageCreator} from "smart-ui";
import "./ChatHistory.scss"
import { Avatar } from "@mui/material";
import {useEffect, useRef} from "react";

export interface ChatHistoryProps {
    history: ChatMessage[];
    loading: boolean;
}

export default function ChatHistory(props: ChatHistoryProps) {
    const {history, loading} = props;
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);


    return (
        <div className="chat-history" ref={chatContainerRef}>
            {history
                .filter((item) => item.creator !== ChatMessageCreator.SYSTEM)
                .map((item, index) => (
                <div key={index} className={`chat-history-element ${item.creator === ChatMessageCreator.AGENT ? "agent-message" : "user-message"}`}>
                    {item.creator === ChatMessageCreator.AGENT && (<Avatar className="ai-avatar"><BotFilled /></Avatar>)}
                    <div  className="chat-history-message">
                        <div className="message">
                            {item.creator === ChatMessageCreator.AGENT ? JSON.parse(item.message).naturalLanguageInteraction : item.message}
                        </div>
                        <div className="time">
                            {item.sentTime.toLocaleTimeString().split(":").slice(0, 2).join(":")}
                        </div>
                    </div>
                </div>
                ))}
        </div>

    );
}