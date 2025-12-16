import { SortableTableProps } from './types';
export default function SortableTableWithContext<T = unknown>({ className, size, responsive, sticky, data, keyField, rowClassName, renderRow, onSelectRow, selected, tableHeadProps, children, tfoot, currentSort, onChangeSort, ...rest }: Omit<SortableTableProps<T>, 'fields'>): import("react/jsx-runtime").JSX.Element;
