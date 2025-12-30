import type {SortProps} from "./types";
import {useTableSort} from "./useTableSort";
import {useEffect} from "react";

export interface StandaloneSortHelperProps<T = unknown> {
    nextSort: SortProps<T>
}
export function StandaloneSortHelper<T = unknown>({nextSort}:StandaloneSortHelperProps<T>) {
    const [, setNextSort] = useTableSort<T>();
    useEffect(() => {
        setNextSort(nextSort);
    }, [nextSort, setNextSort]);
    return null;
}
