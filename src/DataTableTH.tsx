import React from "react";
import classNames from "classnames";
import {DataTableTHProps} from "./types";


function DataTableTH<T = unknown>({
                                                     field,
                                                     className,
                                                     children,
                                                     ...rest
                                                 }: DataTableTHProps<T>) {
    const thClassName = classNames({[`text-${field.align}`]: !!field.align}, className);
    return (
        <th className={thClassName} scope="col" {...rest}>
            {children ?? field.title}
        </th>
    )
}
DataTableTH.displayName = 'DataTableTH';
export default DataTableTH;
