import { ReactNode } from 'react';
import { DataTableField, SortProps } from './types';
export interface TableProviderProps<T = unknown> {
    initialFields: DataTableField<T>[];
    initialSort?: SortProps<T> | null;
    children: ReactNode;
}
declare function DataTableProvider<T = unknown>({ children, initialFields, initialSort, }: TableProviderProps<T>): import("react/jsx-runtime").JSX.Element;
declare namespace DataTableProvider {
    var displayName: string;
}
export default DataTableProvider;
