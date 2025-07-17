import React from "react";
import { Paper } from "@mui/material";
import "./FrameLayout.scss"

export default function FrameLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="frame-layout">
            <Paper className="frame-layout-content">
                {children}
            </Paper>
        </div>
    );
}