import React, {TableHTMLAttributes} from 'react';
import styled from "@emotion/styled";
import {DataTableProps} from "./types";
import classNames from "classnames";

export type StyledTableProps = TableHTMLAttributes<HTMLTableElement> & Pick<DataTableProps, 'sticky' | 'responsive'>

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

export default React.forwardRef<HTMLTableElement, StyledTableProps>(
    function Table({
                       sticky,
                       responsive,
                       children,
                       className,
                       ...rest
                   }, ref) {
        if (responsive) {
            const _className = classNames(className, {
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
    })
