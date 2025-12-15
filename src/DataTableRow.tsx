import React, {MouseEvent} from 'react';
import type {DataTableRowProps} from "./types";
import DataTableCell from "./DataTableCell";
import clsx from "clsx";


function DataTableRow<T = unknown>({
                                       className,
                                       rowClassName,
                                       selected,
                                       fields,
                                       row,
                                       trRef,
                                       onClick,
                                       ...rest
                                   }: DataTableRowProps<T>) {
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
            {fields.map((field, index) => (<DataTableCell key={index} field={field} row={row}/>))}
        </tr>
    )
}

DataTableRow.displayName = 'DataTableRow';
export default DataTableRow;
