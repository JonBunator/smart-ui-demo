import {QuestionaireType} from "@/app/ui/propertyManagement/pages/questions/parser/types";

export const properties: QuestionaireType =
{
  title: "Umfrage zu Immobilien",
  description: "Dies ist die Umfrage zu Immobilien",
  elements: [
    {
      type: "textarea",
      name: "textarea-example",
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