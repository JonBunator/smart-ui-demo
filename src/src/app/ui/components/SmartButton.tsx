import {Button, ButtonProps} from "@mui/material";
import React from "react";
import {SmartButton as SmartButtonBase} from "smart-ui";
import {SmartComponentElementProps} from "smart-ui/types";

export type SmartButtonProps = ButtonProps & SmartComponentElementProps;

export default function SmartButton(props: SmartButtonProps) {
    const {...otherProps} = props;
    return (
        <Button
            {...otherProps}
            component={SmartButtonBase}/>
    );
}