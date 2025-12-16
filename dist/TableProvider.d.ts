import { ReactNode } from 'react';
import { DataTableField } from './types';
export interface TableContextData<T = unknown> {
    fields: DataTableField<T>[];
    setFields: (next: DataTableField<T>[] | ((prev: DataTableField<T>[]) => DataTableField<T>[])) => void;
    updateField: (key: string | number, arg: Partial<DataTableField<T>>) => void;
    getField: (key: string | number) => DataTableField<T> | undefined;
}
export interface TableProviderProps<T = unknown> {
    initialFields: DataTableField<T>[];
    children: ReactNode;
}
export default function TableProvider<T = unknown>({ children, initialFields }: TableProviderProps<T>): import("react/jsx-runtime").JSX.Element;
export declare function useTableContext<T = unknown>(): TableContextData<T>;
export declare function useTableFields<T = unknown>(): DataTableField<T>[];
export declare function useField<T = unknown>(key: string | number): DataTableField<T> | null;
export declare function useHasTableFieldsContext(): boolean;
