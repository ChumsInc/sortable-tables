import React from "react";
import SortableTableTH from "./SortableTableTH";
import classNames from "classnames";
import {SortableTableHeadProps} from "./types";


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
                                 className={classNames(
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
