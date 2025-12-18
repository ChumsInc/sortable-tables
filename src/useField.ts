import type {DataTableField} from "./types";
import {useContext} from "react";
import {DataTableContext, type TableContextData} from "./DataTableContext";

export type UseFieldArg<T = unknown> = keyof T & ((string | number) & {})
export function useField<T = unknown>(key: UseFieldArg<T>): [
    field:DataTableField<T>|null,
    updateField: (key: string|number, arg: Partial<DataTableField<T>>) => void
] {
    const context = useContext(DataTableContext) as TableContextData<T>;
    if (!context) {
        throw new Error('useField must be used within a DataTableProvider');
    }

    return [
        context.fields.find(field => field.id === key) ?? null,
        context.updateField,
    ]
}
