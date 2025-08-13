"use client"
import {SmartAgentProvider} from "smart-ui";
import {callAgentEndpoint} from "@/lib/openAI/openAI";
import {ReactNode, useEffect, useState} from "react";
import {AISupport} from "@/lib/types"
import {usePathname} from "next/navigation";
import {getAISupportForCurrentSurveyStep, multipleAgentStepsAllowed} from "@/lib/db/database";
import {getSystemPrompt} from "@/lib/utils";
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";

const pageDescriptions = [
    {
        path: "/survey/bookings",
        description: "Is used to manage bookings and add new ones. Displays bookings in table",
    },
    {
        path: "/survey/bookings/add",
        description: "Form that is used to add a new booking",
    },
    {
        path: "/survey/properties",
        description: "Is used to manage vacation homes and add new ones. Displays properties in cards with images of them",
    },
    {
        path: "/survey/properties/add",
        description: "Form that is used to add a new vacation home",
    },
    {
        path: "/survey/maintenance",
        description: "Is used to manage maintenances of vacation homes and add new ones. Displays maintenances in table",
    },
    {
        path: "/survey/maintenance/add",
        description: "Form that is used to add a new maintenance request",
    }
]

export default function SmartAgentProviderSetup({children}: {children: ReactNode}) {
    const [customSystemPrompt, setCustomSystemPrompt] = useState("");
    const [allowMultipleSteps, setAllowMultipleSteps] = useState<boolean>(false);
    const currentPagePath = usePathname();
    const { subscribe } = useSurveyManager();

    useEffect(() => {
        updateSmartAgentProps();
        const unsubscribe = subscribe((snapshot) => {
            if(snapshot.matches({SurveyStep: "NotStarted"})) {
                updateSmartAgentProps();
            }
        })
        return () => unsubscribe();
    }, [subscribe]);

    function updateSmartAgentProps() {
        Promise.all([getAISupportForCurrentSurveyStep(), multipleAgentStepsAllowed()]).then(
            (values) => {
                const aiSupport = values[0];
                const allowMultipleSteps = values[1];
                if(aiSupport === AISupport.NONE) {
                    return;
                }
                if(aiSupport !== null && allowMultipleSteps !== null) {
                    const systemPrompt = getSystemPrompt(allowMultipleSteps, aiSupport === AISupport.PROACTIVE_AGENT);
                    setCustomSystemPrompt(systemPrompt);
                    setAllowMultipleSteps(allowMultipleSteps);
                }
            }
        )
    }

    return (
            <SmartAgentProvider callAgent={callAgentEndpoint}
                                customSystemPrompt={customSystemPrompt}
                                currentPagePath={currentPagePath}
                                pageDescriptions={pageDescriptions}
                                allowMultipleSteps={allowMultipleSteps}
                                defaultChatHistoryMemory={8}
            >
                    {children}
            </SmartAgentProvider>

    );
}