import React from 'react';
import type {SortableTableProps} from "./types";
import DataTableProvider from "./DataTableProvider";
import SortableTable from "./SortableTable";
import {StandaloneSortHelper} from "./StandaloneSortHelper";


export default function StandaloneSortableTable<T = unknown>({
                                                                 fields,
                                                                 currentSort,
                                                                 ...rest
                                                             }: SortableTableProps<T>) {
    return (
        <DataTableProvider initialFields={fields} initialSort={currentSort}>
            <StandaloneSortHelper nextSort={currentSort} />
            <SortableTable {...rest}/>
        </DataTableProvider>
    )
}

StandaloneSortableTable.displayName = 'StandaloneSortableTable';
