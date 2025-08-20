import {Avatar, Button, SearchBox, Text} from "@fluentui/react-components";
import './TopBar.scss'
import {AlertRegular, CalendarCheckmarkRegular, GridDotsFilled, SettingsRegular} from "@fluentui/react-icons";

export default function TopBar() {
    return (
        <div className="top-bar">
            <div className="left-part">
                <Button icon={<GridDotsFilled/>} appearance="subtle"></Button>
                <Text className="title">Inlook</Text>
            </div>
            <SearchBox placeholder="Suchen"/>
            <div>
                <Button icon={<CalendarCheckmarkRegular/>} appearance="subtle"></Button>
                <Button icon={<AlertRegular/>} appearance="subtle"></Button>
                <Button icon={<SettingsRegular/>} appearance="subtle"></Button>
                <Avatar/>
            </div>
        </div>
    );
}