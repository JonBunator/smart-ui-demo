import {BotFilled} from "@fluentui/react-icons";
import {ChatMessage, ChatMessageCreator} from "smart-ui";
import "./ChatHistory.scss"
import Avatar from "@mui/material/Avatar";
import Markdown from 'react-markdown'
import {ReactNode, useEffect, useRef} from "react";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";

function AgentMessage({children}: { children: ReactNode }) {
    return (
        <div className="chat-history-element agent-message">
            <Avatar className="ai-avatar"><BotFilled/></Avatar>
            <div className="chat-history-message">
                <div className="message-no-time">
                    {children}
                </div>
            </div>
        </div>
    )
}

export interface ChatHistoryProps {
    agentResponseWithMotivation: boolean;
    history: ChatMessage[];
    loading: boolean;
    loadingText?: string;
}

export default function ChatHistory(props: ChatHistoryProps) {
    const {agentResponseWithMotivation, history, loading, loadingText} = props;
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);

    function getUIInteractionsInfo(numUIInteractions: number) {
        if (numUIInteractions === 1) {
            return "Eine Änderung vorgeschlagen";
        }
        return `${numUIInteractions} Änderungen vorgeschlagen`;
    }

    function getMotivation(item: ChatMessage) {
        const content = JSON.parse(item.message.content as string).output.motivation;

        if (!content.startsWith("Motivation:")) {
            return `**Motivation:** ${content}`
        }
        return content;
    }

    return (
        <div className="chat-history" ref={chatContainerRef}>
            <AgentMessage>
                Ich kann Ihnen helfen mit der Benutzeroberfläche zu interagieren. Fragen Sie etwas.
            </AgentMessage>
            {history
                .filter((item) => ((item.message.role === ChatMessageCreator.AGENT && item.message.content !== undefined) || item.message.role === ChatMessageCreator.USER))
                .map((item, index) => (
                    <div key={index}
                         className={`chat-history-element ${item.message.role === ChatMessageCreator.AGENT ? "agent-message" : "user-message"}`}>
                        {item.message.role === ChatMessageCreator.AGENT && (
                            <Avatar className="ai-avatar"><BotFilled/></Avatar>)}
                        <div className="chat-history-message">
                            {(() => {
                                let step = undefined;
                                let numSteps = undefined;
                                if (item.message.role === ChatMessageCreator.AGENT) {
                                    const parsedContent = JSON.parse(item.message.content as string);
                                    step = parsedContent.step;
                                    numSteps = parsedContent.numSteps;
                                }
                                if (step === undefined || numSteps === undefined) {
                                    return;
                                }

                                return (
                                    <div className="top-row">
                                        <div className="step-counter">
                                            <Typography>
                                                {step} von {numSteps}
                                            </Typography>
                                        </div>
                                    </div>
                                );
                            })()}

                            <div className="message">
                                {agentResponseWithMotivation && item.message.role === ChatMessageCreator.AGENT &&
                                    <>
                                        <div>
                                            <Markdown>
                                                {getMotivation(item)}
                                            </Markdown>
                                        </div>
                                        <Divider/>
                                    </>
                                }
                                <div>
                                    <Markdown>
                                        {item.message.role === ChatMessageCreator.AGENT ? JSON.parse(item.message.content as string).output.naturalLanguageInteraction : item.message.content}
                                    </Markdown>
                                </div>

                            </div>
                            {(() => {
                                let uiInteractionsLength = 0;
                                let isAgentWithInteractions = false;

                                if (item.message.role === ChatMessageCreator.AGENT) {
                                    const parsedContent = JSON.parse(item.message.content as string);
                                    uiInteractionsLength = parsedContent.output.uiInteractions.length;
                                    isAgentWithInteractions = uiInteractionsLength > 0;
                                }

                                return (
                                    <div
                                        className={`bottom-row ${isAgentWithInteractions ? "ui-interactions-available" : ""}`}>
                                        {item.sentTime !== "" && (
                                            <Typography className="time">
                                                {(new Date(item.sentTime)).toLocaleTimeString().split(":").slice(0, 2).join(":")}
                                            </Typography>
                                        )}
                                        {isAgentWithInteractions && (
                                            <div className="ui-interactions">
                                                <Typography color="textSecondary">
                                                    <i>{getUIInteractionsInfo(uiInteractionsLength)}</i>
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
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