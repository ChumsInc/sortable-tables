import {useContext} from "react";
import {DataTableContext, type TableContextData} from "./DataTableContext";

/**
 * Returns a tuple containing the currentSort and a function to update the sort.
 * @returns [sort, setSort]
 */
export function useTableSort<T = unknown>(): [
    sort: TableContextData<T>['sort'],
    setSort: TableContextData<T>['setSort']
] {
    const context = useContext(DataTableContext) as TableContextData<T>;
    if (!context) {
        throw new Error('useTableSort must be used within a DataTableProvider');
    }
    return [
        context.sort,
        context.setSort
    ];
}
