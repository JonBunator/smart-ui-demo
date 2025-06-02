import PropertyManagement from "@/app/ui/propertyManagement/PropertyManagement";
import EmailClient from "@/app/ui/emailClient/EmailClient";
import "./App.scss"
import DebugButtons from "./DebugButtons";

export default function App({children,}: { children: React.ReactNode; }) {
  return (
      <div className="app-layout">
        <PropertyManagement>
          {children}
        </PropertyManagement>
        <EmailClient/>
        {process.env.NODE_ENV === 'development' && <DebugButtons />}
      </div>
  );
}
