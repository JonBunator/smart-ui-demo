import {RadioGroup, RadioGroupProps} from "@mui/material";
import React, {createContext, useCallback, useContext, useEffect, useMemo, useRef} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";
/* eslint-disable @typescript-eslint/no-explicit-any */

export type SmartRadioProps = RadioGroupProps & SmartComponentElementProps & {
    /**
     * If callback is not set, the radios can't be reset when suggested value changes of AI agent are denied.
     * This callback is called when radios should be reverted to previous value.
     * @param value The previous value.
     */
    onResetRadios?: (value: any) => void;
};

interface SmartRadioGroupContextType {
    onResetRadios: () => void;
    onValueChange: (newValue: any) => void;
    radioGroupValue: any;
}

const SmartRadioGroupContext = createContext<SmartRadioGroupContextType | undefined>(undefined);

export default function SmartRadioGroup(props: SmartRadioProps) {
    const {id, smartSemantic, value, onResetRadios, children, ...otherProps} = props;
    const previousValue = useRef(undefined);
    const changedValue = useRef(undefined);

    const handleReset = useCallback(() => {
        if(onResetRadios === undefined) {
            console.warn("Radio can't be unchecked by AI agent because onUnchecked callback is not set.")
        } else {
            if(value === changedValue.current) {
                onResetRadios(previousValue.current);
            }
        }
        previousValue.current = undefined;
        changedValue.current = undefined;
    }, [onResetRadios, value]);

    const handleValueChange = useCallback((newValue: any) => {
        previousValue.current = value;
        changedValue.current = newValue;
    }, [value]);

    const contextValue = useMemo(() => ({
        onResetRadios: handleReset,
        onValueChange: handleValueChange,
        radioGroupValue: value
    }), [handleReset, handleValueChange, value]);

    return (
        <SmartComponent type="radio-group" id={id} semantic={smartSemantic} required={true}>
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