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

export default function MainContent() {
    const [selectedEmail, setSelectedEmail] = useState<EmailItem|undefined>(undefined);
    const [emails, setEmails] = useState<EmailItem[]>([]);
    const {stateMachine} = useSurveyManager();

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



    useEffect(() => {
        const subscription = stateMachine?.on('sendEmail', (event) => {
            getEMail(event.useCaseIndex, event.dataIndex)
                .then(email => {
                    if(email) {
                        setEmails((prevState) => {
                            const emailExists = prevState.some(existingEmail => existingEmail.id === email.id);

                            if (!emailExists) {
                                return [createEmailItem(email), ...prevState];
                            }
                            return prevState;
                        });
                    }
                });
        });
        return () => subscription?.unsubscribe();
    }, [stateMachine]);

    return (
        <div className="main-content">
            <MainContentTabs/>
            <MainToolbar/>
            <EmailList emails={emails} selectedEmail={selectedEmail} onSelectedEmailChange={(value) => setSelectedEmail(value)}/>
            <EmailPreview noEmails={emails.length === 0} email={selectedEmail}/>
        </div>
    );
}