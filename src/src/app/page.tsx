import Content from "@/app/ui/Content";
import EmailClient from "@/app/ui/emailClient/EmailClient";
import "./page.scss"

export default function Home() {
  return (
      <div className="layout">
        <Content/>
        <EmailClient darkTheme={true}/>
      </div>
  );
}
