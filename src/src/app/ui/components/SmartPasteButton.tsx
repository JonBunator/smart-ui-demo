import {Button, ButtonProps} from "@mui/material";
import React, {useState} from "react";
import {useSmartAgent} from "smart-ui";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function SmartPasteButton(props: ButtonProps) {
    const {onClick, loading, className, startIcon, variant, ...otherProps} = props;
    const [isLoading, setIsLoading] = useState(false);
    const {sendEvent} = useSmartAgent();

    async function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onClick?.(event);
        setIsLoading(true);
        let clipboardText = '';
        try {
            clipboardText = await navigator.clipboard.readText();
        } catch (error) {
            console.error('Failed to read clipboard contents: ', error);
            setIsLoading(false);
            return;
        }
        if (clipboardText.trim() !== '') {
            await sendEvent("The following text was pasted from the clipboard. If the query makes no sense, ask the user whether they have inadvertently pasted the wrong text.\n" + clipboardText, 1, "Intelligentes Ausfüllen wird verarbeitet");
        }
        setIsLoading(false);
    }

    return (
        <Button {...otherProps}
                className={`${className} smart-paste-button`}
                variant={variant ?? "contained"}
                startIcon={startIcon ?? <AutoAwesomeIcon/>}
                onClick={handleClick} loading={loading ?? isLoading}/>
    );
}