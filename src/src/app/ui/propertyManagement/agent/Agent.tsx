"use client"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import LayersIcon from '@mui/icons-material/Layers';
import {useSmartAgent, useSmartComponentManager} from "smart-ui"
import {useState} from "react";
import {Button, TextField, Paper, IconButton, Stack} from "@mui/material";
import './Agent.scss'
import ChatHistory from "@/app/ui/propertyManagement/agent/ChatHistory";

export default function Agent() {
    const [value, setValue] = useState("I am Jonas and 24 years old. I am male and like sports and Rubik's Cubes.");

    const {sendPrompt, approvalRequired, handleChangeApproval, chatHistory} = useSmartAgent();
    const {getHierarchy} = useSmartComponentManager();
    const [loading, setLoading] = useState(false);

    async function send() {
        setLoading(true);
        const sendValue = value;
        setValue("");
        await sendPrompt(sendValue);
        setLoading(false);
    }

    return (
        <Paper className="agent">
            <ChatHistory history={chatHistory} loading={loading}/>
            <div className="prompt-field">
                <TextField multiline
                           placeholder="Frag etwas..."
                           className="prompt-textfield"
                           fullWidth value={value} onChange={(event) => setValue(event.target.value)} />
                <div className="button-container">
                    {approvalRequired && (<>
                        <Button size="small" onClick={() => handleChangeApproval(false)} color="error" variant="contained"><ClearIcon/></Button>
                        <Button size="small" onClick={() => handleChangeApproval(true)} color="success" variant="contained"><DoneIcon/></Button>
                    </>)}
                    <Button loading={loading} loadingPosition="start" size="small" disabled={value.trim() === ''} className="send-button" startIcon={<SendIcon/>} variant="contained" onClick={send}>{loading ? "Sendet.." : "Senden"}</Button>
                </div>
            </div>
            <IconButton onClick={() => console.log(getHierarchy())}>
                <LayersIcon/>
            </IconButton>
        </Paper>
    );
}