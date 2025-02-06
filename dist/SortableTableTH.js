import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import DataTableTH from "./DataTableTH";
import styled from '@emotion/styled';
const SortableTH = styled.span `
    .sort-icon {
        opacity: ${props => props.sorted ? 1 : 0};
        &:hover {
            opacity: 1;
        }
    }
`;
function SortableTableTH({ field, sorted, ascending, className, onClick }) {
    if (!field.sortable) {
        return (_jsx(DataTableTH, { field: field, className: className }));
    }
    const { className: _thClassName, ...thProps } = field.thProps ?? {};
    const thClassName = classNames(className, _thClassName, { [`text-${field.align}`]: !!field.align });
    const clickHandler = () => {
        onClick({ field: field.field, ascending: !sorted ? true : !ascending });
    };
    const iconClassName = {
        'bi-arrow-down': ascending,
        'bi-arrow-up': !ascending,
    };
    return (_jsxs(SortableTH, { ...thProps, className: classNames("sortable", thClassName), onClick: clickHandler, sorted: sorted, children: [_jsx("span", { className: classNames('me-1', iconClassName) }), field.title] }));
}
SortableTableTH.displayName = 'SortableTableTH';
export default SortableTableTH;
//# sourceMappingURL=SortableTableTH.js.map