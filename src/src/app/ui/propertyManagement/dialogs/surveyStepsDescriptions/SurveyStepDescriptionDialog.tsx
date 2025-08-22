"use client"
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import NoAgentDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/NoAgentDescription";
import SecondStepDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/SecondStepDescription";
import ThirdStepDescription from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/ThirdStepDescription";
import {useEffect, useState} from "react";

const surveyStepsContent = [
    {
        title: "Anwendung ohne KI-Agenten-Unterstützung",
        content: <NoAgentDescription/>,
        maxWidth: "lg",
        minWaitSeconds: 120
    },
    {
        title: "Anwendung mit KI-Agenten-Unterstützung",
        content: <SecondStepDescription/>,
        maxWidth: "lg",
        minWaitSeconds: 100
    },
    {
        title: "Anwendung mit KI-Agenten-Unterstützung",
        content: <ThirdStepDescription/>,
        maxWidth: "lg",
        minWaitSeconds: 5
    },
]

export default function SurveyStepDescriptionDialog() {
    const {snapshot, startSurveyStep, showHelpDialog} = useSurveyManager();
    const [approvalTitle, setApprovalTitle] = useState("Studie Starten");
    const [remainingTimeText, setRemainingTimeText] = useState<string | undefined>(undefined);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const surveyStep = snapshot?.context.surveyStep ?? 0;
    const paused = snapshot?.matches({SurveyStep: "Paused"}) ?? false;


    useEffect(() => {
        if (paused) {
            setApprovalTitle("Fortfahren");
            setButtonDisabled(false);
            setRemainingTimeText(undefined);
        }
    }, [paused, snapshot]);

    useEffect(() => {
        if (snapshot?.matches({SurveyStep: "NotStarted"})) {
            setApprovalTitle("Studie Starten");
            let countdown = surveyStepsContent[surveyStep].minWaitSeconds;
            const interval = setInterval(() => {
                countdown -= 1;
                setRemainingTimeText(`Kann in ${countdown} Sekunden gestartet werden...`);
                if (countdown <= 0) {
                    clearInterval(interval);
                    setButtonDisabled(false);
                    setRemainingTimeText(undefined);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [snapshot, surveyStep]);

    function closeDialog() {
        showHelpDialog(false);
    }

    function approve() {
        if (snapshot?.matches({SurveyStep: "NotStarted"})) {
            startSurveyStep();
        } else {
            closeDialog();
        }
    }

    return (
        <ApprovalDialog open={(snapshot?.matches({SurveyStep: "NotStarted"}) || paused) ?? false}
                        closable={paused ?? false}
                        maxWidth={surveyStepsContent[surveyStep].maxWidth as "sm" | "md"}
                        onApprove={approve}
                        onClose={closeDialog}
                        buttonDisabled={buttonDisabled}
                        title={surveyStepsContent[surveyStep].title}
                        content={surveyStepsContent[surveyStep].content}
                        approvalTitle={approvalTitle}
                        approvalButtonSideText={remainingTimeText}
        />
    );
}