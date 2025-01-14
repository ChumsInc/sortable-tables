import React, { HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react';
import classNames from "classnames";
export interface SortProps<T = unknown> {
    field: keyof T;
    ascending: boolean;
}
export type UISize = 'sm' | 'lg' | '';
export type UITableSize = UISize | 'xs';
export type DataTableClassNames<T = unknown> = string | classNames.Argument | ((row: T) => (string | classNames.Argument));
export type UIFlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export interface DataTableField<T = unknown> {
    id?: number | string;
    field: keyof T;
    title: ReactNode;
    align?: 'start' | 'center' | 'end';
    render?: (row: T) => ReactNode;
    className?: DataTableClassNames<T>;
    colSpan?: number;
    thProps?: DataTableTHProps<T>;
    cellProps?: TableHTMLAttributes<HTMLTableCellElement>;
}
export interface SortableTableField<T = unknown> extends DataTableField<T> {
    sortable?: boolean;
}
export interface DataTableProps<T = unknown> extends TableHTMLAttributes<HTMLTableElement> {
    fields: DataTableField<T>[];
    data: T[];
    keyField: keyof T | ((row: T) => string | number);
    size?: UITableSize;
    rowClassName?: DataTableClassNames<T>;
    renderRow?: (row: T) => React.ReactNode;
    onSelectRow?: (row: T) => T | void;
    selected?: string | number | ((row: T) => boolean);
    tfoot?: React.ReactElement<HTMLTableSectionElement>;
    tableHeadProps?: DataTableHeadProps<T>;
    children?: ReactNode;
}
export interface DataTableTHProps<T = unknown> extends Omit<TableHTMLAttributes<HTMLTableCellElement>, 'className'> {
    field: DataTableField<T>;
    className?: string | classNames.Argument;
    children?: React.ReactNode;
}
export interface DataTableHeadProps<T = unknown> extends TableHTMLAttributes<HTMLTableSectionElement> {
    fields: DataTableField<T>[];
}
export interface DataTableTBodyProps<T = unknown> extends TableHTMLAttributes<HTMLTableSectionElement> {
    fields: DataTableField<T>[];
    data: T[];
    keyField: keyof T | ((row: T) => string | number);
    rowClassName?: DataTableClassNames<T>;
    renderRow?: (row: T) => React.ReactNode;
    onSelectRow?: (row: T) => T | void;
    selected?: string | number | ((row: T) => boolean);
    children?: ReactNode;
}
export interface DataTableRowProps<T = unknown> extends Omit<TableHTMLAttributes<HTMLTableRowElement>, 'onClick'> {
    rowClassName?: string | classNames.Argument | ((row: T) => string | classNames.Argument);
    selected?: boolean;
    fields: DataTableField<T>[];
    row: T;
    trRef?: React.Ref<HTMLTableRowElement>;
    onClick?: (row?: T) => T | void;
}
export interface SortableTableProps<T = unknown> extends DataTableProps<T> {
    currentSort: SortProps<T>;
    onChangeSort: (sort: SortProps<T>) => void;
}
export interface SortableTableHeadProps<T = unknown> extends DataTableHeadProps<T> {
    currentSort: SortProps<T>;
    fields: SortableTableField<T>[];
    onChangeSort: (sort: SortProps<T>) => void;
}
export interface SortableTableTHProps<T = unknown> extends Omit<DataTableTHProps<T>, 'onClick'> {
    field: SortableTableField<T>;
    sorted?: boolean;
    ascending?: boolean;
    onClick: (sort: SortProps<T>) => void;
}
export interface RowsPerPageProps extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
    value: number;
    pageValues?: number[];
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
