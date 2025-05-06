"use client"
import {
    Toolbar,
    Card,
    TabList, Tab, ToolbarButton,
    Text,
} from "@fluentui/react-components";
import {
    ArchiveRegular,
    ArrowSortRegular,
    FilterRegular,
    ChevronDownRegular
} from "@fluentui/react-icons";
import EmailListItem from "@/app/ui/emailClient/middleContent/mainContent/emailList/EmailListItem";
import './EmailList.scss'
import {EmailItem} from "@/app/ui/emailClient/logic/EmailItem";

export interface EmailListItemProps {
    emails: EmailItem[];
    selectedEmail?: EmailItem;
    onSelectedEmailChange: (selectedEmail: EmailItem) => void;
}
export default function EmailList(props: EmailListItemProps) {
    const {emails, selectedEmail, onSelectedEmailChange} = props;
    return (
        <Card className="email-list">
            <div className="header">
                <Toolbar>
                    <TabList selectedValue="tab1">
                        <Tab value="tab1">Relevant</Tab>
                        <Tab value="tab2">Sonstige</Tab>
                    </TabList>
                    <ToolbarButton icon={<ArchiveRegular/>}></ToolbarButton>
                    <ToolbarButton icon={<FilterRegular />}></ToolbarButton>
                    <ToolbarButton icon={<ArrowSortRegular />}></ToolbarButton>
                </Toolbar>


            </div>
            <div className="emails">
                <div className="email-group">
                    <ChevronDownRegular/>
                    <Text>Heute</Text>
                </div>
                {emails.map((email, index) => (
                    <EmailListItem key={index} email={email} selected={selectedEmail === email} onClick={() => onSelectedEmailChange(email)}/>
                ))}
            </div>
        </Card>
    );
}