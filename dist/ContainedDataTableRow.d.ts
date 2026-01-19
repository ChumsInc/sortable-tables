import { DataTableRowProps } from './types';
declare function ContainedDataTableRow<T = unknown>({ className, rowClassName, selected, row, trRef, onClick, ...rest }: Omit<DataTableRowProps<T>, 'fields'>): import("react/jsx-runtime").JSX.Element | null;
declare namespace ContainedDataTableRow {
    var displayName: string;
}
export default ContainedDataTableRow;
