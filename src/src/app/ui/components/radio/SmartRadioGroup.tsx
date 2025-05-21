import {RadioGroup, RadioGroupProps} from "@mui/material";
import React, {createContext, useCallback, useContext, useMemo, useState} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";

export type SmartRadioProps = RadioGroupProps & SmartComponentElementProps;

interface SmartRadioGroupContextType {
    /**
     * Value of the radio group.
     */
    radioGroupValue: unknown
    /**
     * Fake radio value. Used in suggested changes state.
     */
    fakeValue: unknown
    /**
     * Change fake value.
     * @param value The newly set fake value.
     */
    changeFakeValue: (value: unknown) => void
    /**
     * Set value after suggested changes were approved.
     */
    approvedValue: unknown
    /**
     * Handles approved value change.
     */
    changeApproved: (value: unknown) => void
}

const SmartRadioGroupContext = createContext<SmartRadioGroupContextType | undefined>(undefined);

export default function SmartRadioGroup(props: SmartRadioProps) {
    const {id, smartSemantic, value, children, ...otherProps} = props;
    const [fakeValue, setFakeValue] = useState<unknown>(undefined);
    const [approvedValue, setApprovedValue] = useState<unknown>(undefined);

    const handleApprove = useCallback((value: unknown) => {
        setApprovedValue(value);
        setFakeValue(undefined);
    }, []);

    const handleFakeValueSet = useCallback((value: unknown) => {
        setFakeValue(value);
    }, []);

    const contextValue = useMemo(() => ({
        radioGroupValue: value,
        fakeValue,
        changeFakeValue: handleFakeValueSet,
        approvedValue,
        changeApproved: handleApprove,
    }), [value, fakeValue, handleFakeValueSet, approvedValue, handleApprove]);


    return (
        <SmartComponent type="radio-group" id={id} semantic={smartSemantic} value={value}>
            <SmartRadioGroupContext.Provider value={contextValue}>
                <RadioGroup id={id} {...otherProps} value={value}>
                    {children}
                </RadioGroup>
            </SmartRadioGroupContext.Provider>
        </SmartComponent>
    );
}

export function useSmartRadioGroup(): SmartRadioGroupContextType {
    const context = useContext(SmartRadioGroupContext);
    if (!context) {
        throw new Error('SmartRadio must be used within a SmartRadioGroup');
    }
    return context;
}