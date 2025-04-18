import {Button, ButtonProps} from "@mui/material";
import React from "react";
import {SmartComponentElementProps} from "smart-ui/src/components/types/types";
import {SmartButton as SmartButtonBase} from "smart-ui";

export type SmartButtonProps = ButtonProps & SmartComponentElementProps;

export default function SmartTextField(props: SmartButtonProps) {
    return (
        <Button {...props} component={SmartButtonBase}/>
    );
}