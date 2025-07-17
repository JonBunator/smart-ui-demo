import {RadioProps, Radio} from "@mui/material";
import React, {useCallback, useRef} from "react";
import {SmartComponent, ValueType, SmartComponentElementProps} from "smart-ui";
import { useSmartRadioGroup } from "./SmartRadioGroup";
import "./SmartRadio.scss"

export type SmartRadioProps = RadioProps & SmartComponentElementProps;

export default function SmartRadio(props: SmartRadioProps) {
    const {id, smartSemantic, checked, value, className, ...otherProps} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const {onValueChange, onReset, radioGroupValue} = useSmartRadioGroup();

    const updateValue = useCallback(async (newValue: ValueType) => {
        if(newValue) {
            onValueChange(value);
            if(inputRef.current) {
                inputRef.current.click();
            }
        }
        return true;
    }, [onValueChange, value]);

    const handleApprove = useCallback(async (accept: boolean) => {
        if(!accept) {
            onReset();
        }
    }, [onReset]);

    return (
        <SmartComponent type="radio" id={id} semantic={smartSemantic} value={checked ?? radioGroupValue === value} smartOnChange={updateValue} onApprove={handleApprove}>
                <Radio
                    className={`${className} smart-component`}
                    id={id}
                    slotProps={{
                        input:{ref:inputRef}
                    }}
                    value={value}
                    checked={checked}
                    {...otherProps}/>
        </SmartComponent>
    );
}