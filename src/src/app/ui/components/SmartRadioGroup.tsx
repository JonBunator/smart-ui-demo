import {RadioGroup, RadioGroupProps} from "@mui/material";
import React, {createContext, useContext, useEffect, useMemo} from "react";
import {SmartComponent, SmartComponentElementProps} from "smart-ui";

export type SmartRadioProps = RadioGroupProps & SmartComponentElementProps;

interface SmartRadioGroupContextType {
    /**
     * Value of the RadioGroup.
     */
    radioGroupValue: any
}

const SmartRadioGroupContext = createContext<SmartRadioGroupContextType | undefined>(undefined);

export default function SmartRadioGroup(props: SmartRadioProps) {
    const {id, smartSemantic, value, children, ...otherProps} = props;

    useEffect(() => {
       console.log("value CHANGES")
    }, [value]);

    const contextValue = useMemo(() => ({
        radioGroupValue: value
    }), [value]);


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