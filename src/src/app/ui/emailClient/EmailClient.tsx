"use client"
import TopBar from "@/app/ui/emailClient/TopBar";
import MiddleContent from "@/app/ui/emailClient/middleContent/MiddleContent";
import {FluentProvider, webDarkTheme, webLightTheme} from '@fluentui/react-components';
import "./EmailClient.scss"

export interface EmailClientProps {
    darkTheme: boolean;
}

export default function EmailClient(props: EmailClientProps) {
    const {darkTheme = true} = props;

    return (
        <FluentProvider theme={darkTheme ? webDarkTheme : webLightTheme}>
            <div className={`email-client ${darkTheme ? "dark" : "light"}`}>
                <TopBar/>
                <MiddleContent/>
            </div>
        </FluentProvider>
    );
}