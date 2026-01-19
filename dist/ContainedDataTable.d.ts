import { DataTableProps } from './types';
declare function ContainedDataTable<T = unknown>({ className, size, responsive, sticky, data, keyField, rowClassName, renderRow, onSelectRow, selected, tableHeadProps, children, tfoot, ...rest }: Omit<DataTableProps<T>, 'fields'>): import("react/jsx-runtime").JSX.Element;
declare namespace ContainedDataTable {
    var displayName: string;
}
export default ContainedDataTable;
