"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import ApprovalDialog from "@/app/ui/propertyManagement/dialogs/ApprovalDialog";
import { Typography } from "@mui/material";

const content = <Typography>In dieser interaktiven Umfrage übernehmen Sie die Rolle eines <b>Mitarbeiters einer Ferienhausvermietung</b>.<br/> Auf der <b>linken Seite des Bildschirms</b> sehen Sie die <b>Hauptanwendung der Ferienvermietung</b>, während sich auf der <b>rechten Seite</b> der <b>E-Mail-Client</b> befindet. Im Verlauf der Umfrage werden Sie E-Mails erhalten, die im E-Mail Client angezeigt werden. Ihre Aufgabe besteht darin, die Daten aus den E-Mails in das System zu übertragen. Während der Umfrage bearbeiten Sie drei verschiedene Anwendungsfälle (Buchungen hinzufügen, Ferienhäuser hinzufügen, Instandhaltungen hinzufügen). Dafür haben Sie jeweils <b>5min Zeit</b>. Versuchen Sie so viele E-Mails wie möglich in der Zeit zu bearbeiten.</Typography>

export default function StartSurveyDialog() {
    const { snapshot, startSurvey } = useSurveyManager();

    function approve() {
        startSurvey();
    }

    return (
        <ApprovalDialog open={snapshot?.matches("NotStarted") ?? false}
                        closable={false}
                        onApprove={approve}
                        title="Umfrage Starten"
                        content={content}
                        approvalTitle="Fortfahren"
        />
    );
}