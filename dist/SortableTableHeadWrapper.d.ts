import type { SortProps } from "./types";
export interface SortableTableHeadWrapperProps<T = unknown> {
    onChangeSort: (sort: SortProps<T>) => void;
}
declare function SortableTableHeadWrapper<T = unknown>({ onChangeSort, }: SortableTableHeadWrapperProps<T>): import("react").JSX.Element;
declare namespace SortableTableHeadWrapper {
    var displayName: string;
}
export default SortableTableHeadWrapper;
