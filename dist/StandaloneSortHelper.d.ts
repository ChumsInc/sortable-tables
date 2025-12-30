import { SortProps } from './types';
export interface StandaloneSortHelperProps<T = unknown> {
    nextSort: SortProps<T>;
}
export declare function StandaloneSortHelper<T = unknown>({ nextSort }: StandaloneSortHelperProps<T>): import("react/jsx-runtime").JSX.Element;
