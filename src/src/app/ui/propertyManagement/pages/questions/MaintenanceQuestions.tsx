"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import { Button } from "@mui/material";


export default function MaintenanceQuestions() {
    const { completeUseCase } = useSurveyManager();

    return (
        <div>
            <div>Fragen für Instandhaltung (3)</div>
            <Button onClick={completeUseCase}>Abschicken</Button>
        </div>
    );
}