import BookingsQuestions from "./BookingsQuestions";
import PropertiesQuestions from "./PropertiesQuestions";
import MaintenanceQuestions from "@/app/ui/propertyManagement/pages/questions/MaintenanceQuestions";
import QuestionsNavigation from "./QuestionsNavigation";
import {getUseCaseIndex} from "@/lib/db/database";

export default async function Questions() {
    const useCaseIndex = await getUseCaseIndex();

    let ComponentToRender;

    switch (useCaseIndex) {
        case 0:
            ComponentToRender = BookingsQuestions;
            break;
        case 1:
            ComponentToRender = PropertiesQuestions;
            break;
        case 2:
            ComponentToRender = MaintenanceQuestions;
            break;
        default:
            ComponentToRender = null;
    }

    return (
        <div>
            {ComponentToRender ? <ComponentToRender /> : <></>}
            {useCaseIndex !== null && <QuestionsNavigation useCaseIndex={useCaseIndex} />}
        </div>
    );
}