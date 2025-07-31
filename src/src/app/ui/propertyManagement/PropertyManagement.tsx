import {Paper} from "@mui/material";
import NavigationBar from "@/app/ui/propertyManagement/navigationBar/NavigationBar";
import StartSurveyDialog from "@/app/ui/propertyManagement/dialogs/StartSurveyDialog";
import SurveyStepDescriptionDialog from "@/app/ui/propertyManagement/dialogs/surveyStepsDescriptions/SurveyStepDescriptionDialog";
import "./PropertyManagement.scss"
import NoMoreDataDialog from "@/app/ui/propertyManagement/dialogs/NoMoreDataDialog";

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
            <SurveyStepDescriptionDialog/>
            <NoMoreDataDialog/>
        </>
    );
}