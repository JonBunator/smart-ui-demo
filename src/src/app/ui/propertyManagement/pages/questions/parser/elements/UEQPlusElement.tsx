"use client"
import {
    ElementPropsType, UEQPlusElementType,
} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import {Radio, FormControl, TableBody, Table, TableRow, TableCell, FormHelperText} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import { useQuestionsParser } from "../QuestionsParser";
import "./UEQPlusElement.scss"

interface UEQPlusElementProps<T> extends ElementPropsType<T> {
    element: UEQPlusElementType;
}

export default function UEQPlusElement<T>(props: UEQPlusElementProps<T>) {
    const {element, values, onValuesChange} = props;
    const [error, setError] = useState(false);
    const {subscribe} = useQuestionsParser();
    const name = element.name;
    // @ts-expect-error values is used as generic type
    const value = values[name] ?? Array(element.labels.length).fill(null);

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

    return (
        <FormControl required error={error} className="ueqplus-element">
            <Table size="small">
                <TableBody>
                    {element.labels.map((labelTuple, row) => (
                        <TableRow key={row}>
                            <TableCell component="th" scope="row">
                                {labelTuple[0]}
                            </TableCell>
                            {Array.from({ length: element.scaleSize }, (_, column) => (
                                <TableCell key={column} align="center">
                                    <Radio checked={isChecked(column, row)} onChange={(_event, checked) => handleChange(checked, column, row)} />
                                </TableCell>
                            ))}
                            <TableCell component="th" scope="row">
                                {labelTuple[1]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {error && <FormHelperText>Auswahl ist für alle Zeilen erforderlich</FormHelperText>}
        </FormControl>
    );
}