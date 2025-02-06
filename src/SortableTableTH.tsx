import React from "react";
import classNames from "classnames";
import DataTableTH from "./DataTableTH";
import {SortableTableTHProps} from "./types";
import styled from '@emotion/styled';

type SortableTHProps = Pick<SortableTableTHProps, 'sorted'>;
const SortableTH = styled.span<SortableTHProps>`
    .sort-icon {
        opacity: ${props => props.sorted ? 1 : 0};
        &:hover {
            opacity: 1;
        }
    }
`

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

    const {className: _thClassName, ...thProps} = field.thProps ?? {};
    const thClassName = classNames(
        className,
        _thClassName,
        {[`text-${field.align}`]: !!field.align}
    );

    const clickHandler = () => {
        onClick({field: field.field, ascending: !sorted ? true : !ascending});
    }

    const iconClassName = {
        'bi-arrow-down': ascending,
        'bi-arrow-up': !ascending,
    }


    return (
        <SortableTH {...thProps} className={classNames("sortable", thClassName)} onClick={clickHandler} sorted={sorted}>
            <span className={classNames('me-1', iconClassName)} />
            {field.title}
        </SortableTH>
    )
}

SortableTableTH.displayName = 'SortableTableTH';
export default SortableTableTH;
