"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import {useEffect, useState} from "react";
import {AISupport} from "@prisma";
import {getAISupportForCurrentUseCase} from "@/lib/db/database";

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
    const [aiSupport, setAiSupport] = useState<AISupport | undefined>(undefined);
    const useCaseIndex = snapshot?.context.useCaseIndex ?? 0;

    function approve() {
        startUseCase();
    }

    function getAISupportDescription() {
        switch (aiSupport) {
            case AISupport.NONE:
                return "(ohne AI Unterstützung)";
            case AISupport.AGENT:
                return "(mit AI Unterstützung durch Chatbot)";
            case AISupport.PROACTIVE_AGENT:
                return "(mit AI Unterstützung durch proaktiven Chatbot)";
            default:
                return "";
        }
    }


    useEffect(() => {
        getAISupportForCurrentUseCase()
            .then(aiSupport => setAiSupport(aiSupport ?? undefined));
    }, []);

    return (
        <ApprovalDialog open={snapshot?.matches({UseCase: "NotStarted"}) ?? false}
                        closable={false}
                        onApprove={approve}
                        title={useCasesContent[useCaseIndex].title}
                        content={`${useCasesContent[useCaseIndex].content} ${getAISupportDescription()}`}
        />
    );
}