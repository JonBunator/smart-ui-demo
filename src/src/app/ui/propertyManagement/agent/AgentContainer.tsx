import {getAISupportForCurrentUseCase} from "@/lib/db/database";
import {AISupport} from "@prisma";
import Agent from "@/app/ui/propertyManagement/agent/Agent";
import './AgentContainer.scss'

export default async function AgentContainer() {
   const aiSupport = await getAISupportForCurrentUseCase();

    return (
        aiSupport === AISupport.PROACTIVE_AGENT || aiSupport === AISupport.AGENT ?
            <div className="agent-container">
                <Agent/>
            </div>
            :
            undefined
    );
}