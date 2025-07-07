"use client"
import {
    ElementPropsType,
    TextareaElementType
} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {TextField} from "@mui/material";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import { useQuestionsParser } from "../QuestionsParser";

interface TextareaElementProps<T> extends ElementPropsType<T> {
    element: TextareaElementType
}

export default function TextareaElement<T>(props: TextareaElementProps<T>) {
    const {element, values, onValuesChange} = props;
    const [error, setError] = useState(false);
    const {subscribe} = useQuestionsParser();
    const name = element.name;
    // @ts-expect-error values is used as generic type
    const value = values[name] ?? "";

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onValuesChange({...values, [name]: event.target.value});
        setError(false);
    }

    const validate = useCallback(() => {
        const error = value === "";
        setError(error);
        return error;
    }, [value]);

    useEffect(() => {
        const unsubscribe = subscribe(validate);
        return () => unsubscribe();
    }, [subscribe, validate]);

    return (
        <TextField
            name={name}
            multiline
            variant="filled"
            value={value}
            onChange={handleChange}
            fullWidth
            required
            error={error}
            helperText={error ? "Feld ist erforderlich" : ""}
        />
    );
}