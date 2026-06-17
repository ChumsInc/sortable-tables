import type { HTMLAttributes } from "react";
import type { SortableTableProps } from "../types";
export interface VirtualTableProps<T = unknown> extends Omit<SortableTableProps<T>, 'sticky' | 'tableHeadProps' | 'children'> {
    containerProps?: HTMLAttributes<HTMLDivElement>;
    rowHeight?: number;
    headerHeight?: number;
    maxHeight?: number;
}
