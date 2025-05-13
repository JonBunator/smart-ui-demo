import PropertyManagement from "@/app/ui/propertyManagement/PropertyManagement";
import EmailClient from "@/app/ui/emailClient/EmailClient";
import "./App.scss"

export default function App({children,}: { children: React.ReactNode; }) {
  return (
      <div className="app-layout">
        <PropertyManagement>
          {children}
        </PropertyManagement>
        <EmailClient/>
      </div>
  );
}
