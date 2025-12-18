import React, {type ChangeEvent, useId} from 'react';
import type {RowsPerPageProps} from "./types";
import clsx from "clsx";

const defaultRowsPerPageValues: number[] = [10, 25, 50, 100, 250, 500, 1000];

export default function RowsPerPage({
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
    const selectClassName = className ?? clsx('form-select', {[`form-select-${size}`]: !!size});
    const inputGroupClassName = clsx('input-group', {
        [`input-group-${size}`]: !!size,
    })

    return (
        <div className={inputGroupClassName} key={value}>
            <label className="input-group-text" htmlFor={id}>{label ?? 'Rows'}</label>
            <select className={selectClassName} id={id}
                    value={value} onChange={changeHandler} {...rest}>
                {pageValues.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        </div>
    )
}
RowsPerPage.displayName = 'RowsPerPage';
