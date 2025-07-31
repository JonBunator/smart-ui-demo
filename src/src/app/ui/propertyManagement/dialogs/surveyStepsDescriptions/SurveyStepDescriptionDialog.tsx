"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import BookingsDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/BookingsDescription";
import PropertiesDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/PropertiesDescription";
import MaintenanceDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/MaintenanceDescription";
import {useEffect, useState} from "react";

const surveyStepsContent = [
    {
        title: "Anwendungsfall Buchungen",
        content: <BookingsDescription/>,
        maxWidth: "sm"
    },
    {
        title: "Anwendungsfall Immobilien",
        content: <PropertiesDescription/>,
        maxWidth: "md"
    },
    {
        title: "Anwendungsfall Instandhaltung",
        content: <MaintenanceDescription/>,
        maxWidth: "md"
    },
]

export default function SurveyStepDescriptionDialog() {
    const { snapshot, startSurveyStep, showHelpDialog } = useSurveyManager();
    const [approvalTitle, setApprovalTitle] = useState("Starten");
    const surveyStep = snapshot?.context.surveyStep ?? 0;

    useEffect(() => {
        if(snapshot?.context.showHelpDialog) {
            setApprovalTitle("Fortfahren");
        }
    }, [snapshot?.context.showHelpDialog]);

    useEffect(() => {
        if(snapshot?.matches({SurveyStep: "NotStarted"})) {
            setApprovalTitle("Starten");
        }
    }, [snapshot]);

    function closeDialog() {
        showHelpDialog(false);
    }

    function approve() {
        if(snapshot?.matches({SurveyStep: "NotStarted"})) {
            startSurveyStep();
        } else {
            closeDialog();
        }
    }

    return (
        <ApprovalDialog open={(snapshot?.matches({SurveyStep: "NotStarted"}) || snapshot?.context.showHelpDialog) ?? false}
                        closable={snapshot?.context.showHelpDialog ?? false}
                        maxWidth={surveyStepsContent[surveyStep].maxWidth as "sm" | "md"}
                        onApprove={approve}
                        onClose={closeDialog}
                        title={surveyStepsContent[surveyStep].title}
                        content={surveyStepsContent[surveyStep].content}
                        approvalTitle={approvalTitle}
        />
    );
}