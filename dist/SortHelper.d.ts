import { SortProps } from './types';
export interface StandaloneSortHelperProps<T = unknown> {
    nextSort: SortProps<T>;
}
export declare function SortHelper<T = unknown>({ nextSort }: StandaloneSortHelperProps<T>): null;
