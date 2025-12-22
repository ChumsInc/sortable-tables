import {createElement, type ReactNode} from 'react';
import type {DataTableCellProps} from "./types";
import clsx from "clsx";


export default function DataTableCell<T = unknown>({field, row, className, as, ...rest}: DataTableCellProps<T>) {
    if (field.visible === false) {
        return null;
    }
    const cellClassName = clsx(
        {[`text-${field.align}`]: !!field.align},
        className,
        typeof field.className === 'function' ? field.className(row) : field.className
    );
    return createElement(
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
DataTableCell.displayName = 'DataTableCell';
