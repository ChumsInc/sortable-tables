import React from "react";
import DataTableTH from "./DataTableTH";
import type {DataTableHeadProps} from "./types";
import clsx from "clsx";


function DataTableHead<T = unknown>({fields, ...rest}: DataTableHeadProps<T>) {
    return (
        <thead {...rest}>
        <tr>
            {fields.map((field, index) => (
                <DataTableTH key={field.id ?? index}
                             {...field.thProps}
                             field={field}
                             className={clsx(
                                 typeof field.className === 'function'
                                     ? {[`text-${field.align}`]: !!field.align}
                                     : field.className
                             )}/>
            ))}
        </tr>
        </thead>
    )
}

DataTableHead.displayName = 'DataTableHead';
export default DataTableHead;
