import React from 'react';
import DataTableRow from "./DataTableRow";
import {noop} from "./utils";
import {DataTableTBodyProps} from "./types";



function DataTableTBody<T = unknown>({
                            fields,
                            data,
                            keyField,
                            rowClassName,
                            renderRow,
                            onSelectRow = noop,
                            selected = '',
                            children,
                            ...rest
                        }: DataTableTBodyProps<T>) {

    return (
        <tbody {...rest}>
        {data.map(row => {
            const keyValue = String(typeof keyField === "function" ? keyField(row) : row[keyField]);
            const isSelected = typeof selected === 'function' ? selected(row) : keyValue === selected;
            if (renderRow) {
                return renderRow(row);
            }
            return (
                <DataTableRow key={keyValue} onClick={(ev) => onSelectRow(row, ev)}
                              rowClassName={rowClassName}
                              fields={fields}
                              row={row} selected={isSelected}/>
            )
        })}
        {children}
        </tbody>
    )
}
DataTableTBody.displayName = 'DataTableTBody';
export default DataTableTBody
