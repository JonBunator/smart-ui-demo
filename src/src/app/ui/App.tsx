"use client"
import PropertyManagement from "@/app/ui/propertyManagement/PropertyManagement";
import EmailClient from "@/app/ui/emailClient/EmailClient";
import DebugButtons from "./DebugButtons";
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import "./App.scss";

export default function App({ children }: { children: React.ReactNode; }) {
    const {subscribe } = useSurveyManager();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = subscribe((snapshot) => {
            console.log("NOWENRSADLFKASDLFKJ")
            if(snapshot.matches({UseCase: "Questions"})) {
                console.log("NOWWWW")
                router.push('/questions')
            }
        })
        return () => unsubscribe();
    }, [router, subscribe]);

    return (
        <div className="app-layout">
            <PropertyManagement>
                {children}
            </PropertyManagement>
            <EmailClient />
            {process.env.NODE_ENV === 'development' && <DebugButtons />}
        </div>
    );
}