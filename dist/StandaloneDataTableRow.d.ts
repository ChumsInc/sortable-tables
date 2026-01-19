import { DataTableField, DataTableRowProps } from './types';
export interface StandaloneDataTableRowProps<T = unknown> extends DataTableRowProps<T> {
    fields: DataTableField<T>[];
}
declare function StandaloneDataTableRow<T = unknown>({ fields, className, rowClassName, selected, row, trRef, onClick, ...rest }: StandaloneDataTableRowProps<T>): import("react/jsx-runtime").JSX.Element | null;
declare namespace StandaloneDataTableRow {
    var displayName: string;
}
export default StandaloneDataTableRow;
