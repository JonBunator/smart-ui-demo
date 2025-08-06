import {QuestionaireType} from "@/app/ui/propertyManagement/pages/questions/parser/types";

export const agent: QuestionaireType =
    {
      title: "Umfrage zu Bearbeitung mit KI-Agenten",
      description: "Bitte beantworten Sie die folgenden Fragen basierend auf Ihrer eben erfolgten Interaktion mit der Verwaltungssoftware für Ferienhäuser innerhalb des 5-minütigen Zeitfensters. In diesen Fragen bezieht sich **Produkt** auf die genannte Anwendung. Beachten Sie, dass sich die Fragen **nicht** auf die gesamte Umfrage beziehen.",
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
          type: "multiple-choice-grid",
          name: "explanationQuality",
          description: "Fragen zu Erklärungen des KI-Agenten",
          xAxisLabels: ["Stimme überhaupt nicht zu", "Stimme nicht zu", "Stimme eher nicht zu ", "Neutral", "Stimme eher zu", "Stimme zu", "Stimme völlig zu"],
          yAxisLabels: [
            "Der KI-Agent erklärt sein Verhalten",
            "Ich habe die Erklärungen des KI-Agenten verstanden",
            "Ich habe die Erklärungen des KI-Agenten rechtzeitig und effizient erhalten",
            "Die Erklärungen des KI-Agenten sind plausibel",
            "Die Erklärungen des KI-Agenten sind zuverlässig",
          ]
        },
        {
          type: "slider",
          name: "satisfaction",
          description: "Wie zufrieden waren Sie mit der Unterstützung des KI-Agenten? Passen Sie den Schieberegler entsprechend von 0-100 an.",
          startLabel: "Überhaupt nicht zufrieden",
          endLabel: "Komplett zufrieden"
        },
        {
          type: "slider",
          name: "helpfulness",
          description: "Wie hilfreich empfanden Sie die Unterstützung des KI-Agenten? Passen Sie den Schieberegler entsprechend von 0-100 an.",
          startLabel: "Überhaupt nicht hilfreich",
          endLabel: "Komplett hilfreich"
        },
        {
          type: "slider",
          name: "interpretation",
          description: "Wie haben Sie die Antworten des KI-Agenten normalerweise interpretiert? Passen Sie den Schieberegler entsprechend von 0-100 an.",
          startLabel: "Sehr intuitiv",
          endLabel: "Sehr analytisch"
        },
        {
          type: "slider",
          name: "processing",
          description: "Wie haben Sie die Antworten des KI-Agenten normalerweise verarbeitet? Passen Sie den Schieberegler entsprechend von 0-100 an.",
          startLabel: "Sehr schnell",
          endLabel: "Sehr langsam"
        },
        {
          type: "slider",
          name: "monitoringRole",
          description: "Inwieweit fühlten Sie sich in einer Überwachungsrolle? Passen Sie den Schieberegler entsprechend von 0-100 an.",
          startLabel: "Überhaupt nicht",
          endLabel: "In sehr großem Umfang"
        },
        {
          type: "slider",
          name: "decisionMakerRole",
          description: "Inwieweit fühlten Sie sich in der Rolle eines Entscheidungsträgers? Passen Sie den Schieberegler entsprechend von 0-100 an.",
          startLabel: "Überhaupt nicht",
          endLabel: "In sehr großem Umfang"
        },
        {
          type: "slider",
          name: "activeRole",
          description: "Wie passiv oder aktiv haben Sie Ihre Rolle erlebt? Passen Sie den Schieberegler entsprechend von 0-100 an.",
          startLabel: "Komplett passiv",
          endLabel: "Komplett aktiv"
        },
        {
          type: "multiple-choice-grid",
          name: "agentAssessment",
          description: "Fragen zu KI-Agenten Einschätzungen",
          xAxisLabels: ["Stimme überhaupt nicht zu", "Stimme nicht zu", "Stimme eher nicht zu ", "Neutral", "Stimme eher zu", "Stimme zu", "Stimme völlig zu"],
          "yAxisLabels": [
            "Ich glaube, es könnte negative Konsequenzen geben, wenn ich den KI-Agenten benutze",
            "Ich fühle, ich muss vorsichtig sein, wenn ich den KI-Agenten benutze",
            "Es ist riskant, mit dem KI-Agenten zu interagieren",
            "Ich glaube, dass der KI-Agent in meinem besten Interesse handelt",
            "Ich glaube, dass der KI-Agent sein Bestes tun wird, um mir zu helfen, wenn ich Hilfe brauche",
            "Ich glaube, dass der KI-Agent daran interessiert ist, meine Bedürfnisse und Vorlieben zu verstehen",
            "Ich denke, dass der KI-Agent kompetent und effektiv ist",
            "Ich denke, dass der KI-Agent seine Rolle sehr gut erfüllt",
            "Ich glaube, dass der KI-Agent alle Funktionen hat, die ich erwarten würde",
            "Wenn ich den KI-Agenten benutze, denke ich, dass ich mich vollständig auf ihn verlassen könnte",
            "Ich kann mich immer auf den KI-Agenten verlassen, um mich zu unterstützen",
            "Ich kann den Informationen vertrauen, die mir vom KI-Agenten präsentiert werden"
          ]
        },
      ]
    }
