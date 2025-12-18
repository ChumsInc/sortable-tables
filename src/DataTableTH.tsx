import React from "react";
import type {DataTableTHProps} from "./types";
import clsx from "clsx";


export default function DataTableTH<T = unknown>({
                                      field,
                                      className,
                                      children,
                                      ...rest
                                  }: DataTableTHProps<T>) {
    const thClassName = clsx({[`text-${field.align}`]: !!field.align}, className);
    return (
        <th className={thClassName} scope="col" {...rest}>
            {children ?? field.title}
        </th>
    )
}
DataTableTH.displayName = 'DataTableTH';
