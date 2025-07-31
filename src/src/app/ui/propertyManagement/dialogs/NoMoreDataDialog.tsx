"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import {NUM_DATA_PER_SURVEY_STEP} from "@/lib/config";

export default function NoMoreDataDialog() {
    const { snapshot, completeNoMoreData } = useSurveyManager();

    return (
        <ApprovalDialog open={snapshot?.matches({SurveyStep: "NoMoreData"}) ?? false}
                        closable={false}
                        onApprove={completeNoMoreData}
                        approvalTitle="Fortfahren"
                        title="Anwendungsfall abgeschlossen"
                        content={`Es wurden alle der ${NUM_DATA_PER_SURVEY_STEP} Datensätze vor Ablauf der Zeit hinzugefügt. Wollen Sie mit der Umfrage fortfahren?`}
        />
    );
}