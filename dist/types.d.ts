import { default as React, HTMLAttributes, MouseEvent, ReactNode, TableHTMLAttributes } from 'react';
import { ClassValue } from 'clsx';
export interface SortProps<T = unknown> {
    field: keyof T;
    ascending: boolean;
}
export type UISize = 'sm' | 'lg' | '';
export type UITableSize = UISize | 'xs';
export type DataTableClassNames<T = unknown> = string | ClassValue | ((row: T) => (string | ClassValue));
export type UIFlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export interface DataTableField<T = unknown> {
    id?: keyof T | (number & {}) | (string & {});
    field: keyof T;
    title: ReactNode;
    as?: 'td' | 'th';
    align?: 'start' | 'center' | 'end';
    render?: (row: T) => ReactNode;
    className?: DataTableClassNames<T>;
    colSpan?: number;
    thProps?: Omit<DataTableTHProps<T>, 'field'>;
    cellProps?: TableHTMLAttributes<HTMLTableCellElement>;
    collapse?: boolean;
    colClassName?: string;
    sortable?: boolean;
}
export type SortableTableField<T = unknown> = DataTableField<T>;
export interface DataTableProps<T = unknown> extends TableHTMLAttributes<HTMLTableElement> {
    fields: DataTableField<T>[];
    data: T[];
    keyField: keyof T | ((row: T) => string | number);
    size?: UITableSize;
    sticky?: boolean;
    responsive?: boolean | "sm" | "md" | "lg" | "xl" | 'xxl';
    rowClassName?: DataTableClassNames<T>;
    renderRow?: (row: T) => React.ReactNode;
    onSelectRow?: (row: T, ev?: MouseEvent<HTMLTableRowElement>) => void;
    selected?: string | number | ((row: T) => boolean);
    tfoot?: React.ReactElement<HTMLTableSectionElement>;
    tableHeadProps?: TableHTMLAttributes<HTMLTableSectionElement>;
    children?: ReactNode;
}
export interface DataTableCellProps<T = unknown> extends Omit<TableHTMLAttributes<HTMLTableCellElement>, 'className'> {
    field: DataTableField<T>;
    row: T;
    as?: 'td' | 'th';
    className?: string | ClassValue;
    children?: React.ReactNode;
}
export interface DataTableTHProps<T = unknown> extends Omit<DataTableCellProps<T>, 'row'> {
    as?: 'th';
}
export interface DataTableTBodyProps<T = unknown> extends TableHTMLAttributes<HTMLTableSectionElement> {
    data: T[];
    keyField: keyof T | ((row: T) => string | number);
    rowClassName?: DataTableClassNames<T>;
    renderRow?: (row: T) => React.ReactNode;
    onSelectRow?: (row: T, ev?: MouseEvent<HTMLTableRowElement>) => void;
    selected?: string | number | ((row: T) => boolean);
    children?: ReactNode;
}
export interface DataTableRowProps<T = unknown> extends Omit<TableHTMLAttributes<HTMLTableRowElement>, 'onClick'> {
    rowClassName?: string | ClassValue | ((row: T) => string | ClassValue);
    selected?: boolean;
    row: T;
    trRef?: React.Ref<HTMLTableRowElement>;
    onClick?: (row: T, ev?: MouseEvent<HTMLTableRowElement>) => void;
}
export interface SortableTableProps<T = unknown> extends DataTableProps<T> {
    fields: DataTableField<T>[];
    currentSort: SortProps<T>;
    onChangeSort: (sort: SortProps<T>) => void;
}
export interface SortableTableHeadProps<T = unknown> extends TableHTMLAttributes<HTMLTableSectionElement> {
    onChangeSort: (sort: SortProps<T>) => void;
}
export interface SortableTableTHProps<T = unknown> extends Omit<DataTableTHProps<T>, 'onClick'> {
    field: DataTableField<T>;
    sorted?: boolean;
    ascending?: boolean;
    onClick: (sort: SortProps<T>) => void;
}
export interface RowsPerPageProps extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
    value: number;
    pageValues?: number[];
    label?: string | React.ReactNode;
    size?: UISize;
    className?: string;
    onChange: (value: number) => void;
}
export interface TablePaginationProps extends HTMLAttributes<HTMLDivElement> {
    page: number;
    rowsPerPage: number;
    onChangePage: (page: number) => void;
    count: number;
    size?: UISize;
    showFirst?: boolean;
    showLast?: boolean;
    rowsPerPageProps?: Omit<RowsPerPageProps, 'value'>;
}
export interface DataTableColProps<T = unknown> extends TableHTMLAttributes<HTMLTableSectionElement> {
    fields: DataTableField<T>[];
}
