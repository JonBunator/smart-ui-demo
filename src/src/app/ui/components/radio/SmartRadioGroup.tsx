import {RadioGroup, RadioGroupProps} from "@mui/material";
import React, {createContext, useCallback, useContext, useMemo, useState} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";

export type SmartRadioProps = RadioGroupProps & SmartComponentElementProps;

interface SmartRadioGroupContextType {
    /**
     * Fake radio value. Used in suggested changes state.
     */
    fakeValue: any
    /**
     * Change fake value.
     * @param value The newly set fake value.
     */
    changeFakeValue: (value: any) => void
    /**
     * Set value after suggested changes were approved.
     */
    approvedValue: any
    /**
     * Handles approved value change.
     */
    changeApproved: (value: any) => void
}

const SmartRadioGroupContext = createContext<SmartRadioGroupContextType | undefined>(undefined);

export default function SmartRadioGroup(props: SmartRadioProps) {
    const {id, smartSemantic, value, children, ...otherProps} = props;
    const [fakeValue, setFakeValue] = useState(undefined);
    const [approvedValue, setApprovedValue] = useState(undefined);

    const handleApprove = useCallback((value: any) => {
        setApprovedValue(value);
        setFakeValue(undefined);
    }, []);

    const contextValue = useMemo(() => ({
        fakeValue,
        changeFakeValue: setFakeValue,
        approvedValue,
        changeApproved: handleApprove,
    }), [fakeValue, approvedValue, handleApprove]);


    return (
        <SmartComponent type="radio-group" id={id} semantic={smartSemantic}>
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