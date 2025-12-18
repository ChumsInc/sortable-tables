import { DataTableField, SortProps } from './types';
export interface TableContextData<T = unknown> {
    fields: DataTableField<T>[];
    setFields: (next: DataTableField<T>[] | ((prev: DataTableField<T>[]) => DataTableField<T>[])) => void;
    sort: SortProps<T> | null;
    setSort: (next: SortProps<T> | null | ((prev: SortProps<T> | null) => SortProps<T> | null)) => void;
    getField: (key: string | number) => DataTableField<T> | undefined;
    updateField: (key: string | number, arg: Partial<DataTableField<T>>) => void;
}
export declare const DataTableContext: import('react').Context<TableContextData<unknown> | null>;
