import React, {ChangeEvent} from 'react';
import classNames from "classnames";
import {RowsPerPageProps} from "./types";

export const defaultRowsPerPageValues: number[] = [10, 25, 50, 100, 250, 500, 1000];


function RowsPerPage({
                         value,
                         pageValues = defaultRowsPerPageValues,
                         size,
                         className,
                         onChange,
                         ...rest
                     }: RowsPerPageProps) {
    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => onChange(Number(ev.target.value));

    const selectClassName = className ?? classNames('form-select', {[`form-select-${size}`]: !!size});

    return (
        <select value={value} onChange={changeHandler} className={selectClassName} {...rest}>
            {pageValues.map(value => (
                <option key={value} value={value}>{value}</option>
            ))}
        </select>
    )
}

RowsPerPage.displayName = 'RowsPerPage';
export default RowsPerPage;
