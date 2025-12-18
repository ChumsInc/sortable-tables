import { DataTableProps } from './types';
declare function DataTable<T = unknown>({ className, size, responsive, sticky, data, keyField, rowClassName, renderRow, onSelectRow, selected, tableHeadProps, children, tfoot, ...rest }: Omit<DataTableProps<T>, 'fields'>): import("react/jsx-runtime").JSX.Element;
declare namespace DataTable {
    var displayName: string;
}
export default DataTable;
