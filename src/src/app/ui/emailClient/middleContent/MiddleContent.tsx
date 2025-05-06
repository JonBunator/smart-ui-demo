import LeftBar from "./LeftBar";
import MainContent from "@/app/ui/emailClient/middleContent/mainContent/MainContent";
import "./MiddleContent.scss"

export default function MiddleContent() {
    return (
        <div className="middle-content">
            <LeftBar/>
            <MainContent/>
        </div>
    );
}