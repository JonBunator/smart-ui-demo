"use client"
import {SmartComponentManager} from "smart-ui";
import {SmartAgentProvider} from "smart-ui";
import {callAgentEndpoint} from "@/lib/openAI/openAI";
import {ReactNode} from "react";
import FluentUIProvider from "./FluentUIProvider";
import MUIProvider from "@/app/ui/providers/MUIProvider";
import SurveyManagerProvider from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {CUSTOM_SYSTEM_PROMPT} from "@/lib/config";
import { usePathname } from "next/navigation";
import SnackbarProvider from "@/app/ui/providers/SnackbarProvider";

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

export default function Providers({children}: {children: ReactNode}) {

    const currentPagePath = usePathname();

    return (
        <FluentUIProvider>
            <MUIProvider>
                <SnackbarProvider>
                    <SurveyManagerProvider>
                        <SmartComponentManager>
                            <SmartAgentProvider callAgent={callAgentEndpoint}
                                                customSystemPrompt={CUSTOM_SYSTEM_PROMPT}
                                                currentPagePath={currentPagePath}
                                                pageDescriptions={pageDescriptions}>
                                    {children}
                            </SmartAgentProvider>
                        </SmartComponentManager>
                    </SurveyManagerProvider>
                </SnackbarProvider>
            </MUIProvider>
        </FluentUIProvider>
    );
}