import {Button, ButtonProps} from "@mui/material";
import React from "react";
import {SmartButton as SmartButtonBase, SmartButtonElementProps} from "smart-ui";

export type SmartButtonProps = ButtonProps & SmartButtonElementProps;

export default function SmartButton(props: SmartButtonProps) {
    const {...otherProps} = props;
    return (
        <Button
            {...otherProps}
            // @ts-expect-error TODO fix library type mismatch
            component={SmartButtonBase}/>
    );
}