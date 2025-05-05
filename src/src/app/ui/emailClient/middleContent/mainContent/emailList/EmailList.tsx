"use client"
import {
    Toolbar,
    Card,
    AccordionItem,
    Accordion,
    TabList, Tab, ToolbarButton,
    Text,
    AccordionHeader,
} from "@fluentui/react-components";
import {
    ArchiveRegular,
    ArrowSortRegular,
    FilterRegular,
    ChevronDownRegular
} from "@fluentui/react-icons";
import './EmailList.scss'

export default function EmailList() {
    return (
        <Card className="email-list">
            <div className="header">
                <Toolbar>
                    <TabList defaultSelectedValue="tab1">
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
            </div>
        </Card>
    );
}