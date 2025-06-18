"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import { Button } from "@mui/material";


export default function PropertiesQuestions() {
    const { completeUseCase } = useSurveyManager();

    return (
        <div>
            <div>Fragen für Immobilien (2)</div>
            <Button onClick={completeUseCase}>Abschicken</Button>
        </div>
    );
}