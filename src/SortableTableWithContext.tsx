import type {SortableTableProps} from "./types";
import clsx from "clsx";
import Table from "./Table";
import {DataTableCols, DataTableTBody} from "./index";
import SortableTableHead from "./SortableTableHead";
import React from "react";


export default function SortableTableWithContext<T = unknown>({
                                                                  className,
                                                                  size,
                                                                  responsive,
                                                                  sticky,
                                                                  data,
                                                                  keyField,
                                                                  rowClassName,
                                                                  renderRow,
                                                                  onSelectRow,
                                                                  selected,
                                                                  tableHeadProps,
                                                                  children,
                                                                  tfoot,
                                                                  currentSort,
                                                                  onChangeSort,
                                                                  ...rest
                                                              }: Omit<SortableTableProps<T>, 'fields'>) {
    const tableClassName = clsx('table', className, {
        [`table-${size}`]: !!size,
    })

    return (
        <Table className={tableClassName} responsive={responsive} sticky={sticky} {...rest}>
            <DataTableCols/>
            <SortableTableHead currentSort={currentSort} onChangeSort={onChangeSort} {...tableHeadProps}/>
            {!!data.length && (
                <DataTableTBody data={data} keyField={keyField} rowClassName={rowClassName}
                                renderRow={renderRow}
                                onSelectRow={onSelectRow} selected={selected}/>
            )}
            {children}
            {tfoot}
        </Table>
    )
}
