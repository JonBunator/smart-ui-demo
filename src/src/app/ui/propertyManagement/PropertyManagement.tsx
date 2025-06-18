import {Paper} from "@mui/material";
import NavigationBar from "@/app/ui/propertyManagement/navigationBar/NavigationBar";
import StartSurveyDialog from "@/app/ui/propertyManagement/dialogs/StartSurveyDialog";
import StartUseCaseDialog from "@/app/ui/propertyManagement/dialogs/StartUseCaseDialog";
import "./PropertyManagement.scss"

interface PropertyManagementProps {
    children: React.ReactNode;
    agent?: React.ReactNode;
}

export default function PropertyManagement(props: PropertyManagementProps) {
    const {children, agent} = props;
    return (
        <>
            <div className="property-management">
                <NavigationBar/>
                <div className="property-management-content">
                    <Paper className="property-management-content-container">
                        {children}
                    </Paper>
                    {agent}
                </div>

            </div>
            <StartSurveyDialog/>
            <StartUseCaseDialog/>
        </>
    );
}