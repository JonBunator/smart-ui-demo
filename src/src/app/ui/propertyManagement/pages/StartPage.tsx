"use client"
import {useParams, useRouter} from 'next/navigation'
import {Button, Divider, Grid, Typography} from "@mui/material";
import {startNewSurvey} from "@/lib/db/database";
import FrameLayout from "@/app/ui/propertyManagement/layoutComponents/FrameLayout";
import ExternalLink from "@/app/ui/propertyManagement/layoutComponents/ExternalLink";
import Image from 'next/image'
import InviteCodeInvalidPage from "@/app/ui/propertyManagement/pages/InviteCodeInvalidPage";
import "./StartPage.scss"
import {useState} from "react";

export default function StartPage() {
    const router = useRouter();
    const [inviteCodeValid, setInviteCodeValid] = useState<boolean | undefined>(undefined);
    const params = useParams<{ inviteCode: string }>()

    async function startSurvey() {
        const successful = await startNewSurvey(params.inviteCode);
        setInviteCodeValid(successful);
        router.push('/questions')
    }

    return (
        <InviteCodeInvalidPage inviteCodeValid={inviteCodeValid}>
            <FrameLayout>
                <Grid className="start-page">
                    <div className="main-section">
                        <Typography variant="h5">Wissenschaftliche Umfrage zu intelligenten Benutzeroberflächen durch
                            einen KI-Agenten (Masterarbeit Informatik)</Typography>
                        <Typography variant="body1">Dies ist eine interaktive Studie, in der die Teilnehmer eine
                            Softwareanwendung bedienen. Dabei soll
                            evaluiert werden, inwiefern ein KI-Agent bei der Bearbeitung von Aufgaben hilfreich sein
                            kann, um die Nutzererfahrung und Produktivität
                            zu steigern, indem der Agent direkt mit der Benutzeroberfläche interagieren
                            kann.</Typography>
                        <ul>
                            <li><Typography variant="body1">Die Umfrage dauert ungefähr 30min.</Typography></li>
                            <li><Typography variant="body1">Während eines Teils der Umfrage müssen Sie mit einer
                                Softwareanwendung interagieren (~18min).</Typography></li>
                            <li><Typography variant="body1">Die Umfrage kann nur auf einem Laptop oder Desktop-PC mit
                                Tastatur und nicht auf einem mobilen Gerät durchgeführt werden.</Typography></li>
                            <li><Typography variant="body1">Die Umfrage ist nur auf Deutsch verfügbar.</Typography></li>
                            <li><Typography variant="body1">Mit der Teilnahme stimmen Sie zu, dass die erhobenen Daten
                                für Forschungszwecke verwendet werden (Siehe <ExternalLink appendhref
                                                                                           href="/privacy-policy"
                                                                                           link="Datenschutzerklärung"/>).</Typography>
                            </li>
                        </ul>
                    </div>
                    <Button onClick={startSurvey} variant="contained">Umfrage
                        starten</Button>
                    <Grid container spacing={6} className="bottom-section">
                        <Grid size={12} className="partners">
                            <Divider/>
                        </Grid>
                        <Grid size={{xs: 12, md: 8}} className="partners">
                            <Typography variant="body1">Diese Masterarbeit entsteht in Kooperation mit dem&nbsp;
                                <ExternalLink href="https://www.hcai.eu/" link="Lehrstuhl für Menschzentrierte
                                Künstliche Intelligenz der Universität Augsburg"/>&nbsp;und der&nbsp;<ExternalLink
                                    href="https://xitaso.com/" link="XITASO GmbH IT & Software Solutions"/>
                            </Typography>
                            <div className="logos">
                                <Image className="light-image" src="/image/Uni-Logo-light.svg" width={250} height={88}
                                       alt=""/>
                                <Image className="dark-image" src="/image/Uni-Logo-dark.svg" width={250} height={88}
                                       alt=""/>
                                <Image className="light-image xitaso" src="/image/XITASO-Logo-light.svg" width={250}
                                       height={79} alt=""/>
                                <Image className="dark-image xitaso" src="/image/XITASO-Logo-dark.svg" width={250}
                                       height={79} alt=""/>
                            </div>
                        </Grid>
                        <Grid size={{xs: 12, md: 4}} className="contacts">
                            <div className="contact-row">
                                <Typography className="heading" variant="h6">Kontaktdaten</Typography>
                                <Typography variant="body1">
                                    Jonas Bühler <br/>
                                    <ExternalLink href="mailto:jonas.buehler@uni-a.de" link="jonas.buehler@uni-a.de"/>
                                </Typography>
                            </div>
                            <div className="contact-row">
                                <Typography className="heading" variant="h6">Datenschutzerklärung</Typography>
                                <Typography variant="body1">
                                    <ExternalLink appendhref href="/privacy-policy" link="Link"/>
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </FrameLayout>
        </InviteCodeInvalidPage>
    );
}