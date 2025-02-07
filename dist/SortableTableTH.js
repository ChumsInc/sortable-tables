import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import DataTableTH from "./DataTableTH";
import styled from '@emotion/styled';
const flexJustifyContent = (align) => {
    if (!align) {
        return 'flex-start';
    }
    switch (align) {
        case 'end':
            return 'flex-end';
        default:
            return 'center';
    }
};
const FieldTitle = styled.div `
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
    return (_jsx("th", { ...thProps, className: classNames("sortable", thClassName), scope: "col", onClick: clickHandler, children: _jsxs(FieldTitle, { sorted: sorted, align: field.align, children: [_jsx("div", { className: "field-title", children: field.title }), _jsx("div", { className: classNames('me-1 sort-icon', iconClassName) })] }) }));
}
SortableTableTH.displayName = 'SortableTableTH';
export default SortableTableTH;
//# sourceMappingURL=SortableTableTH.js.map