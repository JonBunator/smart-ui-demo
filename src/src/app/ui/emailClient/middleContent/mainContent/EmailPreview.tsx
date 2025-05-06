"use client"
import {
    Card,
    Avatar,
    Text,
    Toolbar, ToolbarButton, ToolbarDivider
} from "@fluentui/react-components";
import {EmailItem} from "@/app/ui/emailClient/logic/EmailItem";
import './EmailPreview.scss'
import {
    ArrowForwardRegular, ArrowReplyAllRegular, ArrowReplyRegular,
    WeatherSunnyRegular,
    MoreHorizontalRegular,
    EmojiRegular,
} from "@fluentui/react-icons";

export interface EmailPreviewProps {
    email?: EmailItem
}

export default function EmailPreview(props: EmailPreviewProps) {
    const {email} = props;

    return (
        <Card className="email-preview">
            {email !== undefined ?
                (<>
                <div className="header">
                    <Avatar color="colorful" size={40} name={email.author}/>
                    <div className="header-content">
                        <div className="first-line">
                            <Text>{email.author}</Text>
                            <Toolbar>
                                <ToolbarButton icon={<WeatherSunnyRegular className="blue-icon"/>}></ToolbarButton>
                                <ToolbarButton icon={<EmojiRegular className="blue-icon"/>}></ToolbarButton>
                                <ToolbarButton icon={<ArrowReplyRegular className="purple-icon"/>}></ToolbarButton>
                                <ToolbarButton icon={<ArrowReplyAllRegular className="purple-icon"/>}></ToolbarButton>
                                <ToolbarButton icon={<ArrowForwardRegular className="blue-icon"/>}></ToolbarButton>
                                <ToolbarDivider />
                                <ToolbarButton icon={<MoreHorizontalRegular/>}></ToolbarButton>
                            </Toolbar>
                        </div>
                        <div className="second-line">
                            <Text>An: <b>Ferienhäuservermietung GmbH</b></Text>
                            <Text className="date">
                                {email.sentTime.toLocaleString()}
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="email-content">
                    {email.content}
                </div>
            </>)
                :
                <></>}
        </Card>
    );
}