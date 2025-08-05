import {QuestionaireType} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {initial} from "@/app/ui/propertyManagement/pages/questions/parser/configs/initial";
import {noAgent} from "@/app/ui/propertyManagement/pages/questions/parser/configs/noAgent";
import {agent} from "@/app/ui/propertyManagement/pages/questions/parser/configs/agent";

function createSchema(questionaire: QuestionaireType) {
    let output = "";
    for(const element of questionaire.elements) {
        switch(element.type) {
            case "text":
                output += `${element.name}\tString\n`;
                break;
            case "multiple-choice-grid":
                output += `${element.name}\tInt[]\n`;
                break;
            case "multiple-choice":
                output += `${element.name}\tString\n`;
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
const result = createSchema(initial) + "\n" +
    createSchema(noAgent) + "\n" +
    createSchema(agent);
console.log(result);