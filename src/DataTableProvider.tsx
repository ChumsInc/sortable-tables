import {type ReactNode, useCallback, useMemo, useState} from "react";
import type {DataTableField, SortProps} from "./types";
import {DataTableContext, type TableContextData} from "./DataTableContext";

export interface TableProviderProps<T = unknown> {
    initialFields: DataTableField<T>[];
    initialSort?: SortProps<T>|null;
    children: ReactNode;
}

export default function DataTableProvider<T = unknown>({
                                                           children,
                                                           initialFields = [],
                                                           initialSort = null,
                                                       }: TableProviderProps<T>) {
    const [fields, setFieldsState] = useState<DataTableField<T>[]>(initialFields);
    const [sort, setProviderSort] = useState<SortProps<T> | null>(initialSort);

    const setFields = useCallback(
        (fields: DataTableField<T>[] | ((prev: DataTableField<T>[]) => DataTableField<T>[])) => {
            setFieldsState(fields)
        }, []);

    const setSort = useCallback(
        (sort: SortProps<T> | null | ((sort:SortProps<T>|null) => SortProps<T> | null)) => {
            setProviderSort(sort)
        }, [])


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
            fields,
            setFields,
            sort,
            setSort,
            getField,
            updateField
        }),
        [fields, setFields, sort, setSort, updateField, getField]
    )

    return (
        <DataTableContext.Provider value={value as unknown as TableContextData<unknown>}>
            {children}
        </DataTableContext.Provider>
    )
}
DataTableProvider.displayName = 'DataTableProvider';

