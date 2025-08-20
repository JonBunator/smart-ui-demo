import {getAISupportForCurrentSurveyStep, isAgentResponseWithMotivation} from "@/lib/db/database";
import {AISupport} from "@/lib/types"
import Agent from "@/app/ui/propertyManagement/agent/Agent";
import './AgentContainer.scss'

export default async function AgentContainer() {
    const aiSupport = await getAISupportForCurrentSurveyStep();
    const agentResponseWithMotivation = await isAgentResponseWithMotivation();

    return (
        aiSupport === AISupport.PROACTIVE_AGENT || aiSupport === AISupport.AGENT ?
            <div className="agent-container">
                <Agent agentResponseWithMotivation={agentResponseWithMotivation ?? false}/>
            </div>
            :
            undefined
    );
}