"use client"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import {useSmartAgent} from "smart-ui"
import {useState} from "react";
import {Button, TextField, Paper, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './Agent.scss'
import ChatHistory from "@/app/ui/propertyManagement/agent/ChatHistory";

export default function Agent() {
    const [value, setValue] = useState("I am Jonas and 24 years old. I am male and like sports and Rubik's Cubes.");
    const {sendPrompt, approvalRequired, handleChangeApproval, chatHistory, deleteChatHistory, loading} = useSmartAgent();

    async function send() {
        const sendValue = value;
        setValue("");
        await sendPrompt(sendValue);
    }

    return (
        <Paper className="agent">
            <ChatHistory history={chatHistory} loading={loading}/>
            <div className="prompt-field">
                <TextField multiline
                           placeholder="Frag etwas..."
                           className="prompt-textfield"
                           fullWidth value={value} onChange={(event) => setValue(event.target.value)} />
                <div className="field-buttons">
                    {approvalRequired && (<>
                        <Button className="approval-button" size="small" startIcon={<ClearIcon/>} onClick={async () => await handleChangeApproval(false)} color="error" variant="contained"></Button>
                        <Button className="approval-button" size="small" startIcon={<DoneIcon/>} onClick={async () => await handleChangeApproval(true)} color="success" variant="contained"></Button>
                    </>)}
                    <Button loading={loading} loadingPosition="start" size="small" disabled={value.trim() === ''} className="send-button ai-agent" startIcon={<SendIcon/>} variant="contained" onClick={send}>{loading ? "Sendet.." : "Senden"}</Button>
                </div>

            </div>
            <div className="bottom-buttons">
                <IconButton onClick={() => deleteChatHistory()}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </Paper>
    );
}