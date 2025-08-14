import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import './SurveyStepDescription.scss'

export default function ThirdStepDescription() {

    return (
        <div className="survey-step-description">
            <Typography>
                Durch ein neues Update wurde der intelligente KI-Agent verändert. Er hat nun ein anderes Verhalten als der Agent im
                vorherigen Schritt. Interaktionen mit dem Agenten sind in der Benutzeroberfläche mit <b>magenta-blauen</b> Farben dargestellt.
            </Typography>
            <Image className="gif" src="/image/ai-agent.gif" width={1150} height={398} alt="user interface with ai agent" unoptimized placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHBAMAAAD65XALAAAAGFBMVEUSEhI3OjkfICEZGho+PzwzNTQmKSkvMTH51JgIAAAAR0lEQVQI12NITEtSUklWUjJgZigNLSsNKRNTNlJmEBEUFE8vKlNgYAAzjY2VDMBMEXcgxWAMZLqIuIKYigYMIqGh4SCmmgEADecLOCovv5cAAAAASUVORK5CYII="/>
            <Typography>
                Durch den <b>Ausfüllen</b>-Knopf lassen sich beispielsweise Formulare mit Textinhalten aus der Zwischenablage befüllen.
                Dies ist auch über das Einfügen des Textes in das Chat-Fenster des KI-Agenten möglich. Damit lassen sich z. B. die Daten
                aus E-Mails über Copy-Paste (Kopieren und Einfügen) automatisch in das Formular überführen.
            </Typography>
            <Typography>
                <br/>
                Sie bekommen wieder E-Mails der folgenden Typen:<br/>
                - <b>Buchungen hinzufügen</b>: Sie bekommen Buchungsanfragen von Urlaubern.<br/>
                - <b>Immobilien hinzufügen</b>: Sie bekommen E-Mails von Ihrer Chefin <b>Kira Bartels</b> mit neuen Ferienhäusern, die dem System hinzugefügt werden sollen.<br/>
                - <b>Instandhaltungen hinzufügen</b>: Sie bekommen Instandhaltungsanfragen wie Mitteilungen über defekte Toiletten etc.<br/>
                Ihre Aufgabe besteht wieder darin, die Buchungen, Immobilien und Instandhaltungen mit allen nötigen Informationen basierend
                auf der jeweiligen E-Mail dem System hinzuzufügen.
                Dafür haben Sie <b>5 min</b> Zeit. Versuchen Sie, so viele E-Mails wie möglich dem
                System hinzuzufügen. Achten Sie darauf, dass Sie dabei möglichst keine Fehler machen. Sie müssen <b>nicht</b> auf die E-Mails antworten. Dies wird vom System übernommen.
                Akzeptieren Sie nicht blind Vorschläge des KI-Agenten, sondern überprüfen Sie die Vorschläge und passen Sie sie entsprechend vor dem Hinzufügen an.
            </Typography>
        </div>
    );
}