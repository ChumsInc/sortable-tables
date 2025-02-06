import { DataTableProps } from "./types";
declare function DataTable<T = unknown>({ fields, data, keyField, size, sticky, responsive, rowClassName, renderRow, onSelectRow, selected, className, tfoot, children, tableHeadProps, ...rest }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
declare namespace DataTable {
    var displayName: string;
}
export default DataTable;
