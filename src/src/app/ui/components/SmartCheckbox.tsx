import {CheckboxProps, Checkbox} from "@mui/material";
import React, {useCallback, useRef} from "react";
import {SmartComponent, ValueType, SmartComponentElementProps} from "smart-ui";

export type SmartCheckboxProps = CheckboxProps & SmartComponentElementProps;

export default function SmartCheckbox(props: SmartCheckboxProps) {
    const {id, smartSemantic, checked, className, ...otherProps} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const updateValue = useCallback(async (newValue: ValueType) => {
        if (inputRef.current) {
            if(checked !== newValue) {
                inputRef.current.click();
                return true;
            }
        }
        return false;
    }, [checked]);

    return (
        <SmartComponent type="checkbox" id={id} semantic={smartSemantic} value={checked} smartOnChange={updateValue}>
            <Checkbox
                id={id}
                className={`${className} smart-component`}
                slotProps={{
                    input:{ref:inputRef}
                }}
                checked={checked}
                {...otherProps}/>
        </SmartComponent>
    );
}