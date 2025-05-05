"use client"
import "./MainContent.scss"
import MainContentTabs from "@/app/ui/emailClient/middleContent/mainContent/MainContentTabs";
import MainToolbar from "@/app/ui/emailClient/middleContent/mainContent/MainToolbar";
import EmailList from "@/app/ui/emailClient/middleContent/mainContent/emailList/EmailList";
import EmailPreview from "@/app/ui/emailClient/middleContent/mainContent/EmailPreview";

export default function MainContent() {
    return (
        <div className="main-content">
            <MainContentTabs/>
            <MainToolbar/>
            <EmailList/>
            <EmailPreview/>
        </div>
    );
}