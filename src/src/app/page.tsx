import Content from "@/app/ui/Content";
import EmailApp from "@/app/ui/emailClient/EmailApp";
import "./page.scss"

export default function Home() {
  return (
      <div className="layout">
        <Content/>
        <EmailApp darkTheme={true}/>
      </div>
  );
}
