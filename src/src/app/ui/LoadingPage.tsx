import { CircularProgress, Typography } from "@mui/material";
import "./LoadingPage.scss"

export default function DebugButtons() {

    return (
        <div className="loading-page">
            <CircularProgress size={48}/>
            <Typography>Lädt...</Typography>
        </div>
    );
};