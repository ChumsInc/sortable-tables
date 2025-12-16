import React from 'react';
import type {SortableTableProps} from "./types";
import TableProvider from "./TableProvider";
import SortableTableWithContext from "./SortableTableWithContext";


function SortableTable<T = unknown>({
                                        fields,
                                        ...rest
                                    }: SortableTableProps<T>) {
    return (
        <TableProvider initialFields={fields}>
            <SortableTableWithContext {...rest}/>
        </TableProvider>
    )
}

SortableTable.displayName = 'SortableTable';
export default SortableTable;
