"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import NoAgentDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/NoAgentDescription";
import SecondStepDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/SecondStepDescription";
import ThirdStepDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/ThirdStepDescription";
import {useEffect, useState} from "react";

const surveyStepsContent = [
    {
        title: "Anwendung ohne KI-Agenten-Unterstützung",
        content: <NoAgentDescription/>,
        maxWidth: "sm"
    },
    {
        title: "Anwendung mit KI-Agenten-Unterstützung (Variante 1)",
        content: <SecondStepDescription/>,
        maxWidth: "lg"
    },
    {
        title: "Anwendung mit KI-Agenten-Unterstützung (Variante 2)",
        content: <ThirdStepDescription/>,
        maxWidth: "lg"
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