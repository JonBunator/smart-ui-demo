"use client"
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from 'next/navigation'
import {Button} from "@mui/material";
import {isInviteCodeValid, startNewSurvey} from "@/lib/db/database";

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

    return (
        <div>
            {inviteCodeValid === true && <Button disabled={!inviteCodeValid} onClick={startSurvey}>Neue Umfrage starten</Button>}
            {inviteCodeValid === false && <div>Invite code is not valid or survey is already closed!</div>}
            {inviteCodeValid === undefined && <div>Loading</div>}
        </div>
    );
}