"use client"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import {useSmartAgent, useSmartComponentManager} from "smart-ui"
import {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import './Agent.scss'

export default function Agent() {
    const [value, setValue] = useState("I am Jonas and 24 years old. I am male and like sports and Rubik's Cubes.");

    const {sendPrompt, approvalRequired, handleChangeApproval} = useSmartAgent();
    const {getHierarchy} = useSmartComponentManager();

    return (
        <div className="agent">
            <TextField multiline fullWidth rows={10} value={value} onChange={(event) => setValue(event.target.value)} />
            <div className="button-container">
                <Button onClick={() => console.log(getHierarchy())}>Print structure</Button>
                {
                approvalRequired ?
                <>
                    <Button size="small" onClick={() => handleChangeApproval(false)} startIcon={<ClearIcon/>} color="error" variant="contained">Decline</Button>
                    <Button size="small" onClick={() => handleChangeApproval(true)} startIcon={<DoneIcon/>} color="success" variant="contained">Approve</Button>
                </>
                    :
                <Button startIcon={<SendIcon/>} variant="contained" onClick={() => sendPrompt(value)}>Send</Button>
                }
            </div>
        </div>
    );
}