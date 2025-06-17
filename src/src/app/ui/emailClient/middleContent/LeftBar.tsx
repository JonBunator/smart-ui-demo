import Image from 'next/image'
import "./LeftBar.scss"
import {Tab, TabList} from "@fluentui/react-tabs";
import { AppFolderRegular } from '@fluentui/react-icons';

export default function LeftBar() {
    return (
        <TabList className="left-bar" selectedValue="tab1" vertical>
            <Tab icon={<Image src="/image/emailClient/leftBarMail.svg" alt="email" width="20" height="20"/>} value="tab1"></Tab>
            <Tab icon={<Image src="/image/emailClient/leftBarCalendar.svg" alt="calendar" width="20" height="20"/>} value="tab2"></Tab>
            <Tab icon={<Image src="/image/emailClient/leftBarCheck.png" alt="check" width="20" height="20"/>} value="tab3"></Tab>
            <Tab icon={<Image src="/image/emailClient/leftBarCloud.svg" alt="cloud" width="20" height="20"/>} value="tab4"></Tab>
            <Tab icon={<AppFolderRegular/>} value="tab5"></Tab>
        </TabList>
    );
}