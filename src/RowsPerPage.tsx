import React, {ChangeEvent, useId} from 'react';
import classNames from "classnames";
import {RowsPerPageProps} from "./types";

export const defaultRowsPerPageValues: number[] = [10, 25, 50, 100, 250, 500, 1000];


function RowsPerPage({
                         value,
                         pageValues = defaultRowsPerPageValues,
                         size,
                         label,
                         className,
                         onChange,
                         ...rest
                     }: RowsPerPageProps) {
    const id = useId();
    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => onChange(Number(ev.target.value));
    const selectClassName = className ?? classNames('form-select', {[`form-select-${size}`]: !!size});
    const inputGroupClassName = classNames('input-group', {
        [`input-group-${size}`]: !!size,
    })

    return (
        <div className={inputGroupClassName} key={value}>
            <label className="input-group-text" htmlFor={id}>{label ?? 'Rows'}</label>
            <select value={value} onChange={changeHandler} className={selectClassName} {...rest}>
                {pageValues.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        </div>
    )
}

RowsPerPage.displayName = 'RowsPerPage';
export default RowsPerPage;
