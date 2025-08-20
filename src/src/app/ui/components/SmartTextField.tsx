import {InputBaseComponentProps, TextField, TextFieldProps} from "@mui/material";
import React, {ElementType, forwardRef} from "react";
import {SmartComponentElementProps, SmartInput, SmartTextarea} from "smart-ui";

export type SmartTextFieldProps = TextFieldProps & SmartComponentElementProps;

const MuiSmartInput = forwardRef<HTMLInputElement, SmartTextFieldProps>(
    (props, ref) => {
        return (
            // @ts-expect-error TODO fix library type mismatch
            <SmartInput ref={ref} {...props} />
        )
    },
)

const MuiSmartTextarea = forwardRef<HTMLTextAreaElement, SmartTextFieldProps>(
    (props, ref) => {
        return (
            // @ts-expect-error TODO fix library type mismatch
            <SmartTextarea ref={ref} {...props} />
        )
    },
)

export default function SmartTextField(props: SmartTextFieldProps) {
    const {smartSemantic, multiline, label, ...other} = props;
    return (
        <TextField
            {...other}
            label={label}
            multiline={multiline}
            slotProps={{
                input: {
                    inputComponent: (multiline ? MuiSmartTextarea : MuiSmartInput) as ElementType<InputBaseComponentProps>,
                    inputProps: {
                        smartSemantic: smartSemantic,
                        label: label,
                    }
                },
            }}
        />
    );
}