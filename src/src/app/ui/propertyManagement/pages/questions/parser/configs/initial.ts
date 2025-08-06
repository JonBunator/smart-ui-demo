import {QuestionaireType} from "@/app/ui/propertyManagement/pages/questions/parser/types";

export const initial: QuestionaireType =
    {
        title: "Vorbefragung",
        description: "Bevor die eigentliche Umfrage startet, folgt noch eine Vorbefragung zu persönlichen Informationen und Ansichten.",
        elements: [
            {
                type: "text",
                name: "age",
                description: "Wie alt sind Sie?",
                label: "Alter",
                rows: 1,
                number: true,
            },
            {
                type: "multiple-choice",
                name: "gender",
                description: "Welches Geschlecht haben Sie?",
                label: "Geschlecht",
                labels: ["Männlich", "Weiblich", "Nicht-binär", "Möchte ich nicht freigeben"]
            },
            {
                type: "multiple-choice",
                name: "chatbotExperience",
                label: "Chatbot Erfahrung",
                description: "Wie oft nutzen Sie Chatbots mit künstlicher Intelligenz (KI) wie beispielsweise ChatGPT o. Ä. **privat oder beruflich**?",
                labels: ["Täglich", "2-3 mal pro Woche", "2-3 mal pro Monat", "Nie"]
            },
            {
                type: "multiple-choice",
                name: "dataManagementExperience",
                label: "Geschäftssoftware Erfahrung",
                description: "Wie vertraut sind Sie mit **Geschäftssoftware**, die zu Verwaltung und Analyse von Daten dient? Darunter fallen beispielsweise Excel, SAP, Salesforce oder firmenspezifsche Software.",
                labels: ["Keine Erfahrung", "Ein wenig Erfahrung", "Viel Erfahrung"]
            },
            {
                type: "multiple-choice-grid",
                name: "proactivePersonality",
                description: "Fragen zu persönlichen proaktiven Verhalten",
                xAxisLabels: ["Stimme überhaupt nicht zu", "Stimme nicht zu", "Stimme eher nicht zu ", "Neutral", "Stimme eher zu", "Stimme zu", "Stimme völlig zu"],
                yAxisLabels: [
                    "Ich bin ständig auf der Suche nach neuen Wegen, mein Leben zu verbessern",
                    "Ich fühle mich dazu getrieben, einen Unterschied in meiner Gemeinschaft und vielleicht in der Welt zu machen",
                    "Ich neige dazu, anderen die Initiative zu überlassen, neue Projekte zu starten",
                    "Wo auch immer ich gewesen bin, war ich eine starke Kraft für konstruktive Veränderungen",
                    "Ich genieße es, Hindernisse für meine Ideen zu überwinden",
                    "Nichts ist aufregender, als meine Ideen in die Realität umzusetzen",
                    "Wenn ich etwas sehe, das mir nicht gefällt, behebe ich es",
                    "Egal wie die Chancen stehen, wenn ich an etwas glaube, werde ich es verwirklichen",
                    "Ich liebe es, ein Verfechter meiner Ideen zu sein, selbst gegen den Widerstand anderer",
                    "Ich bin hervorragend darin, Chancen zu erkennen",
                    "Ich bin immer auf der Suche nach besseren Wegen, Dinge zu tun",
                    "Wenn ich an eine Idee glaube, wird mich kein Hindernis davon abhalten, sie zu verwirklichen",
                    "Ich liebe es, den Status quo herauszufordern",
                    "Wenn ich ein Problem habe, gehe ich es direkt an",
                    "Ich bin großartig darin, Probleme in Chancen zu verwandeln",
                    "Ich kann eine gute Gelegenheit lange vor anderen erkennen",
                    "Wenn ich jemanden in Schwierigkeiten sehe, helfe ich auf jede erdenkliche Weise"
                ]
            },
            {
                type: "multiple-choice-grid",
                name: "machineTrust",
                description: "Fragen zu Vertrauen in Maschinen",
                xAxisLabels: ["Stimme überhaupt nicht zu", "Stimme nicht zu", "Neutral", "Stimme zu", "Stimme völlig zu"],
                yAxisLabels: [
                    "Ich vertraue normalerweise Maschinen, bis es einen Grund gibt, dies nicht zu tun",
                    "Im Großen und Ganzen misstraue ich Maschinen",
                    "Im Allgemeinen würde ich mich auf eine Maschine verlassen, um mir zu helfen",
                    "Meine Neigung, Maschinen zu vertrauen, ist hoch",
                    "Es fällt mir leicht, Maschinen zu vertrauen, dass sie ihre Arbeit erledigen",
                    "Ich neige dazu, einer Maschine zu vertrauen, selbst wenn ich wenig Wissen darüber habe",
                ]
            },
            {
                type: "multiple-choice-grid",
                name: "technologicalAffinity",
                description: "Im Folgenden geht es um Ihre Interaktion mit technischen Systemen. Mit **technischen Systemen** sind sowohl Apps und andere Software-Anwendungen als auch komplette digitale Geräte (z.B. Handy, Computer, Fernseher, Auto-Navigation) gemeint.",
                xAxisLabels: ["Stimmt gar nicht", "Stimmt weitgehend nicht", "Stimmt eher nicht", "Stimmt eher", "Stimmt weitgehend", "Stimmt völlig"],
                yAxisLabels: [
                    "Ich beschäftige mich gern genauer mit technischen Systemen",
                    "Ich probiere gern die Funktionen neuer technischer Systeme aus",
                    "In erster Linie beschäftige ich mich mit technischen Systemen, weil ich muss",
                    "Wenn ich ein neues technisches System vor mir habe, probiere ich es intensiv aus",
                    "Ich verbringe sehr gern Zeit mit dem Kennenlernen eines neuen technischen Systems",
                    "Es genügt mir, dass ein technisches System funktioniert, mir ist es egal, wie oder warum",
                    "Ich versuche zu verstehen, wie ein technisches System genau funktioniert",
                    "Es genügt mir, die Grundfunktionen eines technischen Systems zu kennen",
                    "Ich versuche, die Möglichkeiten eines technischen Systems vollständig auszunutzen",
                ]
            },
        ]
    }