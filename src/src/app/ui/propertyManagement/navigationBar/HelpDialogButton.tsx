"use client"
import {Button} from "@mui/material";
import {useSurveyManager} from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function HelpDialogButton() {
    const {showHelpDialog} = useSurveyManager();
    return (
        <Button startIcon={<QuestionMarkIcon/>} size="small" variant="contained" color="warning"
                onClick={() => showHelpDialog(true)} disableElevation>
            Hilfe
        </Button>
    );
}