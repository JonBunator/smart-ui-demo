"use client"
import React, {useEffect, useState} from "react";
import {useParams} from 'next/navigation'
import {isInviteCodeValid} from "@/lib/db/database";
import FrameLayoutTextImage from "@/app/ui/propertyManagement/layoutComponents/FrameLayoutTextImage";
import LoadingPage from "@/app/ui/LoadingPage";
import {useSnackbar} from "@/app/ui/providers/SnackbarProvider";

export default function InviteCodeInvalidPage({children}: {children: React.ReactNode}) {
    const params = useParams<{ inviteCode: string }>()
    const [inviteCodeValid, setInviteCodeValid] = useState<boolean | undefined>(undefined);
    const {error} = useSnackbar();

    useEffect(() => {
        isInviteCodeValid(params.inviteCode)
            .then(valid => setInviteCodeValid(valid))
            .catch(() => error());
    }, [error, params.inviteCode]);

    if (inviteCodeValid) {
        return <>{children}</>
    }

    if (inviteCodeValid === false) {
        return (
            <FrameLayoutTextImage text="Der Einladungs-Code ist ungültig oder die Umfrage wurde bereits geschlossen!"
                                  imagePath="/image/cat-invitecode.png"
                                  blurUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAP1BMVEVHR0c8PDxNTU1SUlJCQkJbW1stLS1iYmIRERE3NzcmJiZWVlaGhoYYGBh3d3dwcHAeHh5oaGgHBweUlJSlpaWGz12KAAAA+klEQVQY0y2QSZbgMAhDxWAwnp3U/c9apLrt3X8SEmCeWlvhBjEolQK1wB8UMfoHHdr+Q0UoR0JwKglzPvXEZ4sgmCmZorZZp/m7idIcRtQIteszm67ha1OQUcyKU1Bns3HX7dZgYc+DEy2h7LK8M3CsJZwzZ5I2zrbuW4LnA1P7grZSppc1OuxB91aP3asuii57UTtY99R5uOTnIn282RVjsTDhHQwRlPen5F7DSdaSNQQsUtZKB0ZGQDi695LPUy/p6wpu1W8pUnrqs+5YnUiPvO6Cb2wmYq9USn/H/ToJK7xj7yvd7xjOoFAQpeNuz+18bBENyyOR0C9oiwtlqMPFjgAAAABJRU5ErkJggg=="/>);
    }

    return (<LoadingPage/>);
}