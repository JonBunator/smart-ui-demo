import {getAISupportForCurrentSurveyStep} from "@/lib/db/database";
import {AISupport} from "@/lib/types"
import Agent from "@/app/ui/propertyManagement/agent/Agent";
import './AgentContainer.scss'

export default async function AgentContainer() {
   const aiSupport = await getAISupportForCurrentSurveyStep();

    return (
        aiSupport === AISupport.PROACTIVE_AGENT || aiSupport === AISupport.AGENT ?
            <div className="agent-container">
                <Agent/>
            </div>
            :
            undefined
    );
}