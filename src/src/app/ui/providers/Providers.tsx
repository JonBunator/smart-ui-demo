"use client"
import {SmartComponentManager} from "smart-ui";
import {SmartAgentProvider} from "smart-ui";
import {callAgentEndpoint} from "@/lib/openAI/openAI";
import {ReactNode} from "react";
import FluentUIProvider from "./FluentUIProvider";
import MUIProvider from "@/app/ui/providers/MUIProvider";
import SurveyManagerProvider from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {CUSTOM_SYSTEM_PROMPT} from "@/lib/config";

export default function Providers({children}: {children: ReactNode}) {
    return (
        <FluentUIProvider>
            <MUIProvider>
                <SurveyManagerProvider>
                    <SmartComponentManager>
                        <SmartAgentProvider callAgent={callAgentEndpoint} customSystemPrompt={CUSTOM_SYSTEM_PROMPT}>
                            {children}
                        </SmartAgentProvider>
                    </SmartComponentManager>
                </SurveyManagerProvider>
            </MUIProvider>
        </FluentUIProvider>
    );
}