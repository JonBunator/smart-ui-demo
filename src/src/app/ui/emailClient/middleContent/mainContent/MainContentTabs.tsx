import "./MainContentTabs.scss"
import {Tab, TabList} from "@fluentui/react-tabs";
import {Button} from "@fluentui/react-components";
import {NavigationRegular} from "@fluentui/react-icons";

export default function MainContentTabs() {
    return (
        <div className="main-content-tabs">
            <Button appearance="subtle" icon={<NavigationRegular/>}></Button>
            <TabList selectedValue="tab1">
                <Tab value="tab1">Startseite</Tab>
                <Tab value="tab2">Ansicht</Tab>
                <Tab value="tab3">Hilfe</Tab>
            </TabList>
        </div>
    );
}