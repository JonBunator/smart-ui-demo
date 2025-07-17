"use client"
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from 'next/navigation'
import {Button} from "@mui/material";
import {isInviteCodeValid, startNewSurvey} from "@/lib/db/database";
import FrameLayoutTextImage from "@/app/ui/propertyManagement/layoutComponents/FrameLayoutTextImage";
import LoadingPage from "@/app/ui/LoadingPage";

export default function StartPage() {
    const params = useParams<{ inviteCode: string }>()
    const [inviteCodeValid, setInviteCodeValid] = useState<boolean | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        isInviteCodeValid(params.inviteCode)
            .then(valid => setInviteCodeValid(valid))
            .catch(error => console.error(error));
    }, [params.inviteCode]);

    async function startSurvey() {
        const successful = await startNewSurvey(params.inviteCode);
        setInviteCodeValid(successful);
        router.push(`/survey`)
    }

    if(inviteCodeValid) {
        return (<Button disabled={!inviteCodeValid} onClick={startSurvey}>Neue Umfrage starten</Button>);
    }

    if(inviteCodeValid === false) {
        return (<FrameLayoutTextImage text="Der Einladungs-Code ist ungültig oder die Umfrage wurde bereits geschlossen!" imagePath="/image/cat-invitecode.png"/>);
    }

    return (<LoadingPage/>);
}