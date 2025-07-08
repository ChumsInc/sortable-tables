import React, {ReactNode, MouseEvent} from 'react';
import classNames from "classnames";
import {noop} from "./utils";
import {DataTableRowProps} from "./types";
import DataTableCell from "./DataTableCell";


function DataTableRow<T = unknown>({
                                                      className,
                                                      rowClassName,
                                                      selected,
                                                      fields,
                                                      row,
                                                      trRef,
                                                      onClick = noop,
                                                      ...rest
                                                  }: DataTableRowProps<T>) {
    const clickHandler = (ev:MouseEvent<HTMLTableRowElement>) => {
        return onClick ? onClick(ev) : noop();
    }

    const _className = typeof rowClassName === 'function' ? rowClassName(row) : rowClassName;
    if (!row) {
        return null;
    }

    return (
        <tr ref={trRef}
            className={classNames({'table-active': selected}, className, _className)}
            onClick={clickHandler}
            {...rest}>
            {fields.map((field, index) => (<DataTableCell key={index} field={field} row={row} />))}
        </tr>
    )
}

DataTableRow.displayName = 'DataTableRow';
export default DataTableRow;
