"use client"
import {
    ElementPropsType, MultipleChoiceElementType,
} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {Autocomplete, TextField, FormControl, FormHelperText} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import { useQuestionsParser } from "../QuestionsParser";
import "./MultipleChoiceElement.scss"

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

    const handleChange = (newValue: string | null) => {
        onValuesChange({...values, [name]: newValue});
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
        <Autocomplete
            className="multiple-choice-element"
            options={element.labels}
            value={value ?? null}
            onChange={(_event, value) => handleChange(value)}
            fullWidth
            renderInput={(params) => <TextField {...params}
                                                variant="filled"
                                                required
                                                fullWidth
                                                label={element.label}
                                                placeholder="Wählen Sie eine Option aus"
                                                error={error}
                                                helperText={error ? "Feld ist erforderlich" : ""}/>}
        />
    );
}