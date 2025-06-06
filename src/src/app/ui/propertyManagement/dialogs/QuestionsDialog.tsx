"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";

const questionsContent = [
    {
        title: "Fragebogen für Buchungen",
        content: "Fragen für den ersten Anwendungsfall."
    },
    {
        title: "Fragebogen für Immobilien",
        content: "Fragen für den zweiten Anwendungsfall."
    },
    {
        title: "Fragebogen für Instandhaltung",
        content: "Fragen für den dritten Anwendungsfall."
    },
]

export default function QuestionsDialog() {
    const { snapshot, completeUseCase } = useSurveyManager();

    function approve() {
        completeUseCase();
    }

    const useCaseIndex = snapshot?.context.useCaseIndex ?? 0;

    return (
        <ApprovalDialog open={snapshot?.matches({UseCase: "Questions"}) ?? false}
                        closable={false}
                        onApprove={approve}
                        approvalTitle="Abschicken"
                        title={questionsContent[useCaseIndex].title}
                        content={questionsContent[useCaseIndex].content}
        />
    );
}