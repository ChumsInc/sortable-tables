import React from 'react';
import classNames from "classnames";
import DataTableHead from "./DataTableHead";
import DataTableTBody from "./DataTableTBody";
import {DataTableProps} from "./types";
import {noop} from "./utils";


function DataTable<T = unknown>({
                                                   fields,
                                                   data,
                                                   keyField,
                                                   size = '',
                                                   rowClassName,
                                                   renderRow,
                                                   onSelectRow = noop,
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
        <table className={tableClassName} {...rest}>
            <DataTableHead {...tableHeadProps} fields={fields}/>
            {!!data.length && (
                <DataTableTBody fields={fields} data={data} keyField={keyField} rowClassName={rowClassName}
                                renderRow={renderRow}
                                onSelectRow={onSelectRow} selected={selected}/>
            )}
            {children}
            {tfoot}
        </table>
    )
}

DataTable.displayName = 'DataTable';
export default DataTable;
