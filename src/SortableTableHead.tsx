import React from "react";
import SortableTableTH from "./SortableTableTH";
import type {SortableTableHeadProps} from "./types";
import clsx from "clsx";


function SortableTableHead<T = unknown>({
                                            currentSort,
                                            fields,
                                            onChangeSort,
                                        }: SortableTableHeadProps<T>) {
    const {field, ascending} = currentSort;
    return (
        <thead>
        <tr>
            {fields.map((tableField, index) => (
                <SortableTableTH<T> key={index} field={tableField}
                                    sorted={field === tableField.field} ascending={ascending}
                                    className={clsx(
                                        typeof tableField.className === 'function'
                                            ? {[`text-${tableField.align}`]: !!tableField.align}
                                            : tableField.className
                                    )} onClick={onChangeSort}/>
            ))}
        </tr>
        </thead>
    )
}

SortableTableHead.displayName = 'SortableTableHead';
export default SortableTableHead;
