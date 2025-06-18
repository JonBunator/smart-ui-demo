"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import { Button } from "@mui/material";


export default function BookingsQuestions() {
    const { completeUseCase } = useSurveyManager();

    return (
        <div>
            <div>Fragen für Buchungen (1)</div>
            <Button onClick={completeUseCase}>Abschicken</Button>
        </div>
    );
}