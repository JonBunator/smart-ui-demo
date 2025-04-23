import {Button, ButtonProps} from "@mui/material";
import React from "react";
import {SmartButton as SmartButtonBase, SmartComponentElementProps} from "smart-ui";

export type SmartButtonProps = ButtonProps & SmartComponentElementProps;

export default function SmartButton(props: SmartButtonProps) {
    return (
        <Button {...props} component={SmartButtonBase}/>
    );
}