"use client"
import {
    ElementPropsType, MultipleChoiceGridElementType,
} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {Radio, FormControl, TableBody, Table, TableRow, TableHead, TableCell, FormHelperText} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import { useQuestionsParser } from "../QuestionsParser";

interface MultipleChoiceGridElementProps<T> extends ElementPropsType<T> {
    element: MultipleChoiceGridElementType;
}

export default function MultipleChoiceGridElement<T>(props: MultipleChoiceGridElementProps<T>) {
    const {element, values, onValuesChange} = props;
    const [error, setError] = useState(false);
    const {subscribe} = useQuestionsParser();
    const name = element.name;
    // @ts-expect-error values is used as generic type
    const value = values[name] ?? Array(element.yAxisLabels.length).fill(null);

    const handleChange = (checked: boolean, column: number, row: number) => {
        if(checked) {
            value[row] = column;
        }
        onValuesChange({...values, [name]: value});
        setError(false);
    }

    const validate = useCallback(() => {
        const error = value.some((val: boolean | null) => val === null);
        setError(error);
        return error;
    }, [value]);

    useEffect(() => {
        const unsubscribe = subscribe(validate);
        return () => unsubscribe();
    }, [subscribe, validate]);

    function isChecked(column: number, row: number) {
        return value[row] === null ? false: value[row] === column;
    }

    const headerRow = (
        <TableRow>
            <TableCell/>
            {element.xAxisLabels.map((label, index) => (
                <TableCell key={index} align="center"><b>{label}</b></TableCell>
            ))}
        </TableRow>
    );

    return (
        <FormControl required error={error} sx={{display: 'flex'}}>
            <Table size="small">
                <TableHead>
                    {headerRow}
                </TableHead>
                <TableBody>

                    {element.yAxisLabels.map((label, row) => (
                        <React.Fragment key={row}>
                            {row % 6 === 0 && row !== 0 && headerRow}
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ maxWidth: 300 }}>
                                    {label}
                                </TableCell>
                                {Array.from({ length: element.xAxisLabels.length }, (_, column) => (
                                    <TableCell key={column} align="center">
                                        <Radio checked={isChecked(column, row)} onChange={(_event, checked) => handleChange(checked, column, row)} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            {error && <FormHelperText>Auswahl ist für alle Zeilen erforderlich</FormHelperText>}
        </FormControl>
    );
}