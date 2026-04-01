import DataTableCell from "./DataTableCell";
import type {DataTableCellSetProps} from "./types";

export default function DataTableRowCellSet<T = unknown>({fields, row}:DataTableCellSetProps<T>) {
    return (
        <>
            {fields
                .map((field, index) => (
                    <DataTableCell key={String(field?.id ?? index)} field={field} row={row}/>
                ))}
        </>
    )
}
