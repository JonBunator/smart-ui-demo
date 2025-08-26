"use client"
import {ReactNode} from "react";
import FluentUIProvider from "./FluentUIProvider";
import MUIProvider from "@/app/ui/providers/MUIProvider";
import SurveyManagerProvider from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import SnackbarProvider from "@/app/ui/providers/SnackbarProvider";
import SmartAgentProviderSetup from "@/app/ui/providers/SmartAgentProviderSetup";

export default function Providers({children}: { children: ReactNode }) {
    return (
        <FluentUIProvider>
            <MUIProvider>
                <SnackbarProvider>
                    <SurveyManagerProvider>
                        <SmartAgentProviderSetup>
                            {children}
                        </SmartAgentProviderSetup>
                    </SurveyManagerProvider>
                </SnackbarProvider>
            </MUIProvider>
        </FluentUIProvider>
    );
}