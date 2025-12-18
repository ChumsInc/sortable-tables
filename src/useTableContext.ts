import {useContext} from "react";
import {DataTableContext, type TableContextData} from "./DataTableContext";

export function useTableContext<T = unknown>():TableContextData<T> {
    const context = useContext(DataTableContext) as TableContextData<T>;
    if (!context) {
        throw new Error('useTableContext must be used within a DataTableProvider');
    }
    return context;
}
