"use client"
import {
    Text,
    Avatar,
} from "@fluentui/react-components";

import './EmailListItem.scss'
import {EmailItem} from "@/app/ui/emailClient/logic/EmailItem";
import {useState} from "react";

export interface EmailListItemProps {
    email: EmailItem;
    selected: boolean;
    onClick: () => void;
}

function formatTimeToHHMM(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}

export default function EmailListItem(props: EmailListItemProps) {
    const {email, selected, onClick} = props;
    const [unread, setUnread] = useState(true);

    function handleClick() {
        setUnread(false);
        onClick();
    }

    return (
        <div className={`email-list-item${unread ? " unread" : ""}${selected ? " selected" : ""}`} onClick={handleClick}>
            <Avatar color="colorful" size={32} name={email.author}/>
            <div>
                <Text>{email.author}</Text>
                <div className="second-line">
                    <Text className="ellipsis-text">{email.subject}</Text>
                    <Text>{formatTimeToHHMM(email.sentTime)}</Text>
                </div>
                <div className="third-line">
                    <Text className="ellipsis-text">{email.content}</Text>
                </div>
            </div>
        </div>
    );
}