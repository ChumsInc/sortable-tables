import { type DataTableClassNames } from "../index";
import type { ReactNode } from "react";
export interface ItemContentProps<T = unknown> {
    row: T;
    rowClassName?: DataTableClassNames<T>;
    renderRow?: (row: T) => ReactNode;
    onClick?: (row: T) => void;
    selected?: boolean;
}
export default function ItemContent<T = unknown>({ row, rowClassName, onClick, selected, renderRow }: ItemContentProps<T>): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react").JSX.Element | null | undefined;
