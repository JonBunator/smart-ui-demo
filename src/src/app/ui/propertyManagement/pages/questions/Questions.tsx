import QuestionsNavigation from "./QuestionsNavigation";
import {getSurveyStep, addQuestionaireData, isInitialQuestions, addInitialQuestions} from "@/lib/db/database";
import {initial} from "@/app/ui/propertyManagement/pages/questions/parser/configs/initial";
import {noAgent} from "@/app/ui/propertyManagement/pages/questions/parser/configs/noAgent";
import {agent} from "@/app/ui/propertyManagement/pages/questions/parser/configs/agent";
import QuestionsParser from "@/app/ui/propertyManagement/pages/questions/parser/QuestionsParser";
import FrameLayout from "@/app/ui/propertyManagement/layoutComponents/FrameLayout";
import "./Questions.scss"

const questionaires = [initial, noAgent, agent, agent]
const addDataFunctions = [addInitialQuestions, addQuestionaireData, addQuestionaireData, addQuestionaireData]

export default async function Questions() {
    const initialQuestions = await isInitialQuestions();
    const surveyStep = await getSurveyStep();
    let questionaireIndex = null;
    if(surveyStep !== null) {
        questionaireIndex = surveyStep + (initialQuestions ? 0 : 1);
    }

    return (
        <FrameLayout>
            {questionaireIndex !== null && <QuestionsParser addData={addDataFunctions[questionaireIndex]} questionaire={questionaires[questionaireIndex]}/>}
            {questionaireIndex !== null && <QuestionsNavigation />}
        </FrameLayout>
    );
}