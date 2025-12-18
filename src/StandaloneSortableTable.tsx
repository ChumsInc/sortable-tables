import React from 'react';
import type {SortableTableProps} from "./types";
import DataTableProvider from "./DataTableProvider";
import SortableTable from "./SortableTable";


export default function StandaloneSortableTable<T = unknown>({
                                                                 fields,
                                                                 currentSort,
                                                                 ...rest
                                                             }: SortableTableProps<T>) {
    return (
        <DataTableProvider initialFields={fields} initialSort={currentSort}>
            <SortableTable {...rest}/>
        </DataTableProvider>
    )
}

StandaloneSortableTable.displayName = 'StandaloneSortableTable';
