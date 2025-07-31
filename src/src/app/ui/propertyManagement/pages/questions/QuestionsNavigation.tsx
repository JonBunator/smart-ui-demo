"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const nextURLS = ["/survey/bookings", "/survey/bookings", "/completed"]

interface QuestionsNavigationProps {
    surveyStep: number
}

export default function QuestionsNavigation(props: QuestionsNavigationProps) {
    const { surveyStep } = props;
    const { subscribe } = useSurveyManager();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = subscribe((snapshot) => {
            if(snapshot.matches({SurveyStep: "NotStarted"}) || snapshot.matches("Finished")) {
                router.push(nextURLS[surveyStep])
            }
        })
        return () => unsubscribe();
    }, [router, subscribe, surveyStep]);

    return (
        <>
        </>
    );
}