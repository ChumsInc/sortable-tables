import {useTableFields} from "./useTableFields";

export default function DataTableCols<T = unknown>() {
    const [fields] = useTableFields<T>()
    return (
        <colgroup>
            {fields
                .filter(field => field.visible !== false)
                .map((field, index) => (
                    <col key={index}
                         className={field.colClassName}
                         span={field.colSpan ?? 1}/>
                ))}
        </colgroup>
    )
}
DataTableCols.displayName = 'DataTableCols';

