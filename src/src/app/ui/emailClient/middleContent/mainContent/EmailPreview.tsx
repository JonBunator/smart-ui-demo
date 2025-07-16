import {
    Card,
    Avatar,
    Text,
    Toolbar, ToolbarButton, ToolbarDivider, Button
} from "@fluentui/react-components";
import './EmailPreview.scss'
import {
    ArrowForwardRegular, ArrowReplyAllRegular, ArrowReplyRegular,
    WeatherSunnyRegular,
    MoreHorizontalRegular,
    EmojiRegular,
} from "@fluentui/react-icons";
import NoEmailSelection from "@/app/ui/emailClient/middleContent/mainContent/noDataDisplays/NoEmailSelection";
import {toLocaleTimeNoSeconds} from "@/app/ui/emailClient/utils/utils";
import {EmailItem} from "@/app/ui/emailClient/utils/types";
import React from "react";

export interface EmailPreviewProps {
    email?: EmailItem
    noEmails: boolean
}

export default function EmailPreview(props: EmailPreviewProps) {
    const {email, noEmails} = props;

    return (
        <div className="email-preview">
            {email !== undefined ?
                (<div className="email-preview-container">
                    <Card>
                        <Text className="subject">{email.subject}</Text>
                    </Card>
                    <Card>
                        <div className="header">
                            <Avatar color="colorful" size={40} name={email.author}/>
                            <div className="header-content">
                                <div className="first-line">
                                    <div className="author">
                                        <Text>{email.author}</Text>
                                        <Text className="author-email">&lt;{email.authorEmail}&gt;</Text>
                                    </div>
                                    <Toolbar>
                                        <ToolbarButton className="hide-1" icon={<WeatherSunnyRegular className="blue-icon"/>}></ToolbarButton>
                                        <ToolbarButton className="hide-1" icon={<EmojiRegular className="blue-icon"/>}></ToolbarButton>
                                        <ToolbarButton className="hide-2" icon={<ArrowReplyRegular className="purple-icon"/>}></ToolbarButton>
                                        <ToolbarButton className="hide-2" icon={<ArrowReplyAllRegular className="purple-icon"/>}></ToolbarButton>
                                        <ToolbarButton className="hide-2" icon={<ArrowForwardRegular className="blue-icon"/>}></ToolbarButton>
                                        <ToolbarDivider className="hide-2" />
                                        <ToolbarButton icon={<MoreHorizontalRegular/>}></ToolbarButton>
                                    </Toolbar>
                                </div>
                                <div className="second-line">
                                    <Text>An: <Text className="recipient">Ferienhäuservermietung GmbH</Text></Text>
                                    <Text className="date hide-3">
                                        {email.sentTime.toLocaleDateString() + " " + toLocaleTimeNoSeconds(email.sentTime)}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className="email-content">
                            {email.content}
                        </div>
                        <div className="button-container">
                            <Button icon={<ArrowReplyRegular className="purple-icon"/>}>Antworten</Button>
                            <Button icon={<ArrowForwardRegular className="blue-icon"/>}>Weiterleiten</Button>
                        </div>
                    </Card>
                </div>)
                :
                (noEmails ?
                    <></>
                    :
                    <NoEmailSelection />
                )
            }
        </div>

    );
}