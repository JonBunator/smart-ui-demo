"use client"
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from 'next/navigation'
import {Button, Typography, Grid, Divider} from "@mui/material";
import {isInviteCodeValid, startNewSurvey} from "@/lib/db/database";
import FrameLayoutTextImage from "@/app/ui/propertyManagement/layoutComponents/FrameLayoutTextImage";
import FrameLayout from "@/app/ui/propertyManagement/layoutComponents/FrameLayout";
import LoadingPage from "@/app/ui/LoadingPage";
import ExternalLink from "@/app/ui/propertyManagement/layoutComponents/ExternalLink";
import Image from 'next/image'
import "./StartPage.scss"
import {useSnackbar} from "@/app/ui/providers/SnackbarProvider";

export default function StartPage() {
    const params = useParams<{ inviteCode: string }>()
    const [inviteCodeValid, setInviteCodeValid] = useState<boolean | undefined>(undefined);
    const router = useRouter();
    const {error} = useSnackbar();

    useEffect(() => {
        isInviteCodeValid(params.inviteCode)
            .then(valid => setInviteCodeValid(valid))
            .catch(() => error());
    }, [error, params.inviteCode]);

    async function startSurvey() {
        const successful = await startNewSurvey(params.inviteCode);
        setInviteCodeValid(successful);
        router.push('/questions')
    }

    if(inviteCodeValid) {
        return (
            <FrameLayout>
                <Grid className="start-page">
                    <div className="main-section">
                        <Typography variant="h5">Wissenschaftliche Umfrage zu intelligenten Benutzeroberflächen durch einen KI-Agenten (Masterarbeit Informatik)</Typography>
                        <Typography variant="body1">Dies ist eine interaktive Umfrage, in der die Teilnehmer eine Softwareanwendung bedienen. Dabei soll
                            evaluiert werden, inwiefern ein KI-Agent bei der Bearbeitung von Aufgaben hilfreich sein kann, um die Nutzererfahrung und Produktivität
                            zu steigern. </Typography>
                        <ul>
                            <li><Typography variant="body1">Die Umfrage dauert ungefähr 30min</Typography></li>
                            <li><Typography variant="body1">Während einem Teil der Umfrage müssen Sie mit einer Softwareanwendung interagiern (~18min)</Typography></li>
                            <li><Typography variant="body1">Die Umfrage kann nur auf einem Laptop oder Desktop-PC mit Tastatur+Maus und nicht auf einem mobilen Gerät durchgeführt werden</Typography></li>
                            <li><Typography variant="body1">Die Umfrage ist nur auf Deutsch verfügbar</Typography></li>
                            <li><Typography variant="body1">Mit der Teilnahme stimmen Sie zu, dass die Erhobenen Daten für Forschungszwecke verwendet werden</Typography></li>
                        </ul>
                    </div>
                    <Button disabled={!inviteCodeValid} onClick={startSurvey} variant="contained">Umfrage starten</Button>
                    <Grid container spacing={6} className="bottom-section">
                        <Grid size={12} className="partners">
                            <Divider/>
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }} className="partners">
                            <Typography variant="body1">Diese Masterarbeit entsteht in Kooperation mit dem&nbsp;
                                <ExternalLink href="https://www.hcai.eu/" link="Lehrstuhl für Menschzentrierte
                                Künstliche Intelligenz der Universität Augsburg"/>&nbsp;und der&nbsp;<ExternalLink href="https://xitaso.com/" link="XITASO GmbH IT & Software Solutions"/>
                            </Typography>
                            <div className="logos">
                                <Image className="light-image" src="/image/Uni-Logo-light.svg" width={250} height={88} alt="" />
                                <Image className="dark-image" src="/image/Uni-Logo-dark.svg" width={250} height={88} alt="" />
                                <Image className="light-image xitaso" src="/image/XITASO-Logo-light.svg" width={250} height={79} alt="" />
                                <Image className="dark-image xitaso" src="/image/XITASO-Logo-dark.svg" width={250} height={79} alt="" />
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} className="contacts">
                            <Typography className="heading" variant="h6">Kontaktdaten</Typography>
                            <Typography variant="body1">
                                XITASO GmbH IT & Software Solutions<br/>
                                Austraße 35<br/>
                                D-86153 Augsburg<br/>
                                Jonas Bühler <br/>
                                <ExternalLink href="mailto:jonas.buehler@xitaso.com" link="jonas.buehler@xitaso.com"/><br/>
                                Alternativ:&nbsp;<ExternalLink href="mailto:jonas.buehler@uni-a.de" link="jonas.buehler@uni-a.de"/>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </FrameLayout>
        );
    }

    if(inviteCodeValid === false) {
        return (<FrameLayoutTextImage text="Der Einladungs-Code ist ungültig oder die Umfrage wurde bereits geschlossen!" imagePath="/image/cat-invitecode.png" blurUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAP1BMVEVHR0c8PDxNTU1SUlJCQkJbW1stLS1iYmIRERE3NzcmJiZWVlaGhoYYGBh3d3dwcHAeHh5oaGgHBweUlJSlpaWGz12KAAAA+klEQVQY0y2QSZbgMAhDxWAwnp3U/c9apLrt3X8SEmCeWlvhBjEolQK1wB8UMfoHHdr+Q0UoR0JwKglzPvXEZ4sgmCmZorZZp/m7idIcRtQIteszm67ha1OQUcyKU1Bns3HX7dZgYc+DEy2h7LK8M3CsJZwzZ5I2zrbuW4LnA1P7grZSppc1OuxB91aP3asuii57UTtY99R5uOTnIn282RVjsTDhHQwRlPen5F7DSdaSNQQsUtZKB0ZGQDi695LPUy/p6wpu1W8pUnrqs+5YnUiPvO6Cb2wmYq9USn/H/ToJK7xj7yvd7xjOoFAQpeNuz+18bBENyyOR0C9oiwtlqMPFjgAAAABJRU5ErkJggg=="/>);
    }

    return (<LoadingPage/>);
}