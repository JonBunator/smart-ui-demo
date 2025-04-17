"use client"
import {SmartComponentManager} from "smart-ui";
import {SmartAgentProvider} from "smart-ui";
import {callAgentEndpoint} from "@/app/openAI/openAI";
import {ReactNode} from "react";

export default function Providers({children}: {children: ReactNode}) {
    return (
        <SmartComponentManager>
            <SmartAgentProvider callAgent={callAgentEndpoint}>
                {children}
            </SmartAgentProvider>
        </SmartComponentManager>
    );
}