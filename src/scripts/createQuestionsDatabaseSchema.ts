import {QuestionaireType} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {bookings} from "@/app/ui/propertyManagement/pages/questions/parser/configs/bookings";

function createSchema(questionaire: QuestionaireType) {
    let output = "";
    for(const element of questionaire.elements) {
        switch(element.type) {
            case "textarea":
                output += `${element.name}\tString\n`;
                break;
            case "multiple-choice-grid":
                output += `${element.name}\tInt[]\n`;
                break;
            case "multiple-choice":
                output += `${element.name}\tInt\n`;
                break;
            case "checkboxes":
                output += `${element.name}\tBoolean[]?\n`;
                break;
            default:
                break;

        }
    }
    return output;
}
const result = createSchema(bookings) + "\n" +
    createSchema(bookings) + "\n" +
    createSchema(bookings);
console.log(result);