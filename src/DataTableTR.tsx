import {type MouseEvent} from 'react';
import type {DataTableTRProps} from "./types";
import clsx from "clsx";

export default function DataTableTR<T = unknown>({
                                                     className,
                                                     rowClassName,
                                                     selected,
                                                     row,
                                                     trRef,
                                                     onClick,
                                                     children,
                                                     ...rest
                                                 }: DataTableTRProps<T>) {
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
            {children}
        </tr>
    )
}
DataTableTR.displayName = 'DataTableTR';
