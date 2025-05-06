"use client"
import "./MainContent.scss"
import MainContentTabs from "@/app/ui/emailClient/middleContent/mainContent/MainContentTabs";
import MainToolbar from "@/app/ui/emailClient/middleContent/mainContent/MainToolbar";
import EmailList from "@/app/ui/emailClient/middleContent/mainContent/emailList/EmailList";
import EmailPreview from "@/app/ui/emailClient/middleContent/mainContent/EmailPreview";
import {useState} from "react";
import {EmailItem} from "@/app/ui/emailClient/utils/types";

const emails: EmailItem[] = [
    {
        author: "Luke Skywalker",
        subject: "The Force Awakens",
        content: "Hi there,\n\nJust wanted to let you know that the Force is strong with this one. As we prepare for our next mission, it's crucial that we stay vigilant and trust in the Force. The galaxy is in turmoil, and the Rebellion needs every one of us to stand firm against the Empire. Let's meet at the cantina to discuss our strategy and ensure that we are ready for whatever challenges lie ahead.\n\nMay the Force be with you.\n\nRegards,\nLuke",
        sentTime: new Date("2025-05-06T10:30:00Z")
    },
    {
        author: "Tony Stark",
        subject: "New Suit Upgrades",
        content: "Hey,\n\nI've been working on some new upgrades for the suit, and I think you're going to love them. The new tech includes enhanced flight capabilities, improved energy efficiency, and a state-of-the-art AI system that will assist you in real-time during missions. Let's catch up over coffee and I'll show you the latest tech. It's important that we stay ahead of the curve and ensure that our technology is always one step ahead of any potential threats.\n\nBest,\nTony",
        sentTime: new Date("2025-05-06T11:00:00Z")
    },
    {
        author: "Frodo Baggins",
        subject: "The Ring's Journey",
        content: "Hello,\n\nThe journey to Mordor is long and perilous, and we must be cautious and stick together. The burden of the Ring is heavy, and the path is fraught with danger. We must rely on each other and the strength of our fellowship to see us through. Let's plan our next steps carefully, ensuring that we have the supplies and support we need to succeed. Remember, the fate of Middle-earth rests in our hands, and we must not falter.\n\nYours sincerely,\nFrodo",
        sentTime: new Date("2025-05-06T12:00:00Z")
    },
    {
        author: "Hermione Granger",
        subject: "Study Group Meeting",
        content: "Hi everyone,\n\nDon't forget about our study group meeting in the library. We need to prepare for the upcoming exams, and there's a lot to cover. From potion-making to transfiguration, it's essential that we master each subject to excel in our studies. Bring your wand and your textbooks, and let's make sure we're ready for whatever challenges the exams may present. Remember, knowledge is power, and together we can achieve great things.\n\nWarm regards,\nHermione",
        sentTime: new Date("2025-05-06T13:00:00Z")
    },
    {
        author: "Rick Sanchez",
        subject: "Interdimensional Adventures",
        content: "Hey Morty,\n\nWe need to go on another adventure. Pack your stuff and meet me in the garage. It's gonna be wild! This time, we're heading to Dimension C-137, where things are about to get really interesting. I've been working on a new portal gun that allows us to travel between dimensions with unprecedented ease. But that's not all—I've also developed a new serum that enhances our cognitive abilities, allowing us to solve complex problems in record time. As we embark on this journey, it's important to remember that the multiverse is vast and unpredictable. We must be prepared for anything, from hostile alien species to bizarre alternate realities. Our mission is to gather data on the unique phenomena occurring in Dimension C-137, and to bring back samples for further analysis. This is a once-in-a-lifetime opportunity, Morty, and we can't afford to miss it. So gear up, and let's make history!\n\nCheers,\nRick",
        sentTime: new Date("2025-05-06T14:00:00Z")
    }
];

export default function MainContent() {
    const [selectedEmail, setSelectedEmail] = useState<EmailItem|undefined>(undefined);
    return (
        <div className="main-content">
            <MainContentTabs/>
            <MainToolbar/>
            <EmailList emails={emails} selectedEmail={selectedEmail} onSelectedEmailChange={(value) => setSelectedEmail(value)}/>
            <EmailPreview noEmails={emails.length === 0} email={selectedEmail}/>
        </div>
    );
}