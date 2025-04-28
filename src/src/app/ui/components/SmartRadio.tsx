import {RadioProps, Radio} from "@mui/material";
import React, {useCallback, useRef} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";
import {ValueType} from "smart-ui/src/utils/types";

export type SmartRadioProps = RadioProps & SmartComponentElementProps;

export default function SmartRadio(props: SmartRadioProps) {
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
        <SmartComponent type="radio" id={id} semantic={smartSemantic} value={checked} smartOnChange={updateValue}>
            <Radio
                id={id}
                slotProps={{
                    input:{ref:inputRef}
                }}
                checked={checked}
                {...otherProps}/>
        </SmartComponent>
    );
}