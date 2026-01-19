import {type TableHTMLAttributes} from "react";
import DataTableTH from "./DataTableTH";
import clsx from "clsx";
import {useTableFields} from "./useTableFields";


export default function DataTableHead<T = unknown>({...rest}: TableHTMLAttributes<HTMLTableSectionElement>) {
    const [fields] = useTableFields<T>()
    return (
        <thead {...rest}>
        <tr>
            {fields
                .map((field, index) => (
                <DataTableTH key={String(field.id ?? index)}
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
