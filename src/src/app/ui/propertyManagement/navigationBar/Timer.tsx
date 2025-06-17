"use client"
import {Stack, Typography } from "@mui/material";
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {useEffect, useState} from "react";

export default function Timer() {
    const { snapshot, stateMachine } = useSurveyManager();
    const [timer, setTimer] = useState("1:00");

    useEffect(() => {
        const subscription = stateMachine?.on('clockTick', (event) => {
            const formattedTime = new Date(event.timeDifference * 1000).toISOString().substring(14, 19);
            setTimer(formattedTime);
        });
        return () => subscription?.unsubscribe();

    }, [stateMachine]);

    return (
        snapshot?.matches({ UseCase: "Running" }) && timer !== '' ? (
        <Stack direction="row" spacing={1}>
            <TimerOutlinedIcon/>
            <Typography>{timer}</Typography>
        </Stack>
        ) : (
            <></>
        )
    );
}