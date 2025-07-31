import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import './SurveyStepDescription.scss'

export default function MaintenanceDescription() {

    return (
        <div className="survey-step-description">
            <Typography>Im dritten Anwendungsfall bekommen Sie Instandhaltungsanfragen wie Mitteilungen über defekte Toiletten etc.
                von Urlaubern per E-Mail. Ihre Aufgabe besteht darin diese Instandhaltung mit allen nötigen Informationen aus
                den zugehörigen E-Mails dem System hinzuzufügen. Navigieren Sie dafür auf die Seite <b>Instandhaltungen</b>
                und klicken Sie auf den <b>Hinzufügen</b> Knopf.<br/>
                Dafür haben Sie <b>5min</b> Zeit. Versuchen Sie so viele Instandhaltungen wie möglich dem System hinzuzufügen.
            </Typography>
            <Typography>
                Der intelligente KI-Agent hat ein weitere Update erhalten. Interaktionen mit dem Agenten sind in der
                Benutzeroberfläche wieder mit <b>Magenta-Blauen</b> Farben dargestellt.
            </Typography>
            <Image src="/image/properties_ai_agent.gif" width={850} height={410} alt="user interface with ai agent" unoptimized />
            <Typography>
                Durch den <b>Ausfüllen</b> Knopf lassen sich beispielsweise Formulare mit Textinhalten aus der Zwischenablage befüllen.
                Dies ist auch über das Einfügen des Textes in das Chat-Fenster des KI-Agenten möglich. Damit lassen sich z.B. die Daten
                aus E-Mails über Copy-Paste (Kopieren und Einfügen) automatisch in das Formular überführen.
            </Typography>
        </div>
    );
}