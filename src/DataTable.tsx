import React from 'react';
import classNames from "classnames";
import DataTableHead from "./DataTableHead";
import DataTableTBody from "./DataTableTBody";
import {DataTableProps} from "./types";
import Table from "./Table";


function DataTable<T = unknown>({
                                    fields,
                                    data,
                                    keyField,
                                    size = '',
                                    sticky,
                                    responsive,
                                    rowClassName,
                                    renderRow,
                                    onSelectRow,
                                    selected = '',
                                    className = '',
                                    tfoot,
                                    children,
                                    tableHeadProps,
                                    ...rest
                                }: DataTableProps<T>) {

    const tableClassName = classNames('table', className, {
        [`table-${size}`]: !!size,
    })

    return (
        <Table sticky={sticky} responsive={responsive} className={tableClassName} {...rest}>
            <DataTableHead {...tableHeadProps} fields={fields}/>
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

DataTable.displayName = 'DataTable';
export default DataTable;
