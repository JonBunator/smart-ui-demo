import {RadioProps, Radio} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";
import {ValueType} from "smart-ui";
import { useSmartRadioGroup } from "./SmartRadioGroup";

export type SmartRadioProps = RadioProps & SmartComponentElementProps;

export default function SmartRadio(props: SmartRadioProps) {
    const {id, smartSemantic, checked, value, className, ...otherProps} = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [fakeRadio, setFakeRadio] = useState(false);
    const [fakeRadioChecked, setFakeRadioChecked] = useState(false);

    const {radioGroupValue} = useSmartRadioGroup();

    const updateValue = useCallback(async (newValue: ValueType) => {
        setFakeRadio(newValue === true);
        setFakeRadioChecked(newValue === true);
        console.log("update", newValue);
    }, []);

    const handleApprove = useCallback(async (accept: boolean) => {
        console.log("approve", fakeRadioChecked);
        if(!accept) {
            return;
        }
        if(inputRef.current) {
            if (fakeRadioChecked) {
                inputRef.current.click();
            }
        }
        setFakeRadio(false);
        setFakeRadioChecked(false)
    }, [fakeRadioChecked]);

    useEffect(() => {
        if (value !== radioGroupValue) {
            setFakeRadioChecked(false);
            console.log("trig", value, radioGroupValue);

        }
    }, [radioGroupValue, value]);

    useEffect(() => {
        console.log("fakeRadio", value, fakeRadio)
    }, [fakeRadio]);

    useEffect(() => {
        console.log("fakeRadioChecked", value, fakeRadioChecked)
    }, [fakeRadioChecked]);

    useEffect(() => {
        console.log("checked", value, checked)
    }, [checked]);

    function handleClick(event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        console.log("clicked")
        setFakeRadioChecked(!fakeRadioChecked)
    }

    return (
        <SmartComponent type="radio" id={id} semantic={smartSemantic} value={checked} smartOnChange={updateValue} onApprove={handleApprove}>
            {fakeRadio &&
                <Radio
                    className={`${className} smart-component`}
                    id={id + "-fake"}
                    checked={fakeRadioChecked}
                    onClick={(event) => handleClick(event)}
                    name={id + "-fake"}
                />
            }
                <Radio
                    className={`${className} smart-component`}
                    style={{display: fakeRadio ? "none" : "inline"}}
                    id={id}
                    slotProps={{
                        input:{ref:inputRef}
                    }}
                    value={value}
                    checked={checked}
                    onClick={() => console.log("clicked real one")}
                    {...otherProps}/>
        </SmartComponent>
    );
}