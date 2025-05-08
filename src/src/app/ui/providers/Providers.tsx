"use client"
import {SmartComponentManager} from "smart-ui";
import {SmartAgentProvider} from "smart-ui";
import {callAgentEndpoint} from "@/app/openAI/openAI";
import {ReactNode} from "react";
import FluentUIProvider from "./FluentUIProvider";
import MUIProvider from "@/app/ui/providers/MUIProvider";

export default function Providers({children}: {children: ReactNode}) {
    return (
        <FluentUIProvider>
            <MUIProvider>
                <SmartComponentManager>
                    <SmartAgentProvider callAgent={callAgentEndpoint}>
                        {children}
                    </SmartAgentProvider>
                </SmartComponentManager>
            </MUIProvider>
        </FluentUIProvider>
    );
}