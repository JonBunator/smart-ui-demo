"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const nextURLS = ["/survey/properties", "/survey/maintenance", "/completed"]

interface QuestionsNavigationProps {
    useCaseIndex: number
}

export default function QuestionsNavigation(props: QuestionsNavigationProps) {
    const { useCaseIndex } = props;
    const { subscribe } = useSurveyManager();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = subscribe((snapshot) => {
            if(snapshot.matches({UseCase: "NotStarted"}) || snapshot.matches("Finished")) {
                router.push(nextURLS[useCaseIndex])
            }
        })
        return () => unsubscribe();
    }, [router, subscribe, useCaseIndex]);

    return (
        <>
        </>
    );
}