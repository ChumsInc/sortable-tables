import type { SortProps } from "chums-types";
export default function FixedHeaderContent<T = unknown>({ onChangeSort }: {
    onChangeSort: (sort: SortProps<T>) => void;
}): import("react").JSX.Element;
