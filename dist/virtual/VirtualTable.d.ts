import type { VirtualTableProps } from "./VirtualTableTypes";
export default function VirtualTable<T = unknown>({ containerProps, size, rowHeight, maxHeight, headerHeight, data, className, fields, keyField, onSelectRow, selected, ...rest }: VirtualTableProps<T>): import("react").JSX.Element;
