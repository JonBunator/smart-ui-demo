import {CheckboxProps, Checkbox} from "@mui/material";
import React, {useCallback, useRef} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";
import {ValueType} from "smart-ui/src/utils/types";

export type SmartCheckboxProps = CheckboxProps & SmartComponentElementProps;

export default function SmartCheckbox(props: SmartCheckboxProps) {
    const {id, smartSemantic, checked, ...otherProps} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const updateValue = useCallback((newValue: ValueType) => {
        if (inputRef.current) {
            if(checked !== newValue) {
                inputRef.current.click();
            }
        }
    }, [checked]);

    return (
        <SmartComponent type="checkbox" id={id} semantic={smartSemantic} value={checked} smartOnChange={updateValue}>
            <Checkbox
                id={id}
                slotProps={{
                    input:{ref:inputRef}
                }}
                checked={checked}
                {...otherProps}/>
        </SmartComponent>
    );
}