import React from "react";
import DataTableTH from "./DataTableTH";
import classNames from "classnames";
import {DataTableHeadProps} from "./types";


export default function DataTableHead<T = unknown>({fields, ...rest}: DataTableHeadProps<T>) {
    return (
        <thead {...rest}>
        <tr>
            {fields.map((field, index) => (
                <DataTableTH key={field.id ?? index}
                             {...field.thProps}
                             field={field}
                             className={classNames(
                                 typeof field.className === 'function'
                                     ? {[`text-${field.align}`]: !!field.align}
                                     : field.className
                             )}/>
            ))}
        </tr>
        </thead>
    )
}

