import { Typography } from "@mui/material";

export default function NoAgentDescription() {

    return (
        <Typography>
            Zunächst sollen Sie die Anwendung ohne einen KI-Agenten bedienen.
            Sie bekommen E-Mails der folgenden Typen:<br/>
            - <b>Buchungen hinzufügen</b>: Sie bekommen Buchungsanfragen von Urlaubern.<br/>
            - <b>Immobilien hinzufügen</b>: Sie bekommen E-Mails von Ihrer Chefin <b>Kira Bartels</b> mit neuen Ferienhäusern, die dem System hinzugefügt werden sollen.<br/>
            - <b>Instandhaltungen hinzufügen</b>: Sie bekommen Instandhaltungsanfragen wie Mitteilungen über defekte Toiletten etc.<br/><br/>
            Ihre Aufgabe besteht darin, die Buchungen, Immobilien und Instandhaltungen mit allen nötigen Informationen basierend
            auf der jeweiligen E-Mail dem System hinzuzufügen.
            Dafür haben Sie <b>5 min</b> Zeit. Versuchen Sie, so viele E-Mails wie möglich dem
            System hinzuzufügen. Achten Sie darauf, dass Sie dabei möglichst keine Fehler machen.
            Sie müssen <b>nicht</b> auf die E-Mails antworten. Dies wird vom System übernommen.
        </Typography>
    );
}