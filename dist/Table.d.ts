import { type RefObject, type TableHTMLAttributes } from 'react';
import type { DataTableProps } from "./types";
export interface StyledTableProps extends TableHTMLAttributes<HTMLTableElement>, Pick<DataTableProps, 'sticky' | 'responsive'> {
    ref?: RefObject<HTMLTableElement>;
}
export default function Table({ sticky, responsive, children, className, ref, ...rest }: StyledTableProps): import("react/jsx-runtime").JSX.Element;
