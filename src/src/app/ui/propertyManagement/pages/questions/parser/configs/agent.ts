import {QuestionaireType} from "@/app/ui/propertyManagement/pages/questions/parser/types";

export const agent: QuestionaireType =
{
  title: "Umfrage zu Instandhaltung",
  description: "Dies ist die Umfrage zu Instandhaltung",
  elements: [
    {
      type: "text",
      name: "text-example",
      description: "Dies ist ein mehrzeiliges Textfeld"
    },
    {
      type: "multiple-choice-grid",
      name: "multiple-choice-grid-example",
      description: "Dies ist ein multiple Choice Grid",
      xAxisLabels: ["-2", "-1", "0", "1", "2"],
      yAxisLabels: ["Wie geht es dir?", "Was ist die beste Zahl?"]
    },
    {
      type: "multiple-choice",
      name: "multiple-choice-example",
      description: "Wähle eine Option aus",
      labels: ["blau", "grün", "rot"]
    },
    {
      type: "checkboxes",
      name: "checkboxes-example",
      description: "Wähle mehrere Optionen aus",
      labels: ["Pasta", "Burger", "Pizza"]
    }
  ]
}