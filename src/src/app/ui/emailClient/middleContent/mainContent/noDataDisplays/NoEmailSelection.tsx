import {Text} from "@fluentui/react-components";
import Image from "next/image";
import "./NoData.scss"

export default function NoEmailSelection() {

    return (
        <div className="no-email-selection">
            <Image priority={false} className="image-dark" src="/emailClient/nothingSelectedDark.svg" alt="no-selection" width="200" height="200"/>
            <Image priority={false} className="image-light" src="/emailClient/nothingSelectedLight.svg" alt="no-selection" width="200" height="200"/>
            <Text className="text-main">Zu lesendes Element auswählen</Text>
            <Text className="text-underline">Es wurde keine Auswahl vorgenommen.</Text>
        </div>
    );
}