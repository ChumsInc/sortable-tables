import React from "react";
import classNames from "classnames";
import DataTableTH from "./DataTableTH";
import {SortableTableTHProps} from "./types";



function SortableTableTH<T = unknown>({
                        field,
                        sorted,
                        ascending,
                        className,
                        onClick
                    }: SortableTableTHProps<T>) {
    if (!field.sortable) {
        return (<DataTableTH field={field} className={className}/>)
    }

    const thClassName = classNames({[`text-${field.align}`]: !!field.align}, className);

    const clickHandler = () => {
        onClick({field: field.field, ascending: !sorted ? true : !ascending});
    }
    const iconClassName = {
        'bi-arrow-down': !!sorted && !!ascending,
        'bi-arrow-up': !!sorted && !ascending,
    }


    return (
        <th {...field.thProps} className={classNames("sortable", thClassName)} onClick={clickHandler}>
            {!!sorted && (
                <span className={classNames('me-1', iconClassName)}/>
            )}
            {field.title}
        </th>
    )
}

SortableTableTH.displayName = 'SortableTableTH';
export default SortableTableTH;
