import React, {type MouseEvent} from 'react';
import type {DataTableField, DataTableRowProps} from "./types";
import DataTableCell from "./DataTableCell";
import clsx from "clsx";
import {useTableFields} from "./useTableFields";

export interface StandaloneDataTableRowProps<T = unknown> extends DataTableRowProps<T> {
    fields: DataTableField<T>[]
}

export default function StandaloneDataTableRow<T = unknown>({
                                                                fields,
                                                                className,
                                                                rowClassName,
                                                                selected,
                                                                row,
                                                                trRef,
                                                                onClick,
                                                                ...rest
                                                            }: StandaloneDataTableRowProps<T>) {
    const clickHandler = (ev: MouseEvent<HTMLTableRowElement>) => {
        onClick?.(row, ev)
    }

    const _className = typeof rowClassName === 'function' ? rowClassName(row) : rowClassName;
    if (!row) {
        return null;
    }

    return (
        <tr ref={trRef}
            className={clsx({'table-active': selected}, className, _className)}
            onClick={clickHandler}
            {...rest}>
            {fields
                .map((field, index) => (
                    <DataTableCell key={String(field?.id ?? index)} field={field} row={row}/>
                ))}
        </tr>
    )
}
StandaloneDataTableRow.displayName = 'StandaloneDataTableRow';
