import App from "@/app/ui/App";
import AgentContainer from "@/app/ui/propertyManagement/agent/AgentContainer";

export default function SurveyLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <App agent={<AgentContainer/>}>
            {children}
        </App>
    );
}
