"use client"
import TopBar from "@/app/ui/emailClient/TopBar";
import "./EmailClient.scss"
import MiddleContent from "@/app/ui/emailClient/middleContent/MiddleContent";
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';

export default function EmailClient() {
    return (
        <FluentProvider theme={webDarkTheme}>
            <div className="email-client">
                <TopBar/>
                <MiddleContent/>
            </div>
        </FluentProvider>
    );
}