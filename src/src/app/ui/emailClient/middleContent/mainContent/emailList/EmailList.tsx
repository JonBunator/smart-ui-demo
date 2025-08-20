import {Card, Tab, TabList, Text, Toolbar, ToolbarButton,} from "@fluentui/react-components";
import {ArchiveRegular, ArrowSortRegular, ChevronDownRegular, FilterRegular} from "@fluentui/react-icons";
import EmailListItem from "@/app/ui/emailClient/middleContent/mainContent/emailList/EmailListItem";
import './EmailList.scss'
import NoEmails from "../noDataDisplays/NoEmails";
import {EmailItem} from "@/app/ui/emailClient/utils/types";

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
                    <ToolbarButton className="hide" icon={<FilterRegular/>}></ToolbarButton>
                    <ToolbarButton className="hide" icon={<ArrowSortRegular/>}></ToolbarButton>
                </Toolbar>


            </div>
            {emails.length > 0 ?
                <div className="emails">
                    <div className="email-group">
                        <ChevronDownRegular/>
                        <Text>Heute</Text>
                    </div>
                    {emails.map((email) => (
                        <EmailListItem key={email.id} email={email} selected={selectedEmail === email}
                                       onClick={() => onSelectedEmailChange(email)}/>
                    ))}
                </div>
                :
                <NoEmails/>
            }
        </Card>
    );
}