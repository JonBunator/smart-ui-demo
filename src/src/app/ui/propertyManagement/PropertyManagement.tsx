"use client"
import {Paper} from "@mui/material";
import Agent from "@/app/ui/propertyManagement/agent/Agent";
import NavigationBar from "@/app/ui/propertyManagement/navigationBar/NavigationBar";
import StartSurveyDialog from "@/app/ui/propertyManagement/dialogs/StartSurveyDialog";
import StartUseCaseDialog from "@/app/ui/propertyManagement/dialogs/StartUseCaseDialog";
import QuestionsDialog from "@/app/ui/propertyManagement/dialogs/QuestionsDialog";
import SurveyCompletedDialog from "@/app/ui/propertyManagement/dialogs/SurveyCompletedDialog";
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
            <StartSurveyDialog/>
            <StartUseCaseDialog/>
            <QuestionsDialog/>
            <SurveyCompletedDialog/>
        </div>
    );
}