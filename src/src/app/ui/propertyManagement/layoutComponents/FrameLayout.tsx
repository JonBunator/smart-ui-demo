import React from "react";
import {Paper} from "@mui/material";
import "./FrameLayout.scss"
import Background from "@/app/ui/propertyManagement/layoutComponents/Background";

export default function FrameLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="frame-layout">
            <Paper className="frame-layout-content">
                {children}
            </Paper>
            <Background/>
        </div>
    );
}