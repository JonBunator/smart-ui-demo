"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import { Button } from "@mui/material";
import {useRouter} from "next/navigation";

const questionsContent = [
    {
        title: "Fragebogen für Buchungen",
        content: "Fragen für den ersten Anwendungsfall.",
        nextURL: "/survey/properties"
    },
    {
        title: "Fragebogen für Immobilien",
        content: "Fragen für den zweiten Anwendungsfall.",
        nextURL: "/survey/maintenance"
    },
    {
        title: "Fragebogen für Instandhaltung",
        content: "Fragen für den dritten Anwendungsfall.",
        nextURL: "/completed"
    },
]

export default function Questions() {
    const { snapshot, completeUseCase } = useSurveyManager();
    const router = useRouter();

    async function approve() {
        await completeUseCase();
        router.push(questionsContent[useCaseIndex].nextURL)
    }

    const useCaseIndex = snapshot?.context.useCaseIndex ?? 0;

    return (
        <div>
            <div>{questionsContent[useCaseIndex].title}</div>
            <div>{questionsContent[useCaseIndex].content}</div>
            <Button onClick={approve}>Abschicken</Button>
        </div>
    );
}