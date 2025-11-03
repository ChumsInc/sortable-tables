import { default as React, TableHTMLAttributes } from 'react';
import { DataTableProps } from './types';
export type StyledTableProps = TableHTMLAttributes<HTMLTableElement> & Pick<DataTableProps, 'sticky' | 'responsive'>;
declare const _default: React.ForwardRefExoticComponent<React.TableHTMLAttributes<HTMLTableElement> & Pick<DataTableProps<unknown>, "sticky" | "responsive"> & React.RefAttributes<HTMLTableElement>>;
export default _default;
