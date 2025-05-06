import TopBar from "@/app/ui/emailClient/TopBar";
import MiddleContent from "@/app/ui/emailClient/middleContent/MiddleContent";
import "./EmailClient.scss"

export default function EmailClient() {

    return (
        <div className="email-client">
            <TopBar/>
            <MiddleContent/>
        </div>
    );
}