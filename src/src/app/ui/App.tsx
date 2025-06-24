"use client"
import PropertyManagement from "@/app/ui/propertyManagement/PropertyManagement";
import EmailClient from "@/app/ui/emailClient/EmailClient";
import DebugButtons from "./DebugButtons";
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import "./App.scss";
import {useSmartAgent} from "smart-ui";

interface AppProps {
    children: React.ReactNode;
    agent?: React.ReactNode;
}

export default function App(props: AppProps) {
    const {children, agent} = props;
    const {subscribe} = useSurveyManager();
    const {deleteChatHistory} = useSmartAgent();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = subscribe((snapshot) => {
            if(snapshot.matches({UseCase: "Questions"})) {
                deleteChatHistory();
                router.push('/questions')
            }
        })
        return () => unsubscribe();
    }, [deleteChatHistory, router, subscribe]);

    return (
        <div className="app-layout">
            <PropertyManagement agent={agent}>
                {children}
            </PropertyManagement>
            <EmailClient />
            {process.env.NODE_ENV === 'development' && <DebugButtons />}
        </div>
    );
}