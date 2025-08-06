import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import styled from "@emotion/styled";
import classNames from "classnames";
const StyledTable = styled.table `
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
`;
export default React.forwardRef(function Table({ sticky, responsive, children, className, ...rest }, ref) {
    if (responsive) {
        const _className = classNames(className, {
            'table-responsive': responsive === true,
            [`table-responsive-${responsive}`]: responsive !== true,
        });
        return (_jsx("div", { className: _className, children: _jsx(StyledTable, { ref: ref, ...rest, children: children }) }));
    }
    return (_jsx(StyledTable, { className: className, sticky: sticky, ref: ref, ...rest, children: children }));
});
//# sourceMappingURL=Table.js.map