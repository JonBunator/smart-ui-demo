"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import BookingsUseCaseDescription from "@/app/ui/propertyManagement/dialogs/useCaseDescription/BookingsUseCaseDescription";
import PropertiesUseCaseDescription from "@/app/ui/propertyManagement/dialogs/useCaseDescription/PropertiesUseCaseDescription";
import MaintenanceUseCaseDescription from "@/app/ui/propertyManagement/dialogs/useCaseDescription/MaintenanceUseCaseDescription";
import {useEffect, useState} from "react";

const useCasesContent = [
    {
        title: "Anwendungsfall Buchungen",
        content: <BookingsUseCaseDescription/>,
        maxWidth: "sm"
    },
    {
        title: "Anwendungsfall Immobilien",
        content: <PropertiesUseCaseDescription/>,
        maxWidth: "md"
    },
    {
        title: "Anwendungsfall Instandhaltung",
        content: <MaintenanceUseCaseDescription/>,
        maxWidth: "md"
    },
]

export default function UseCaseDescriptionDialog() {
    const { snapshot, startUseCase, showHelpDialog } = useSurveyManager();
    const [approvalTitle, setApprovalTitle] = useState("Starten");
    const useCaseIndex = snapshot?.context.useCaseIndex ?? 0;

    useEffect(() => {
        if(snapshot?.context.showHelpDialog) {
            setApprovalTitle("Fortfahren");
        }
    }, [snapshot?.context.showHelpDialog]);

    useEffect(() => {
        if(snapshot?.matches({UseCase: "NotStarted"})) {
            setApprovalTitle("Starten");
        }
    }, [snapshot]);

    function closeDialog() {
        showHelpDialog(false);
    }

    function approve() {
        if(snapshot?.matches({UseCase: "NotStarted"})) {
            startUseCase();
        } else {
            closeDialog();
        }
    }

    return (
        <ApprovalDialog open={(snapshot?.matches({UseCase: "NotStarted"}) || snapshot?.context.showHelpDialog) ?? false}
                        closable={snapshot?.context.showHelpDialog ?? false}
                        maxWidth={useCasesContent[useCaseIndex].maxWidth as "sm" | "md"}
                        onApprove={approve}
                        onClose={closeDialog}
                        title={useCasesContent[useCaseIndex].title}
                        content={useCasesContent[useCaseIndex].content}
                        approvalTitle={approvalTitle}
        />
    );
}