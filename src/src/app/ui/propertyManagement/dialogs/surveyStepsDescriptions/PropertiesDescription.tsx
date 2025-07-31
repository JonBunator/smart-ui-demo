import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import './SurveyStepDescription.scss'

export default function PropertiesDescription() {

    return (
        <div className="survey-step-description">
            <Typography>
                Im dritten Anwendungsfall bekommen Sie E-Mails von Ihrer Chefin <b>Kira Bartels</b>. Darin beschreibt sie neue Ferienhäuser,
                die dem System hinzugefügt werden sollen. Ihre Aufgabe besteht darin diese Ferinhäuser mit allen nötigen
                Informationen aus den zugehörigen E-Mails dem System hinzuzufügen.
                Navigieren Sie dafür auf die Seite <b>Immobilien</b> und klicken Sie auf den <b>Hinzufügen</b> Knopf.<br/>
                Dafür haben Sie <b>5min</b> Zeit. Versuchen Sie so viele Immobilien wie möglich dem System hinzuzufügen.
            </Typography>
            <Typography>
                Durch ein neues Update wurde dem System ein intelligenter KI-Agent hinzugefügt, der den Mitarbeitern bei Ihren
                Aufgaben helfen soll. Interaktionen mit dem Agenten sind in der Benutzeroberfläche mit <b>Magenta-Blauen</b> Farben dargestellt.
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