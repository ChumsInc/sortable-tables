import { TableContextData } from './DataTableContext';
/**
 * Returns a tuple containing the currentSort and a function to update the sort.
 * @returns [sort, setSort]
 */
export declare function useTableSort<T = unknown>(): [
    sort: TableContextData<T>['sort'],
    setSort: TableContextData<T>['setSort']
];
