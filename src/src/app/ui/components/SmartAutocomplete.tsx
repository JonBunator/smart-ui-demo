import {Autocomplete, AutocompleteProps, } from "@mui/material";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {SmartComponent, SmartComponentElementProps, ValueType} from "smart-ui";

export type SmartAutocompleteProps<Value> = AutocompleteProps<Value, undefined, undefined, undefined> & SmartComponentElementProps;

export default function SmartSelect<Value,>(props: SmartAutocompleteProps<Value>) {
    const {id, smartSemantic, value, options, getOptionLabel, ...otherProps} = props;
    const [optionValue, setOptionValue] = useState(value);

    useEffect(() => {
        setOptionValue(value);
    }, [value]);

    const getLabel = useCallback((option: Value): string => {
        if(getOptionLabel) {
            return getOptionLabel(option);
        }
        return (option as {label?: string})?.label ?? '';
    }, [getOptionLabel]);

    const updateValue = useCallback((newValue: ValueType) => {
        const newOption = options.filter((option) => getLabel(option) === newValue)[0];
        if(newOption) {
            setOptionValue(newOption);
        }
    }, [getLabel, options]);

    const smartOptions = useMemo(() => {
        return options.map((option) => ({ value: getLabel(option) }));
    }, [getLabel, options]);



    return (
        <SmartComponent type="select" id={id} semantic={smartSemantic} options={smartOptions} value={getLabel(value as Value)} smartOnChange={updateValue}>
            <Autocomplete id={id}
                          value={optionValue}
                          options={options}
                          getOptionLabel={getOptionLabel}
                          {...otherProps}>
            </Autocomplete>

            <button onClick={() => updateValue("Dog")}>test</button>
        </SmartComponent>

    );
}