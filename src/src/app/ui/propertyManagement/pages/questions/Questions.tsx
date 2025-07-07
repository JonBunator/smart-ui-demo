import QuestionsNavigation from "./QuestionsNavigation";
import {getUseCaseIndex, addQuestionaireData} from "@/lib/db/database";
import {bookings} from "@/app/ui/propertyManagement/pages/questions/parser/configs/bookings";
import {properties} from "@/app/ui/propertyManagement/pages/questions/parser/configs/properties";
import {maintenance} from "@/app/ui/propertyManagement/pages/questions/parser/configs/maintenance";
import QuestionsParser from "@/app/ui/propertyManagement/pages/questions/parser/QuestionsParser";
import "./Questions.scss"

const questionaires = [bookings, properties, maintenance]
const addDataFunctions = [addQuestionaireData, addQuestionaireData, addQuestionaireData]

export default async function Questions() {
    const useCaseIndex = await getUseCaseIndex();

    return (
        <div className="questionaire">
            {useCaseIndex !== null && <QuestionsParser addData={addDataFunctions[useCaseIndex]} questionaire={questionaires[useCaseIndex]}/>}
            {useCaseIndex !== null && <QuestionsNavigation useCaseIndex={useCaseIndex} />}
        </div>
    );
}