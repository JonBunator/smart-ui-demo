"use client"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import {ChatMessageCreator, useSmartAgent} from "smart-ui"
import {useEffect, useState} from "react";
import {Button, Paper, TextField} from "@mui/material";
import './Agent.scss'
import ChatHistory from "@/app/ui/propertyManagement/agent/ChatHistory";
import {useSnackbar} from "@/app/ui/providers/SnackbarProvider";

interface AgentProps {
    agentResponseWithMotivation: boolean;
}

export default function Agent(props: AgentProps) {
    const {agentResponseWithMotivation} = props;
    const [value, setValue] = useState("");
    const [showYesNoButton, setShowYesNoButton] = useState(false);
    const {
        sendPrompt,
        approvalRequired,
        handleChangeApproval,
        chatHistory,
        loading,
        loadingText
    } = useSmartAgent();
    const {error} = useSnackbar();


    async function send() {
        const sendValue = value;
        setValue("");
        await sendMessage(sendValue);
    }

    async function sendMessage(message: string) {
        try {
            await sendPrompt(message);
        } catch {
            error();
        }
    }

    useEffect(() => {
        const lastMessage = chatHistory[chatHistory.length - 1];
        if (lastMessage !== undefined && lastMessage.message.role === ChatMessageCreator.AGENT && lastMessage.message.content !== undefined) {
            const content = JSON.parse(lastMessage.message.content as string).output;
            setShowYesNoButton(content.yesNoButtons);
        } else {
            setShowYesNoButton(false);
        }
    }, [chatHistory]);

    return (
        <Paper className="agent">
            <ChatHistory agentResponseWithMotivation={agentResponseWithMotivation} history={chatHistory}
                         loading={loading} loadingText={loadingText}/>
            {showYesNoButton && (<div className="yes-no-buttons">
                <Button size="small" onClick={async () => await sendMessage("Nein")} variant="outlined">Nein</Button>
                <Button size="small" onClick={async () => await sendMessage("Ja")} variant="outlined">Ja</Button>
            </div>)}
            {approvalRequired && (<div className="approval-buttons">
                <Button size="small" startIcon={<ClearIcon/>} onClick={async () => await handleChangeApproval(false)}
                        color="error" variant="contained">Ablehnen</Button>
                <Button size="small" startIcon={<DoneIcon/>} onClick={async () => await handleChangeApproval(true)}
                        color="success" variant="contained">Annehmen</Button>
            </div>)}
            <div className="prompt-field">
                <TextField multiline
                           placeholder="Fragen Sie etwas..."
                           className="prompt-textfield"
                           fullWidth value={value} onChange={(event) => setValue(event.target.value)}/>
                <div className="field-buttons">
                    <Button loading={loading} loadingPosition="start" size="small" disabled={value.trim() === ''}
                            className="send-button ai-agent" startIcon={<SendIcon/>} variant="contained"
                            onClick={send}>{loading ? "Sendet.." : "Senden"}</Button>
                </div>
            </div>
        </Paper>
    );
}