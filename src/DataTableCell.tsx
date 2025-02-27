import React, {ReactNode} from 'react';
import {DataTableCellProps} from "./types";
import classNames from "classnames";

export default function DataTableCell<T = unknown>({field, row, className, as, ...rest}:DataTableCellProps<T>) {
    const cellClassName = classNames(
        {[`text-${field.align}`]: !!field.align},
        className,
        typeof field.className === 'function' ? field.className(row) : field.className
    );
    return React.createElement(
        (as ?? field.as) ?? 'td',
        {
            className: cellClassName,
            scope: (as ?? field.as) === 'th' ? 'row' : undefined,
            colSpan: field.colSpan,
            ...field.cellProps,
            ...rest
        },
        (row[field.field] === undefined && !field.render)
            ? null
            : (
                typeof field.render === 'function'
                    ? field.render(row)
                    : row[field.field] as ReactNode
            )
    )
}
