import { DataTableProps } from './types';
export default function DataTableWithContext<T = unknown>({ className, size, responsive, sticky, data, keyField, rowClassName, renderRow, onSelectRow, selected, tableHeadProps, children, tfoot, ...rest }: Omit<DataTableProps<T>, 'fields'>): import("react/jsx-runtime").JSX.Element;
