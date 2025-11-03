import { SortableTableProps } from './types';
declare function SortableTable<T = unknown>({ fields, data, currentSort, onChangeSort, keyField, size, sticky, rowClassName, renderRow, onSelectRow, selected, className, tfoot, children, ...rest }: SortableTableProps<T>): import("react/jsx-runtime").JSX.Element;
declare namespace SortableTable {
    var displayName: string;
}
export default SortableTable;
