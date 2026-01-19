import type {SortableTableProps} from "./types";
import DataTableProvider from "./DataTableProvider";
import ContainedSortableTable from "./ContainedSortableTable";
import {SortHelper} from "./SortHelper";


export default function SortableTable<T = unknown>({
                                                       fields,
                                                       currentSort,
                                                       ...rest
                                                   }: SortableTableProps<T>) {
    return (
        <DataTableProvider initialFields={fields} initialSort={currentSort}>
            <SortHelper nextSort={currentSort}/>
            <ContainedSortableTable {...rest}/>
        </DataTableProvider>
    )
}

SortableTable.displayName = 'SortableTable';
