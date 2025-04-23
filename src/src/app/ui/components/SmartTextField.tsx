import {InputBaseComponentProps, TextField, TextFieldProps} from "@mui/material";
import React, {ElementType, forwardRef} from "react";
import {SmartInput, SmartComponentElementProps} from "smart-ui";

export type SmartTextFieldProps = TextFieldProps & SmartComponentElementProps;

const MuiSmartInput = forwardRef<HTMLInputElement, SmartTextFieldProps>(
    (props, ref) => {
        return (
            <SmartInput ref={ref} {...props} />
        )
    },
)

export default function SmartTextField(props: SmartTextFieldProps) {
    const {smartSemantic, ...other} = props;
    return (
        <TextField
            {...other}
            slotProps={{
                input: {
                    inputComponent: MuiSmartInput as ElementType<InputBaseComponentProps>,
                    inputProps: {
                        smartSemantic: smartSemantic
                    }
                },
            }}
        />
    );
}