"use client"
import React from 'react';
import { useSmartComponentManager } from 'smart-ui';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from "@mui/material";
import {invalidateSession} from "@/lib/security/session";
import "./DebugButtons.scss"

export default function DebugButtons() {
    const {getHierarchy} = useSmartComponentManager();

    async function logout() {
        await invalidateSession();
    }

    return (
        <div className="debug-buttons">
            <IconButton onClick={logout}>
                <LogoutIcon/>
            </IconButton>
            <IconButton onClick={() => console.log(getHierarchy())}>
                <LayersIcon/>
            </IconButton>
        </div>
    );
};