"use client"
import {ElementPropsType, SliderElementType} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {FormControl, FormHelperText, Slider, Typography} from "@mui/material";
import "./SliderElement.scss"
import React, {useCallback, useEffect, useState} from "react";
import {useQuestionsParser} from "@/app/ui/propertyManagement/pages/questions/parser/QuestionsParser";

interface SliderElementProps<T> extends ElementPropsType<T> {
    element: SliderElementType
}

export default function SliderElement<T>(props: SliderElementProps<T>) {
    const {element, values, onValuesChange} = props;
    const [error, setError] = useState(false);
    const {subscribe} = useQuestionsParser();
    const name = element.name;

    const handleChange = (newValue: number) => {
        onValuesChange({...values, [name]: newValue});
        setError(false);
    }

    const validate = useCallback(() => {
        // @ts-expect-error values is used as generic type
        const error = values[name] === undefined;
        setError(error);
        return error;
    }, [name, values]);

    useEffect(() => {
        const unsubscribe = subscribe(validate);
        return () => unsubscribe();
    }, [subscribe, validate]);

    return (
        <FormControl required error={error} className="slider-element">
            <div className="slider-row">
                <Typography variant="body1">{element.startLabel}</Typography>
                <Slider onChangeCommitted={(_event, value) => handleChange(value)} defaultValue={50}
                        valueLabelDisplay="auto"/>
                <Typography variant="body1">{element.endLabel}</Typography>
            </div>
            {error && <FormHelperText>Bitte passen Sie den Schieberegler entsprechend an. Wenn Sie den Wert 50 auswählen
                möchten, bewegen Sie den Regler zunächst kurz und stellen ihn dann wieder auf 50
                zurück.</FormHelperText>}
        </FormControl>
    );
}