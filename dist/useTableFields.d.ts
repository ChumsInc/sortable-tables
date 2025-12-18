import { TableContextData } from './DataTableContext';
/**
 * Returns a tuple containing the fields and a function to update them.
 * @returns [fields, setFields]
 */
export declare function useTableFields<T = unknown>(): [
    fields: TableContextData<T>['fields'],
    setFields: TableContextData<T>['setFields']
];
