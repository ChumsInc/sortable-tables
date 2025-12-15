import React from 'react';
import SortableTableHead from "./SortableTableHead";
import DataTableTBody from "./DataTableTBody";
import type {SortableTableProps} from "./types";
import Table from "./Table";
import DataTableCols from "./DataTableCols";
import clsx from "clsx";


function SortableTable<T = unknown>({
                                        fields,
                                        data,
                                        currentSort,
                                        onChangeSort,
                                        keyField,
                                        size = '',
                                        sticky,
                                        rowClassName,
                                        renderRow,
                                        onSelectRow,
                                        selected = '',
                                        className = '',
                                        tfoot,
                                        children,
                                        ...rest
                                    }: SortableTableProps<T>) {
    const tableClassName = clsx('table', className, {
        [`table-${size}`]: !!size,
    })

    return (
        <Table className={tableClassName} sticky={sticky} {...rest}>
            <DataTableCols fields={fields}/>
            <SortableTableHead currentSort={currentSort} fields={fields} onChangeSort={onChangeSort}/>
            {!!data.length && (
                <DataTableTBody fields={fields} data={data} keyField={keyField} rowClassName={rowClassName}
                                renderRow={renderRow}
                                onSelectRow={onSelectRow} selected={selected}/>
            )}
            {children}
            {tfoot}
        </Table>
    )
}

SortableTable.displayName = 'SortableTable';
export default SortableTable;
