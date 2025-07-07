"use client"
import {
    ElementPropsType, MultipleChoiceElementType,
} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {RadioGroup, Typography, FormControlLabel, Radio, FormControl, FormHelperText} from "@mui/material";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import { useQuestionsParser } from "../QuestionsParser";

interface MultipleChoiceElementProps<T> extends ElementPropsType<T> {
    element: MultipleChoiceElementType;
}

export default function MultipleChoiceElement<T>(props: MultipleChoiceElementProps<T>) {
    const {element, values, onValuesChange} = props;
    const [error, setError] = useState(false);
    const {subscribe} = useQuestionsParser();
    const name = element.name;
    // @ts-expect-error values is used as generic type
    const value = values[name] ?? null;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onValuesChange({...values, [name]: Number(event.target.value)});
        setError(false);
    }

    const validate = useCallback(() => {
        const error = value === null;
        setError(error);
        return error;
    }, [value]);

    useEffect(() => {
        const unsubscribe = subscribe(validate);
        return () => unsubscribe();
    }, [subscribe, validate]);
    
    return (
        <FormControl required error={error}>
            <RadioGroup
                row
                value={value}
                onChange={handleChange}
            >
                {element.labels.map((label, index) => (
                    <FormControlLabel key={index} value={index} control={<Radio />} label={label} />
                ))}
            </RadioGroup>
            {error && <FormHelperText>Auswahl ist erforderlich</FormHelperText>}
        </FormControl>
    );
}