import QuestionsNavigation from "./QuestionsNavigation";
import {getSurveyStep, addQuestionaireData} from "@/lib/db/database";
import {bookings} from "@/app/ui/propertyManagement/pages/questions/parser/configs/bookings";
import {properties} from "@/app/ui/propertyManagement/pages/questions/parser/configs/properties";
import {maintenance} from "@/app/ui/propertyManagement/pages/questions/parser/configs/maintenance";
import QuestionsParser from "@/app/ui/propertyManagement/pages/questions/parser/QuestionsParser";
import FrameLayout from "@/app/ui/propertyManagement/layoutComponents/FrameLayout";
import "./Questions.scss"

const questionaires = [bookings, properties, maintenance]
const addDataFunctions = [addQuestionaireData, addQuestionaireData, addQuestionaireData]

export default async function Questions() {
    const surveyStep = await getSurveyStep();

    return (
        <FrameLayout>
            {surveyStep !== null && <QuestionsParser addData={addDataFunctions[surveyStep]} questionaire={questionaires[surveyStep]}/>}
            {surveyStep !== null && <QuestionsNavigation surveyStep={surveyStep} />}
        </FrameLayout>
    );
}