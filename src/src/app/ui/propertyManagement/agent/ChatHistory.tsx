import {ChatHistoryElement, ChatMessageCreator} from "@/app/ui/propertyManagement/agent/types";
import { BotFilled } from "@fluentui/react-icons";
import "./ChatHistory.scss"
import { Avatar } from "@mui/material";

export interface ChatHistoryProps {
    history: ChatHistoryElement[];
}

export default function ChatHistory(props: ChatHistoryProps) {
    const {history} = props;

    return (
        <div className="chat-history">
            {history.map((item, index) => (
                <div key={index} className={`chat-history-element ${item.creator === ChatMessageCreator.AGENT ? "agent-message" : "user-message"}`}>
                    {item.creator === ChatMessageCreator.AGENT && (<Avatar className="ai-avatar"><BotFilled /></Avatar>)}
                    <div  className="chat-history-message">{item.message}</div>
                </div>
                ))}
        </div>

    );
}