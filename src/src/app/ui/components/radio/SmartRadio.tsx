import {RadioProps, Radio} from "@mui/material";
import React, {useCallback, useEffect, useRef} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";
import {ValueType} from "smart-ui";
import { useSmartRadioGroup } from "./SmartRadioGroup";
import "./SmartRadio.scss"

export type SmartRadioProps = RadioProps & SmartComponentElementProps;

export default function SmartRadio(props: SmartRadioProps) {
    const {id, smartSemantic, checked, value, className, ...otherProps} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const {radioGroupValue, fakeValue, approvedValue, changeApproved, changeFakeValue} = useSmartRadioGroup();

    const updateValue = useCallback(async (newValue: ValueType) => {
        if(newValue === true) {
            changeFakeValue(value);
        }
        return true;
    }, [changeFakeValue, value]);

    const handleApprove = useCallback(async (accept: boolean) => {
        //Approve changes when approved or suggested changes were changed
        changeApproved((fakeValue !== value || accept) ? fakeValue : undefined);
    }, [changeApproved, fakeValue, value]);

    useEffect(() => {
        if(approvedValue !== undefined && approvedValue === value) {
            changeApproved(undefined);
            if(inputRef.current) {
                inputRef.current.click();
            }
        }
    }, [approvedValue, changeApproved, changeFakeValue, value]);

    function handleClick(event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        // preventDefault is used here to prevent triggering update changes in the radio group.
        event.preventDefault();
        changeFakeValue(value);
    }

    return (
        <SmartComponent type="radio" id={id} semantic={smartSemantic} value={checked ?? value === radioGroupValue} smartOnChange={updateValue} onApprove={handleApprove} noResetAfterDeny>
            {fakeValue !== undefined &&
                <Radio
                    className={`${className} smart-component`}
                    id={id + "-fake"}
                    checked={fakeValue === value}
                    onClick={(event) => handleClick(event)}
                />
            }
                <Radio
                    className={`${className} smart-component${fakeValue ? " smart-radio-hide" : ""}`}
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