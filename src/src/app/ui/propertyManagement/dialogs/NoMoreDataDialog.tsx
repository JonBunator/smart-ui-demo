"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import {NUM_DATA_PER_SURVEY_STEP} from "@/lib/config";
import {Typography} from "@mui/material";

export default function NoMoreDataDialog() {
    const { snapshot, completeNoMoreData } = useSurveyManager();

    return (
        <ApprovalDialog open={snapshot?.matches({SurveyStep: "NoMoreData"}) ?? false}
                        closable={false}
                        onApprove={completeNoMoreData}
                        approvalTitle="Fortfahren"
                        title="Bearbeitung abgeschlossen"
                        content={<Typography variant="body1">Es wurden alle {NUM_DATA_PER_SURVEY_STEP} E-Mails vor Ablauf der Zeit dem System hinzugefügt. Wollen Sie mit der Umfrage fortfahren?</Typography>}
        />
    );
}