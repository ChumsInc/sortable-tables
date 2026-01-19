import type {SortProps} from "./types";
import {useTableSort} from "./useTableSort";
import {useEffect} from "react";

export interface StandaloneSortHelperProps<T = unknown> {
    nextSort: SortProps<T>
}
export function SortHelper<T = unknown>({nextSort}:StandaloneSortHelperProps<T>) {
    const [, setNextSort] = useTableSort<T>();
    useEffect(() => {
        console.log('setNextSort', nextSort);
        setNextSort(nextSort);
    }, [nextSort, setNextSort]);
    return null;
}
