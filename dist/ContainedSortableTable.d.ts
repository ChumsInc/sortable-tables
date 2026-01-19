import { SortableTableProps } from './types';
declare function ContainedSortableTable<T = unknown>({ className, size, responsive, sticky, data, keyField, rowClassName, renderRow, onSelectRow, selected, tableHeadProps, children, tfoot, onChangeSort, ...rest }: Omit<SortableTableProps<T>, 'fields' | 'currentSort'>): import("react/jsx-runtime").JSX.Element;
declare namespace ContainedSortableTable {
    var displayName: string;
}
export default ContainedSortableTable;
