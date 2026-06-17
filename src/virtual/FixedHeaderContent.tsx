import {useTableFields} from "../useTableFields";
import {useTableSort} from "../useTableSort";
import clsx from "clsx";
import SortableTableTH from "../SortableTableTH";
import type {SortProps} from "chums-types";

export default function FixedHeaderContent<T = unknown>({onChangeSort}: {
    onChangeSort: (sort: SortProps<T>) => void;
}) {
    const [fields] = useTableFields<T>();
    const [sort] = useTableSort<T>();

    return (
        <tr>
            {fields.map((tableField, index) => (
                <SortableTableTH<T> key={index} field={tableField}
                                    sorted={sort?.field === tableField.field} ascending={sort?.ascending}
                                    className={clsx(
                                        typeof tableField.className === 'function'
                                            ? {[`text-${tableField.align}`]: !!tableField.align}
                                            : tableField.className
                                    )} onClick={onChangeSort}/>
            ))}
        </tr>
    )
}
