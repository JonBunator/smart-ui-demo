import {CircularProgress, Typography} from "@mui/material";
import "./LoadingPage.scss"

export default function LoadingPage() {

    return (
        <div className="loading-page">
            <CircularProgress size={48}/>
            <Typography>Lädt...</Typography>
        </div>
    );
};