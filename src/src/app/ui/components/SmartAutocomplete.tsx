import {Autocomplete, AutocompleteProps, } from "@mui/material";
import React, {useCallback, useMemo, useRef, useState, useEffect} from "react";
import {SmartComponent, sleep, SmartComponentElementProps, ValueType} from "smart-ui";

export type SmartAutocompleteProps<Value> = AutocompleteProps<Value, undefined, undefined, undefined> & SmartComponentElementProps;

export default function SmartSelect<Value,>(props: SmartAutocompleteProps<Value>) {
    const {id, smartSemantic, value, options, getOptionLabel, className, renderInput, ...otherProps} = props;
    const [isRequired, setIsRequired] = useState(false);
    const autocompleteRef = useRef<HTMLDivElement>(null);

    const getLabel = useCallback((option: Value): string => {
        if(getOptionLabel) {
            return getOptionLabel(option);
        }
        return (option as {label?: string})?.label ?? '';
    }, [getOptionLabel]);

    const updateValue = useCallback(async (newValue: ValueType) => {
        //Check if label exists
        const newOption = options.some((option) => getLabel(option) === newValue);
        if(!newOption && newValue !== '') {
            console.warn(`Option "${newValue}" does not exist in autocomplete.`)
            return false;
        }

        if(autocompleteRef.current) {
            autocompleteRef.current.click();
            const inputElement = autocompleteRef.current.querySelector('input');
            if(!inputElement) {
                return false;
            }
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value")?.set;
            nativeInputValueSetter?.call(inputElement, newValue);

            const event = new Event('input', { bubbles: true });
            inputElement.dispatchEvent(event);
            await sleep(10);
            const inputID = inputElement.getAttribute('id');
            const listElement = document.querySelectorAll(`ul[id="${inputID}-listbox"]`)[0];
            const optionElement: HTMLDivElement | null = listElement?.querySelector('li[data-option-index="0"]');

            if(optionElement) {
                optionElement.click();
            }
            inputElement.blur();
            return true;
        }
        return false;
    }, [getLabel, options]);

    const smartOptions = useMemo(() => {
        return options.map((option) => ({ value: getLabel(option) }));
    }, [getLabel, options]);

    useEffect(() => {
        console.log(autocompleteRef.current.querySelector('input'))
        if (autocompleteRef.current) {
            const inputElement = autocompleteRef.current.querySelector('input');
            if (inputElement) {
                console.log(inputElement.required)
                setIsRequired(inputElement.required);
            }
        }
    }, [autocompleteRef]);

    return (
        <SmartComponent type="select" id={id} semantic={smartSemantic} options={smartOptions} value={getLabel(value as Value)} smartOnChange={updateValue} required={isRequired}>
            <Autocomplete id={id}
                          disablePortal
                          className={`${className} smart-component`}
                          value={value}
                          options={options}
                          getOptionLabel={getOptionLabel}
                          ref={autocompleteRef}
                          renderInput={renderInput}
                          {...otherProps}>
            </Autocomplete>
        </SmartComponent>

    );
}