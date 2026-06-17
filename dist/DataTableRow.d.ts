import type { DataTableRowProps } from "./types";
declare function DataTableRow<T = unknown>({ fields, className, rowClassName, selected, row, trRef, onClick, ...rest }: DataTableRowProps<T>): import("react").JSX.Element;
declare namespace DataTableRow {
    var displayName: string;
}
export default DataTableRow;
