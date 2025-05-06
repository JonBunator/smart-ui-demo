"use client"
import {FluentProvider, webDarkTheme, webLightTheme} from '@fluentui/react-components';
import EmailClient from "@/app/ui/emailClient/EmailClient";

export interface EmailAppProps {
    darkTheme: boolean
}

export default function EmailApp(props: EmailAppProps) {
    const {darkTheme = true} = props;

    return (
        <FluentProvider theme={darkTheme ? webDarkTheme : webLightTheme} className={`${darkTheme} ? "dark" : "light"`}>
            <EmailClient/>
        </FluentProvider>
    );
}