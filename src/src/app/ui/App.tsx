"use client"
import PropertyManagement from "@/app/ui/propertyManagement/PropertyManagement";
import EmailClient from "@/app/ui/emailClient/EmailClient";
import DebugButtons from "./DebugButtons";
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {useEffect, useCallback} from "react";
import {useRouter} from "next/navigation";
import "./App.scss";
import {useSmartAgent} from "smart-ui";
import {setPromptHistory} from "@/lib/db/database";

interface AppProps {
    children: React.ReactNode;
    agent?: React.ReactNode;
}

export default function App(props: AppProps) {
    const {children, agent} = props;
    const {subscribe} = useSurveyManager();
    const {deleteChatHistory, chatHistory} = useSmartAgent();
    const router = useRouter();
    
    const updatePromptHistory = useCallback(() => {
        const history = JSON.stringify(chatHistory);
        setPromptHistory(history).then().catch();
        deleteChatHistory();
    }, [chatHistory, deleteChatHistory]);
    
    useEffect(() => {
        const unsubscribe = subscribe((snapshot) => {
            if(snapshot.matches({SurveyStep: "Questions"})) {
                updatePromptHistory();
                router.push('/questions')
            }
        })
        return () => unsubscribe();
    }, [deleteChatHistory, router, subscribe, updatePromptHistory]);

    return (
        <div className="app-layout">
            <PropertyManagement agent={agent}>
                {children}
            </PropertyManagement>
            <EmailClient />
            <DebugButtons />
        </div>
    );
}