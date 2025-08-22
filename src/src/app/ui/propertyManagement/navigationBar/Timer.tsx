"use client"
import {Stack, Typography} from "@mui/material";
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {useEffect, useState} from "react";
import useSound from "use-sound";

export default function Timer() {
    const {stateMachine} = useSurveyManager();
    const [timer, setTimer] = useState("5:00");
    const [playOneMinuteSound] = useSound('/sounds/oneMinuteRemaining.mp3');
    const [playTenSecondsSound] = useSound('/sounds/tenSecondsRemaining.mp3');

    useEffect(() => {
        const subscription = stateMachine?.on('clockTick', (event) => {
            const formattedTime = new Date(event.timeDifference * 1000).toISOString().substring(14, 19);
            setTimer(formattedTime);
            if(event.timeDifference === 61) {
                playOneMinuteSound();
            } else if(event.timeDifference === 11) {
                playTenSecondsSound();
            }
        });
        return () => subscription?.unsubscribe();

    }, [playOneMinuteSound, playTenSecondsSound, stateMachine]);

    return (
        <Stack direction="row" spacing={1}>
            <TimerOutlinedIcon/>
            <Typography>{timer}</Typography>
        </Stack>
    );
}