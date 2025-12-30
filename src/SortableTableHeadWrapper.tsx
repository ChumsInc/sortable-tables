import {useTableFields} from "./useTableFields";
import {useTableSort} from "./useTableSort";
import SortableTableHead from "./SortableTableHead";
import type {SortProps} from "./types";

export interface SortableTableHeadWrapperProps<T = unknown> {
    onChangeSort: (sort: SortProps<T>) => void;
}

export default function SortableTableHeadWrapper<T = unknown>({
                                                                  onChangeSort,
                                                              }: SortableTableHeadWrapperProps<T>) {
    const [fields] = useTableFields<T>()
    const [sort] = useTableSort<T>();

    return (
        <SortableTableHead fields={fields} currentSort={sort} onChangeSort={onChangeSort} />
    )
}
SortableTableHeadWrapper.displayName = 'SortableTableHeadWrapper';
