import type { SortableTableProps } from "./types";
declare function SortableTable<T = unknown>({ fields, currentSort, ...rest }: SortableTableProps<T>): import("react").JSX.Element;
declare namespace SortableTable {
    var displayName: string;
}
export default SortableTable;
