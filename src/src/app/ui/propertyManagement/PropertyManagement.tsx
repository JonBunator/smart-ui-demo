"use client"
import {Paper} from "@mui/material";
import Agent from "@/app/ui/propertyManagement/Agent";
import NavigationBar from "@/app/ui/propertyManagement/navigationBar/NavigationBar";
import "./PropertyManagement.scss"

export default function PropertyManagement({ children }: { children: React.ReactNode }) {

    return (
        <div className="property-management">
            <NavigationBar/>
            <Paper className="property-management-content-container">
                {children}
            </Paper>
            <div className="agent-container">
                <Agent/>
            </div>
        </div>
    );
}