"use client"
import React from 'react';
import { useSmartComponentManager } from 'smart-ui';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import {IconButton} from "@mui/material";
import {invalidateSession} from "@/lib/security/session";
import "./DebugButtons.scss"
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";

export default function DebugButtons() {
    const {getHierarchy} = useSmartComponentManager();
    const {stateMachine} = useSurveyManager();

    async function logout() {
        await invalidateSession();
    }

    function timerOut() {
        stateMachine?.send({type: "timerOut"})
    }

    return (
        <div className="debug-buttons">
            <IconButton onClick={timerOut}>
                <TimerOffIcon/>
            </IconButton>
            <IconButton onClick={logout}>
                <LogoutIcon/>
            </IconButton>
            <IconButton onClick={() => console.log(getHierarchy())}>
                <LayersIcon/>
            </IconButton>
        </div>
    );
};