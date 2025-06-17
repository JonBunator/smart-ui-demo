"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";

const useCasesContent = [
    {
        title: "Anwendungsfall Buchungen starten",
        content: "Starte den ersten Anwendungsfall."
    },
    {
        title: "Anwendungsfall Immobilien starten",
        content: "Starte den zweiten Anwendungsfall."
    },
    {
        title: "Anwendungsfall Instandhaltung starten",
        content: "Starte den dritten Anwendungsfall."
    },
]

export default function StartUseCaseDialog() {
    const { snapshot, startUseCase } = useSurveyManager();

    async function approve() {
        await startUseCase();
    }

    const useCaseIndex = snapshot?.context.useCaseIndex ?? 0;

    return (
        <ApprovalDialog open={snapshot?.matches({UseCase: "NotStarted"}) ?? false}
                        closable={false}
                        onApprove={approve}
                        title={useCasesContent[useCaseIndex].title}
                        content={useCasesContent[useCaseIndex].content}
        />
    );
}