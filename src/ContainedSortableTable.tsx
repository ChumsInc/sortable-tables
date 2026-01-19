import type {SortableTableProps} from "./types";
import clsx from "clsx";
import Table from "./Table";
import {DataTableCols, DataTableTBody} from "./index";
import SortableTableHeadWrapper from "./SortableTableHeadWrapper";

export default function ContainedSortableTable<T = unknown>({
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
                                                       onChangeSort,
                                                       ...rest
                                                   }: Omit<SortableTableProps<T>, 'fields' | 'currentSort'>) {
    const tableClassName = clsx('table', className, {
        [`table-${size}`]: !!size,
    })

    return (
        <Table className={tableClassName} responsive={responsive} sticky={sticky} {...rest}>
            <DataTableCols/>
            <SortableTableHeadWrapper onChangeSort={onChangeSort} {...tableHeadProps}/>
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
ContainedSortableTable.displayName = 'ContainedSortableTable';
