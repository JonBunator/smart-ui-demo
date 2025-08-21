import Markdown from "react-markdown";
import FrameLayout from "@/app/ui/propertyManagement/layoutComponents/FrameLayout";
import InviteCodeInvalidPage from "@/app/ui/propertyManagement/pages/InviteCodeInvalidPage";
import "./PrivacyPolicy.scss"

export default function PrivacyPolicy() {
    const text = `
# Datenschutzerklärung
Diese Studie ist Teil der Masterarbeit *Einsatz von Large Language Models zur Entwicklung intelligenter UI-Komponenten in Webanwendungen*. In der interaktiven Studie soll evaluiert werden, inwiefern ein KI-Agent bei der Bearbeitung von Aufgaben hilfreich sein kann, um die Nutzererfahrung und Produktivität zu steigern, indem der Agent direkt mit der Benutzeroberfläche interagieren kann.
## Ziel der Studie
Die Studie zielt darauf ab, detaillierte Erkenntnisse zu folgenden Punkten zu gewinnen:
- Steigern KI-Agenten, die mit Nutzeroberflächen interagieren können, die Produktivität und Nutzererfahrung in dem Anwendungsfall der Studie?
- Unterschiede zwischen proaktiv und reaktiv handelnden Agenten auf die Produktivität und Nutzererfahrung
- Auswirkung von sozialen Erklärungen durch den KI-Agenten auf die Nutzererfahrung
- Vertrauen in den KI-Agenten
- Erhöht der KI-Agent die Erklärbarkeit der Benutzeroberfläche?

## Ablauf der Studie
Zu Beginn füllen Sie einen Fragebogen zu persönlichen Informationen und Ansichten aus. Danach bedienen Sie in 3x 5min eine Softwareanwendung für die Verwaltung von Ferienhäusern. Dabei erhält der Teilnehmer jeweils keine Unterstützung, Unterstützung von einem reaktiven KI-Agenten und Unterstützung von einem proaktiven KI-Agenten. Nach jeder der drei Bearbeitungen folgen Befragungen durch Fragebögen.
Die Teilnahme an der Studie ist freiwillig und kann jederzeit widerrufen werden. Sie können jederzeit ohne Konsequenzen aus der Studie ausscheiden.

## Datenerhebung
Wir erheben demografische Daten über Sie. Dazu gehören Alter und Geschlecht. Die Angaben sind jedoch freiwillig. Alle weiteren in den Fragebögen angegebenen Informationen, die Nachrichten-Historie zwischen Ihnen und dem KI-Agenten sowie die während der Studie ins System hinzugefügten Daten werden für die Auswertung gespeichert. Es werden keine personenbezogenen Daten über Sie weitergegeben.

## Datenverarbeitung und Verbreitung der Ergebnisse
Gemäß der europäischen Verordnung 2016/679 zum Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten und zum freien Datenverkehr (DSGVO) informieren wir Sie hiermit, dass Ihre personenbezogenen Daten gemäß den geltenden Datenschutzbestimmungen und im Einklang mit guter wissenschaftlicher Praxis erhoben und gespeichert werden und ausschließlich für wissenschaftliche Forschungszwecke verwendet werden. Weitere Einzelheiten finden Sie in den Datenschutzinformationen.
Die Veröffentlichung von Forschungsergebnissen in Publikationen oder auf Konferenzen erfolgt ausschließlich in anonymisierter Form und lässt zu keinem Zeitpunkt Rückschlüsse auf Ihre Person zu. Das bedeutet, dass aus den Ergebnissen nicht ersichtlich ist, welche Person die Informationen bereitgestellt hat.
Auf Wunsch stellen wir Ihnen gerne die Gesamtergebnisse der Studie nach Abschluss der Forschung zur Verfügung.

An der Masterarbeit verantwortliche und beteiligte Personen:
- Jonas Bühler, Verfasser der Masterarbeit (Hauptverantwortlicher)
- Dr. Matthias Kraus, wissenschaftlicher Mitarbeiter am Lehrstuhl für Mensch-zentrierte Künstliche Intelligenz und Betreuer der Masterarbeit


## Ihr Recht auf Fragen
Sie können jederzeit Fragen zu dieser Studie stellen, indem Sie sich an die beteiligten Forscher wenden.
\`\`\`
Lehrstuhl für Mensch-zentrierte Künstliche Intelligenz
Universität Augsburg
Universitätsstraße 6a,
86159 Augsburg
E-Mail: jonas.buehler@uni-a.de
\`\`\`


## Datenschutzinformationen
### 1. Beschreibung der Verarbeitungstätigkeit
Verarbeitung von Daten im Rahmen der Masterarbeit: *Einsatz von Large Language Models zur Entwicklung intelligenter UI-Komponenten in Webanwendungen*

### 2. Name und Kontaktdaten des Verantwortlichen
Universität Augsburg, Universitätsstraße 2, 86159 Augsburg, Tel. 0821/598-0

### 3. Kontaktdaten des Datenschutzbeauftragten
Prof. Dr. Benedikt Buchner, Universität Augsburg, Universitätsstraße 24, 86159 Augsburg, datenschutz@uni-augsburg.de
### 4. Zweck(e) und Rechtsgrundlage(n) der Verarbeitung
#### 4.1 Zweck(e) der Verarbeitung:
Ihre Daten werden zu folgendem Zweck verarbeitet:
- Auswertung der Daten im Rahmen der Masterarbeit 
- Untersuchung der Nützlichkeit des KI-Agenten in dem Anwendungsfall der Studie
- Untersuchung des Vertrauens in den KI-Agenten
- Untersuchung der Interaktion der Teilnehmer mit der Softwareanwendung und dem KI-Agenten
- Untersuchung der Auswirkung von prosozialen Erklärungen des KI-Agenten
- Untersuchung der Unterschiede zwischen Interaktionen mit reaktiven und proaktiven KI-Agenten
#### 4.2 Rechtsgrundlage(n) der Verarbeitung
Ihre Daten werden auf Grundlage von Art. 6 Abs. 1 Satz 1 lit. a) DSGVO (Einwilligung) verarbeitet.
### 5. Dauer der Speicherung personenbezogener Daten
- Daten, die Rückschlüsse auf die Identität der jeweiligen Testpersonen zulassen, werden unmittelbar nach Abschluss der Masterarbeit, spätestens am 01.01.2026, gelöscht.
- Für streng anonymisierte Daten wird eine Open-Data-Strategie verfolgt.
### 6. Rechte der betroffenen Personen
Sie haben folgende Rechte:
(Für weitere Informationen siehe https://www.uni-augsburg.de/de/impressum/datenschutz/ [Nr. IX])
- Sie haben das Recht, Auskunft über die zu Ihrer Person gespeicherten personenbezogenen Daten zu erhalten.
- Wenn falsche personenbezogene Daten verarbeitet werden, haben Sie das Recht auf Berichtigung.
Unter bestimmten Bedingungen können Sie die Löschung oder Einschränkung der Verarbeitung verlangen und der Verarbeitung widersprechen.
- Grundsätzlich haben Sie das Recht auf Datenübertragbarkeit.
- Darüber hinaus besteht ein Beschwerderecht beim bayerischen Landesbeauftragten für Datenschutz.
### 7. Recht auf Widerruf der Einwilligung
Sie können Ihre Einwilligung jederzeit für die Zukunft widerrufen. Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Datenverarbeitung bleibt davon unberührt.   
    `;

    return (
        <InviteCodeInvalidPage>
            <FrameLayout>
                <div className="privacy-policy">
                    <Markdown>
                        {text}
                    </Markdown>
                </div>
            </FrameLayout>
        </InviteCodeInvalidPage>
    );
}