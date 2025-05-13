"use client"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import LayersIcon from '@mui/icons-material/Layers';
import {useSmartAgent, useSmartComponentManager} from "smart-ui"
import {useState} from "react";
import {Button, TextField, Paper, IconButton, Stack} from "@mui/material";
import './Agent.scss'

export default function Agent() {
    const [value, setValue] = useState("I am Jonas and 24 years old. I am male and like sports and Rubik's Cubes.");

    const {sendPrompt, approvalRequired, handleChangeApproval} = useSmartAgent();
    const {getHierarchy} = useSmartComponentManager();

    return (
        <Paper className="agent">
            <TextField multiline fullWidth rows={10} value={value} onChange={(event) => setValue(event.target.value)} />
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
                <Button startIcon={<SendIcon/>} variant="contained" onClick={() => sendPrompt(value)}>Send</Button>
                }
            </div>
        </Paper>
    );
}