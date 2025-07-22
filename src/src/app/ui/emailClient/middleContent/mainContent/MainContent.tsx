"use client"
import "./MainContent.scss"
import MainContentTabs from "@/app/ui/emailClient/middleContent/mainContent/MainContentTabs";
import MainToolbar from "@/app/ui/emailClient/middleContent/mainContent/MainToolbar";
import EmailList from "@/app/ui/emailClient/middleContent/mainContent/emailList/EmailList";
import EmailPreview from "@/app/ui/emailClient/middleContent/mainContent/EmailPreview";
import {useCallback, useEffect, useState} from "react";
import {EmailItem} from "@/app/ui/emailClient/utils/types";
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {getAISupportForCurrentUseCase, getAllEMails, getEMail} from "@/lib/db/database";
import {$Enums, EMail} from "@prisma";
import {useSmartAgent} from "smart-ui";
import AISupport = $Enums.AISupport;

export default function MainContent() {
    const [selectedEmail, setSelectedEmail] = useState<EmailItem|undefined>(undefined);
    const [emails, setEmails] = useState<EmailItem[]>([]);
    const {stateMachine} = useSurveyManager();
    const {sendEvent} = useSmartAgent();

    function createEmailItem(email: EMail): EmailItem {
        return {
            id: email.id,
            author: email.author,
            authorEmail: email.authorEmail,
            subject: email.subject,
            content: email.content,
            sentTime: new Date(),
        }
    }

    const updateEmails = useCallback(() => {
        getAllEMails()
            .then(emails => {
                setEmails(
                    emails?.map(email => createEmailItem(email)) ?? []
                )});

    }, []);
    
    useEffect(() => {
        updateEmails();
    }, [updateEmails]);

    const sendEmailEvent = useCallback(async (email: EMail)=> {
        const aiSupport = await getAISupportForCurrentUseCase();
        if(aiSupport !== AISupport.PROACTIVE_AGENT) {
            return;
        }
        sendEvent("A new email was received. Check if the email is about adding a booking, " +
            "property or maintenance request. If so ask the user if the agent should add it. " +
            "Name the subject and author in the response to the user. Don't querry the email via tools. Instead use this information:\n" +
            `Subject: ${email.subject}\n` +
            `Author: ${email.author}\n` +
            `Email: ${email.authorEmail}\n` +
            `Content: ${email.content}\n`
        , 1,
            "E-Mail wird verarbeitet");
    }, [sendEvent]);

    useEffect(() => {
        const subscription = stateMachine?.on('sendEmail', (event) => {
            getEMail(event.useCaseIndex, event.dataIndex)
                .then(email => {
                    if(email) {
                        setEmails((prevState) => {
                            const emailExists = prevState.some(existingEmail => existingEmail.id === email.id);
                            sendEmailEvent(email).then();
                            if (!emailExists) {
                                return [createEmailItem(email), ...prevState];
                            }
                            return prevState;
                        });
                    }
                });
        });
        return () => subscription?.unsubscribe();
    }, [sendEmailEvent, stateMachine]);

    return (
        <div className="main-content">
            <MainContentTabs/>
            <MainToolbar/>
            <EmailList emails={emails} selectedEmail={selectedEmail} onSelectedEmailChange={(value) => setSelectedEmail(value)}/>
            <EmailPreview noEmails={emails.length === 0} email={selectedEmail}/>
        </div>
    );
}