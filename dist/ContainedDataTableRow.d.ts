import type { DataTableRowProps } from "./types";
declare function ContainedDataTableRow<T = unknown>({ className, rowClassName, selected, row, trRef, onClick, ...rest }: Omit<DataTableRowProps<T>, 'fields'>): import("react").JSX.Element | null;
declare namespace ContainedDataTableRow {
    var displayName: string;
}
export default ContainedDataTableRow;
