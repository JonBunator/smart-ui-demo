import {RadioProps, Radio} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";
import {ValueType} from "smart-ui/src/utils/types";

export type SmartRadioProps = RadioProps & SmartComponentElementProps;

export default function SmartRadio(props: SmartRadioProps) {
    const {id, smartSemantic, checked, className, ...otherProps} = props;
    const [radioValue, setRadioValue] = useState<boolean|undefined>(checked);

    useEffect(() => {
        setRadioValue(checked);
    }, [checked]);

    const updateValue = useCallback(async (newValue: ValueType) => {
        setRadioValue(newValue === true);
    }, []);

    return (
        <SmartComponent type="radio" id={id} semantic={smartSemantic} value={radioValue} smartOnChange={updateValue}>
            <Radio
                className={`${className} smart-component`}
                id={id}
                checked={radioValue}
                {...otherProps}/>
        </SmartComponent>
    );
}