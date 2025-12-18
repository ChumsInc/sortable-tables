import React, {type RefObject, type TableHTMLAttributes} from 'react';
import styled from "@emotion/styled";
import type {DataTableProps} from "./types";
import clsx from "clsx";

export interface StyledTableProps extends TableHTMLAttributes<HTMLTableElement>, Pick<DataTableProps, 'sticky' | 'responsive'> {
    ref: RefObject<HTMLTableElement>;
}

const StyledTable = styled.table<StyledTableProps>`
    --table-sticky-top: ${props => props.sticky ? '0' : undefined};

    thead {
        tr:nth-of-type(1) td,
        tr:nth-of-type(1) th {
            top: var(--table-sticky-top, unset);
            position: ${props => props.sticky ? "sticky" : "unset"};
            z-index: ${props => props.sticky ? 10 : "unset"};
            background: ${props => props.sticky ? "linear-gradient(var(--bs-table-bg) 75%, rgba(var(--bs-secondary-bg-rgb), 0.9))" : "unset"};
        }
    }
`


export default function Table({
                                  sticky,
                                  responsive,
                                  children,
                                  className,
                                  ref,
                                  ...rest
                              }: StyledTableProps) {
    if (responsive) {
        const _className = clsx(className, {
            'table-responsive': responsive === true,
            [`table-responsive-${responsive}`]: responsive !== true,
        })
        return (
            <div className={_className}>
                <StyledTable ref={ref} {...rest}>{children}</StyledTable>
            </div>
        )
    }

    return (
        <StyledTable className={className} sticky={sticky} ref={ref} {...rest}>{children}</StyledTable>
    )
}

