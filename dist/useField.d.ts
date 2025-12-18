import { DataTableField } from './types';
export type UseFieldArg<T = unknown> = keyof T & ((string | number) & {});
export declare function useField<T = unknown>(key: UseFieldArg<T>): [
    field: DataTableField<T> | null,
    updateField: (key: string | number, arg: Partial<DataTableField<T>>) => void
];
