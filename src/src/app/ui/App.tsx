import PropertyManagement from "@/app/ui/propertyManagement/PropertyManagement";
import EmailClient from "@/app/ui/emailClient/EmailClient";
import "./App.scss"
import DebugButtons from "./DebugButtons";
import SurveyManagerProvider from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";

export default function App({children,}: { children: React.ReactNode; }) {
  return (
      <SurveyManagerProvider>
          <div className="app-layout">
            <PropertyManagement>
              {children}
            </PropertyManagement>
            <EmailClient/>
              {//process.env.NODE_ENV === 'development' && <DebugButtons />
                  }
              <DebugButtons />
          </div>
      </SurveyManagerProvider>
  );
}
