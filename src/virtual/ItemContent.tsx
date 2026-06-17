import {DataTableRowCellSet, useTableFields} from "../index";
import type {ReactNode} from "react";

export interface ItemContentProps<T = unknown> {
    row: T;
    renderRow?: (row: T) => ReactNode;
}

export default function ItemContent<T = unknown>({row, renderRow}: ItemContentProps<T>) {
    const [tableFields] = useTableFields<T>()

    if (renderRow) {
        return renderRow(row);
    }

    return (
        <DataTableRowCellSet fields={tableFields} row={row}/>
    )
}
