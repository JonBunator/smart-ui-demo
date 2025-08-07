"use client"
import {
    ElementPropsType,
    TextElementType
} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {TextField} from "@mui/material";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import { useQuestionsParser } from "../QuestionsParser";

interface TextElementProps<T> extends ElementPropsType<T> {
    element: TextElementType
}

export default function TextElement<T>(props: TextElementProps<T>) {
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
        if(element.notRequired) {
            return false;
        }
        const error = value === "";
        setError(error);
        return error;
    }, [element.notRequired, value]);

    useEffect(() => {
        const unsubscribe = subscribe(validate);
        return () => unsubscribe();
    }, [subscribe, validate]);

    return (
        <TextField
            name={name}
            multiline={element.rows === undefined || element.rows > 1}
            rows={element.rows}
            variant="filled"
            label={element.label}
            required={!(element.notRequired === true)}
            value={value}
            onChange={handleChange}
            fullWidth
            error={error}
            helperText={error ? "Feld ist erforderlich" : ""}
        />
    );
}