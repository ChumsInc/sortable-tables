import type { VirtualTableProps } from "./VirtualTableTypes";
export default function VirtualTable<T = unknown>({ data, fields, keyField, currentSort, onChangeSort, ...rest }: VirtualTableProps<T>): import("react").JSX.Element;
