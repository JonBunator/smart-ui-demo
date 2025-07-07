"use client"
import {
    ElementPropsType, CheckboxesElementType,
} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {ChangeEvent} from "react";

interface CheckboxesElementProps<T> extends ElementPropsType<T> {
    element: CheckboxesElementType;
}

export default function CheckboxesElement<T>(props: CheckboxesElementProps<T>) {
    const {element, values, onValuesChange} = props;
    const name = element.name;
    // @ts-expect-error values is used as generic type
    const value = values[name] ?? Array(element.labels.length).fill(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        value[index] = event.target.checked;
        onValuesChange({...values, [name]: value});
    }

    return (
        <FormGroup row>
            {element.labels.map((label, index) => (
                <FormControlLabel key={index} control={<Checkbox value={value[index]} onChange={(event) => handleChange(event, index)}/>} label={label} />
            ))}
        </FormGroup>
    );
}