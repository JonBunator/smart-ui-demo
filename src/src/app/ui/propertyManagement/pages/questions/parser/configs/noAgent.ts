import {QuestionaireType} from "@/app/ui/propertyManagement/pages/questions/parser/types";

export const noAgent: QuestionaireType =
    {
        title: "Umfrage zu Bearbeitung ohne KI-Agenten",
        description: "Die Zeit ist abgelaufen!\nBitte beantworten Sie die folgenden Fragen basierend auf Ihrer eben erfolgten Interaktion mit der Verwaltungssoftware für Ferienhäuser innerhalb des 5-minütigen Zeitfensters. In diesen Fragen bezieht sich **Produkt** auf die genannte Anwendung. Beachten Sie, dass sich die Fragen **nicht** auf die gesamte Umfrage beziehen.",
        elements: [
            {
                type: "ueq+",
                name: "efficiency",
                description: "**Effizienz**: Für das Erreichen meiner Ziele empfinde ich das Produkt als...",
                scaleSize: 7,
                labels: [
                    ["langsam", "schnell"],
                    ["ineffizient", "effizient"],
                    ["unpragmatisch", "pragmatisch"],
                    ["überladen", "aufgeräumt"]
                ]
            },
            {
                type: "ueq+",
                name: "perspicuity",
                description: "**Durchschaubarkeit**: Die Bedienung des Produkts empfinde ich als...",
                scaleSize: 7,
                labels: [
                    ["unverständlich", "verständlich"],
                    ["schwer zu lernen", "leicht zu lernen"],
                    ["kompliziert", "einfach"],
                    ["verwirrend", "übersichtlich"]
                ]
            },
            {
                type: "ueq+",
                name: "dependability",
                description: "**Steuerbarkeit**: Die Reaktion des Produkts auf meine Eingaben und Befehle empfinde ich als...",
                scaleSize: 7,
                labels: [
                    ["unberechenbar", "vorhersagbar"],
                    ["behindernd", "unterstützend"],
                    ["unsicher", "sicher"],
                    ["nicht erwartungskonform", "erwartungskonform"]
                ]
            },
            {
                type: "ueq+",
                name: "intuitiveUse",
                description: "**Intuitive Bedienung**: Die Bedienung des Produkts wirkt auf mich...",
                scaleSize: 7,
                labels: [
                    ["mühevoll", "mühelos"],
                    ["unlogisch", "logisch"],
                    ["nicht einleuchtend", "einleuchtend"],
                    ["nicht schlüssig", "schlüssig"]
                ]
            },
            {
                type: "ueq+",
                name: "visualAesthetics",
                description: "**Visuelle Ästhetik**: Die visuelle Gestaltung des Produkts empfinde ich als...",
                scaleSize: 7,
                labels: [
                    ["hässlich", "schön"],
                    ["stillos", "stilvoll"],
                    ["nicht ansprechend", "ansprechend"],
                    ["unästhetisch", "ästhetisch"]
                ]
            },
            {
                type: "ueq+",
                name: "clarity",
                description: "**Übersichtlichkeit**: Die Benutzeroberfläche des Produkts empfinde ich als...",
                scaleSize: 7,
                labels: [
                    ["schlecht gegliedert", "gut gegliedert"],
                    ["unstrukturiert", "strukturiert"],
                    ["ungeordnet", "geordnet"],
                    ["unorganisiert", "organisiert"]
                ]
            },
            {
                type: "multiple-choice-grid",
                name: "selfAwareness",
                description: "Selbstwahrnehmung bei der Aufgabenbearbeitung",
                xAxisLabels: ["Stimme überhaupt nicht zu", "Stimme nicht zu", "Stimme eher nicht zu ", "Neutral", "Stimme eher zu", "Stimme zu", "Stimme völlig zu"],
                yAxisLabels: [
                    "Ich fühlte mich fähig während der Bearbeitung der Aufgaben",
                    "Ich hatte das Gefühl, dass ich gut bei der Bearbeitung der Aufgaben war",
                ]
            },
            {
                type: "text",
                name: "optionalRemarks",
                label: "Zusätzliche Anmerkungen",
                description: "Hier ist Platz für zusätzliche optionale Gedanken und Anmerkungen",
                rows: 8,
                notRequired: true,
            }
        ]
    }
