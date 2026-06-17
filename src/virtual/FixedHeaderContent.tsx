import {useTableFields} from "../useTableFields";
import {useTableSort} from "../useTableSort";
import clsx from "clsx";
import SortableTableTH from "../SortableTableTH";

export default function FixedHeaderContent<T = unknown>() {
    const [fields] = useTableFields<T>();
    const [sort, setSort] = useTableSort<T>();

    return (
        <tr>
            {fields.map((tableField, index) => (
                <SortableTableTH<T> key={index} field={tableField}
                                    sorted={sort?.field === tableField.field} ascending={sort?.ascending}
                                    className={clsx(
                                        typeof tableField.className === 'function'
                                            ? {[`text-${tableField.align}`]: !!tableField.align}
                                            : tableField.className
                                    )} onClick={setSort}/>
            ))}
        </tr>
    )
}
