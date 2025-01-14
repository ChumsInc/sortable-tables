import { jsx as _jsx } from "react/jsx-runtime";
import SortableTableTH from "./SortableTableTH";
import classNames from "classnames";
function SortableTableHead({ currentSort, fields, onChangeSort, }) {
    const { field, ascending } = currentSort;
    return (_jsx("thead", { children: _jsx("tr", { children: fields.map((tableField, index) => (_jsx(SortableTableTH, { field: tableField, sorted: field === tableField.field, ascending: ascending, className: classNames(typeof tableField.className === 'function'
                    ? { [`text-${tableField.align}`]: !!tableField.align }
                    : tableField.className), onClick: onChangeSort }, index))) }) }));
}
SortableTableHead.displayName = 'SortableTableHead';
export default SortableTableHead;
//# sourceMappingURL=SortableTableHead.js.map