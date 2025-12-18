import {useContext} from "react";
import {DataTableContext, type TableContextData} from "./DataTableContext";

/**
 * Returns a tuple containing the fields and a function to update them.
 * @returns [fields, setFields]
 */
export function useTableFields<T = unknown>(): [
    fields: TableContextData<T>['fields'],
    setFields: TableContextData<T>['setFields']
] {
    const context = useContext(DataTableContext) as TableContextData<T>;
    if (!context) {
        throw new Error('useTableContext must be used within a DataTableProvider');
    }
    return [
        context.fields,
        context.setFields
    ];
}
