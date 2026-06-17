import type { VirtualTableProps } from "./VirtualTableTypes";
export default function ContainedVirtualTable<T = unknown>({ rowHeight, headerHeight, maxHeight, className, size, data, keyField, rowClassName, renderRow, onSelectRow, selected, tfoot, onChangeSort, containerProps, ...rest }: Omit<VirtualTableProps<T>, 'fields' | 'currentSort'>): import("react").JSX.Element;
