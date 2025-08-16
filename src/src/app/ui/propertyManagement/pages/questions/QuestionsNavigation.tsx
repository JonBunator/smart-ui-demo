"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function QuestionsNavigation() {
    const { subscribe } = useSurveyManager();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = subscribe((snapshot) => {
            if(snapshot.matches("Finished")) {
                router.push("/completed");
            } else if(snapshot.matches({SurveyStep: "NotStarted"})) {
                router.push("/survey/bookings")
            }
        })
        return () => unsubscribe();
    }, [router, subscribe]);

    return (
        <>
        </>
    );
}