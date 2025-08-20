import {Typography} from "@mui/material";
import React from "react";
import './SurveyStepDescription.scss'

export default function ThirdStepDescription() {

    return (
        <div className="survey-step-description">
            <Typography>
                Durch ein neues Update wurde der intelligente KI-Agent verändert. Nachfolgend ist dasselbe Video wie im
                vorherigen Schritt dargestellt. Sie müssen es nicht erneut ansehen, wenn Sie sich noch daran erinnern.
            </Typography>
            <div className="video-container">
                <video width="960" height="474" controls preload="none">
                    <source src="/videos/ai-explanation.mp4" type="video/mp4"/>
                    <track
                        src="/videos/ai-explanation.vtt"
                        kind="subtitles"
                        srcLang="de"
                        label="Deutsch"
                    />
                </video>
            </div>
            <Typography>
                <br/>
                Sie bekommen wieder E-Mails der folgenden Typen:<br/>
                - <b>Buchungen hinzufügen</b>: Sie bekommen Buchungsanfragen von Urlaubern.<br/>
                - <b>Immobilien hinzufügen</b>: Sie bekommen E-Mails von Ihrer Chefin <b>Kira Bartels</b> mit neuen
                Ferienhäusern, die dem System hinzugefügt werden sollen.<br/>
                - <b>Instandhaltungen hinzufügen</b>: Sie bekommen Instandhaltungsanfragen wie Mitteilungen über defekte
                Toiletten etc.<br/>
                Ihre Aufgabe besteht wieder darin, die Buchungen, Immobilien und Instandhaltungen mit allen nötigen
                Informationen basierend
                auf der jeweiligen E-Mail dem System hinzuzufügen.
                Dafür haben Sie <b>5 min</b> Zeit. Versuchen Sie, so viele E-Mails wie möglich dem
                System hinzuzufügen. Achten Sie darauf, dass Sie dabei möglichst keine Fehler machen. Sie
                müssen <b>nicht</b> auf die E-Mails antworten. Dies wird vom System übernommen.
                Akzeptieren Sie nicht blind Vorschläge des KI-Agenten, sondern überprüfen Sie die Vorschläge und passen
                Sie sie entsprechend vor dem Hinzufügen an.
            </Typography>
        </div>
    );
}