"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import { redirect } from "next/navigation";
import {invalidateSession} from "@/lib/security/session";

export default function SurveyCompletedDialog() {
    const { snapshot } = useSurveyManager();

    async function approve() {
        await invalidateSession();
        redirect('/completed')
    }

    return (
        <ApprovalDialog open={snapshot?.matches("Finished") ?? false}
                        closable={false}
                        onApprove={approve}
                        approvalTitle="Beenden"
                        title="Umfrage abgeschlossen"
                        content="Die Umfrage wurde erfolgreich abgeschlossen. Danke für die Teilnahme!"
        />
    );
}