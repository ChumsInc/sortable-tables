import type {DataTableProps} from "./types";
import clsx from "clsx";
import Table from "./Table";
import {DataTableCols, DataTableTBody} from "./index";
import DataTableHead from "./DataTableHead";

export default function ContainedDataTable<T = unknown>({
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
                                                              ...rest
                                                          }: Omit<DataTableProps<T>, 'fields'>) {
    const tableClassName = clsx('table', className, {
        [`table-${size}`]: !!size,
    })

    return (
        <Table sticky={sticky} responsive={responsive} className={tableClassName} {...rest}>
            <DataTableCols/>
            <DataTableHead {...tableHeadProps}/>
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
ContainedDataTable.displayName = 'ContainedDataTable';
