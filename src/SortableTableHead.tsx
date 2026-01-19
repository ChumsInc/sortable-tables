import SortableTableTH from "./SortableTableTH";
import type {SortableTableHeadProps} from "./types";
import clsx from "clsx";
import {useTableFields} from "./useTableFields";
import {useTableSort} from "./useTableSort";

export default function SortableTableHead<T = unknown>({
                                            onChangeSort,
                                        }: SortableTableHeadProps<T>) {
    const [fields] = useTableFields<T>()
    const [sort] = useTableSort<T>();
    return (
        <thead>
        <tr>
            {fields
                .map((tableField, index) => (
                <SortableTableTH<T> key={index} field={tableField}
                                    sorted={sort?.field === tableField.field} ascending={sort?.ascending}
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

