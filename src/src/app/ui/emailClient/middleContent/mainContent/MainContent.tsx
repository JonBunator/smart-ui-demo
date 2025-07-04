"use client"
import "./MainContent.scss"
import MainContentTabs from "@/app/ui/emailClient/middleContent/mainContent/MainContentTabs";
import MainToolbar from "@/app/ui/emailClient/middleContent/mainContent/MainToolbar";
import EmailList from "@/app/ui/emailClient/middleContent/mainContent/emailList/EmailList";
import EmailPreview from "@/app/ui/emailClient/middleContent/mainContent/EmailPreview";
import {useCallback, useEffect, useState} from "react";
import {EmailItem} from "@/app/ui/emailClient/utils/types";
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {getAllEMails, getEMail} from "@/lib/db/database";
import {EMail} from "@prisma";
import {useSmartAgent} from "smart-ui";

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

    const sendEmailEvent = useCallback((email: EMail)=> {
        console.log("email received", email)
        sendEvent("A new email was received. Check if the email is about adding a booking, " +
            "property or maintenance request. If so ask the user if the agent should add it. " +
            "Name the subject and author in the response to the user. Information about the email:\n" +
            `Subject: ${email.subject}\n` +
            `Author: ${email.author}\n` +
            `Email: ${email.authorEmail}\n` +
            `Content: ${email.content}\n`
        , 1);
    }, [sendEvent]);

    useEffect(() => {
        const subscription = stateMachine?.on('sendEmail', (event) => {
            getEMail(event.useCaseIndex, event.dataIndex)
                .then(email => {
                    if(email) {
                        setEmails((prevState) => {
                            const emailExists = prevState.some(existingEmail => existingEmail.id === email.id);
                            sendEmailEvent(email);
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