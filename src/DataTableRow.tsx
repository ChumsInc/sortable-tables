import React, {type MouseEvent} from 'react';
import type {DataTableRowProps} from "./types";
import DataTableCell from "./DataTableCell";
import clsx from "clsx";
import {useTableFields} from "./useTableFields";


export default function DataTableRow<T = unknown>({
                                       className,
                                       rowClassName,
                                       selected,
                                       row,
                                       trRef,
                                       onClick,
                                       ...rest
                                   }: DataTableRowProps<T>) {
    const [fields] = useTableFields<T>()
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
            {fields.map((field, index) => (<DataTableCell key={String(field?.id ?? index)} field={field} row={row}/>))}
        </tr>
    )
}
DataTableRow.displayName = 'DataTableRow';
