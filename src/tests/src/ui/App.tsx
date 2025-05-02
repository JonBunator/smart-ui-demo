import {SmartComponentManager, SmartAgentProvider} from "smart-ui";
import Content from "./Content.tsx";
import {callAgentEndpoint} from "../openAIMock.ts";

export default function App() {

    return (
        <SmartComponentManager>
            <SmartAgentProvider callAgent={callAgentEndpoint}>
                <Content/>
            </SmartAgentProvider>
        </SmartComponentManager>
    )
}