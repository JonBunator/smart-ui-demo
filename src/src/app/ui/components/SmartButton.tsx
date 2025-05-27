import {Button, ButtonProps} from "@mui/material";
import React from "react";
import {SmartButton as SmartButtonBase, SmartComponentElementProps} from "smart-ui";

export type SmartButtonProps = ButtonProps & SmartComponentElementProps;

export default function SmartButton(props: SmartButtonProps) {
    const {...otherProps} = props;
    return (
        <Button
            {...otherProps}
            component={SmartButtonBase}/>
    );
}