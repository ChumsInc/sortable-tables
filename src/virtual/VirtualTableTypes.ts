import type {HTMLAttributes} from "react";
import type {SortableTableProps} from "../types";

export interface VirtualTableProps<T = unknown> extends SortableTableProps<T> {
    containerProps?: HTMLAttributes<HTMLDivElement>;
    rowHeight?: number;
    headerHeight?: number;
    maxHeight?: number;
}
