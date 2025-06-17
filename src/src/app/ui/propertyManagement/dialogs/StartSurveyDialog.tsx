"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";

export default function StartSurveyDialog() {
    const { snapshot, startSurvey } = useSurveyManager();

    async function approve() {
        await startSurvey();
    }

    return (
        <ApprovalDialog open={snapshot?.matches("NotStarted") ?? false}
                        closable={false}
                        onApprove={approve}
                        title="Umfrage Starten"
                        content="Starte die Umfrage."
        />
    );
}