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
import { ChatMessageCreator, ChatHistoryElement } from './types';

const history: ChatHistoryElement[] = [
    {creator: ChatMessageCreator.AGENT, message: "This is an agent message"},
    {creator: ChatMessageCreator.USER, message: "This is an user message"},
]

export default function Agent() {
    const [value, setValue] = useState("I am Jonas and 24 years old. I am male and like sports and Rubik's Cubes.");

    const {sendPrompt, approvalRequired, handleChangeApproval} = useSmartAgent();
    const {getHierarchy} = useSmartComponentManager();
    const [loading, setLoading] = useState(false);



    async function send() {
        setLoading(true);
        await sendPrompt(value);
        setLoading(false);
    }

    return (
        <Paper className="agent">
            <ChatHistory history={history}/>
            <div className="prompt-field">
                <TextField multiline
                           className="prompt-textfield"
                           fullWidth value={value} onChange={(event) => setValue(event.target.value)} />
                <div className="button-container">
                    <IconButton onClick={() => console.log(getHierarchy())}>
                        <LayersIcon/>
                    </IconButton>
                    {
                    approvalRequired ?
                    <Stack direction="row" spacing={2}>
                        <Button size="small" onClick={() => handleChangeApproval(false)} startIcon={<ClearIcon/>} color="error" variant="contained">Decline</Button>
                        <Button size="small" onClick={() => handleChangeApproval(true)} startIcon={<DoneIcon/>} color="success" variant="contained">Approve</Button>
                    </Stack>
                        :
                    <Button loading={loading} loadingPosition="start" size="small" disabled={value.trim() === ''} className="send-button" startIcon={<SendIcon/>} variant="contained" onClick={send}>{loading ? "Sendet.." : "Senden"}</Button>
                    }
                </div>
            </div>

        </Paper>
    );
}