import Content from "./Content.tsx";
import {callAgentEndpoint} from "../openAIMock.ts";
import {SmartAgentProvider} from "smart-ui";

export default function App() {

    return (
        <SmartAgentProvider callAgent={callAgentEndpoint} currentPagePath="/">
            <Content/>
        </SmartAgentProvider>
    )
}