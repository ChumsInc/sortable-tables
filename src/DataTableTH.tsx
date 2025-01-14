import React from "react";
import classNames from "classnames";
import {DataTableTHProps} from "./types";


export default function DataTableTH<T = unknown>({
                                                     field,
                                                     className,
                                                     children,
                                                     ...rest
                                                 }: DataTableTHProps<T>) {
    const thClassName = classNames({[`text-${field.align}`]: !!field.align}, className);
    return (
        <th className={thClassName} {...rest}>
            {children ?? field.title}
        </th>
    )
}
