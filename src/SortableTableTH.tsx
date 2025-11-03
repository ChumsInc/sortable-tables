import React from "react";
import classNames from "classnames";
import DataTableTH from "./DataTableTH";
import type {SortableTableTHProps, UIFlexAlign} from "./types";
import styled from '@emotion/styled';

const flexJustifyContent = (align?: UIFlexAlign) => {
    if (!align) {
        return 'flex-start';
    }
    switch (align) {
        case 'end':
            return 'flex-end';
        default:
            return 'center';
    }
}

type FieldTitleProps = {
    sorted?: boolean;
    align?: UIFlexAlign;
};
const FieldTitle = styled.div<FieldTitleProps>`
    display: flex;
    width: 100%;
    flex-direction: ${props => props.align === 'end' ? 'row-reverse' : 'row'};
    justify-content: ${props => flexJustifyContent(props.align)};
    .sort-icon {
        flex-grow: ${props => props.align === 'end' ? '1' : '0'};
        opacity: ${props => props.sorted ? 1 : 0};
    }
    &:hover .sort-icon {
        color: ${props => props.sorted ? 'unset' : 'var(--bs-primary)'} ;
        opacity: 0.75;
        transition: opacity 0.2s;
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
        <th {...thProps} className={classNames("sortable", thClassName)} scope="col" onClick={clickHandler}>
            <FieldTitle sorted={sorted} align={field.align}>
                <div className="field-title">{field.title}</div>
                <div className={classNames('me-1 sort-icon', iconClassName)}/>
            </FieldTitle>
        </th>
    )
}

SortableTableTH.displayName = 'SortableTableTH';
export default SortableTableTH;
