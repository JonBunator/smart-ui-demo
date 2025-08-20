"use client"
import {Avatar, Text,} from "@fluentui/react-components";

import './EmailListItem.scss'
import {useState} from "react";
import {EmailItem} from "@/app/ui/emailClient/utils/types";
import {toLocaleTimeNoSeconds} from "@/app/ui/emailClient/utils/utils";

export interface EmailListItemProps {
    email: EmailItem;
    selected: boolean;
    onClick: () => void;
}

export default function EmailListItem(props: EmailListItemProps) {
    const {email, selected, onClick} = props;
    const [unread, setUnread] = useState(true);

    function handleClick() {
        setUnread(false);
        onClick();
    }

    return (
        <div className={`email-list-item${unread ? " unread" : ""}${selected ? " selected" : ""}`}
             onClick={handleClick}>
            <Avatar color="colorful" size={32} name={email.author}/>
            <div>
                <Text>{email.author}</Text>
                <div className="second-line">
                    <Text className="ellipsis-text">{email.subject}</Text>
                    <Text>{toLocaleTimeNoSeconds(email.sentTime)}</Text>
                </div>
                <div className="third-line">
                    <Text className="ellipsis-text">{email.content}</Text>
                </div>
            </div>
        </div>
    );
}