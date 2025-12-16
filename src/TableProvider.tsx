import {createContext, ReactNode, useCallback, useContext, useMemo, useState} from "react";
import {DataTableField} from "./types";

/* eslint-disable react-refresh/only-export-components */

export interface TableContextData<T = unknown> {
    fields: DataTableField<T>[];
    setFields: (next: DataTableField<T>[] | ((prev: DataTableField<T>[]) => DataTableField<T>[])) => void;
    updateField: (key: string | number, arg: Partial<DataTableField<T>>) => void;
    getField: (key: string | number) => DataTableField<T> | undefined;
}

const DataTableContext = createContext<TableContextData<unknown> | null>(null)

export interface TableProviderProps<T = unknown> {
    initialFields: DataTableField<T>[];
    children: ReactNode;
}

export default function TableProvider<T = unknown>({children, initialFields = []}: TableProviderProps<T>) {
    const [fields, setFieldsState] = useState<DataTableField<T>[]>(initialFields);

    const setFields = useCallback((fields: DataTableField<T>[] | ((prev: DataTableField<T>[]) => DataTableField<T>[])) => {
        setFieldsState(fields)
    }, []);
    const updateField = useCallback((key: string | number, arg: Partial<DataTableField<T>>) => {
        const nextState = fields.map(field => {
            if (field.id === key) {
                return {...field, ...arg}
            }
            return field;
        });
        setFieldsState(nextState);
    }, [fields])

    const getField = useCallback((key: string | number) => fields.find(field => field.id === key), [fields]);


    const value = useMemo<TableContextData<T>>(
        () => ({
            fields, setFields, updateField, getField
        }),
        [fields, setFields, updateField, getField]
    )

    return (
        <DataTableContext.Provider value={value as unknown as TableContextData<unknown>}>
            {children}
        </DataTableContext.Provider>
    )
}


export function useTableContext<T = unknown>() {
    const context = useContext(DataTableContext) as TableContextData<T>;
    if (!context) {
        throw new Error('useTableContext must be used within a FieldsProvider');
    }
    return context;
}

export function useTableFields<T = unknown>() {
    return useTableContext<T>().fields;
}

export function useField<T = unknown>(key: string | number): DataTableField<T> | null {
    const context = useContext(DataTableContext) as TableContextData<T>;
    if (!context) {
        throw new Error('useTableContext must be used within a FieldsProvider');
    }
    const field = context.fields.find(field => field.id === key);
    return field ?? null
}

export function useHasTableFieldsContext() {
    return useContext(DataTableContext) !== null;
}
