import {Text} from "@fluentui/react-components";
import Image from "next/image";
import "./NoData.scss"

export default function NoEmails() {

    return (
        <div className="no-email-selection">
            <Image className="image-dark" src="/emailClient/noEmailsDark.svg" alt="no-selection" width="200" height="200"/>
            <Image className="image-light" src="/emailClient/noEmailsLight.svg" alt="no-selection" width="200" height="200"/>
            <Text className="text-main">Alles erledigt für heute</Text>
            <Text className="text-underline">Genießen sie Ihren leeren Posteingang.</Text>
        </div>
    );
}