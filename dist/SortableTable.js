import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import SortableTableHead from "./SortableTableHead";
import DataTableTBody from "./DataTableTBody";
import { noop } from "./utils";
function SortableTable({ fields, data, currentSort, onChangeSort, keyField, size = '', rowClassName, renderRow, onSelectRow = noop, selected = '', className = '', tfoot, children, ...rest }) {
    const tableClassName = classNames('table', className, {
        [`table-${size}`]: !!size,
    });
    return (_jsxs("table", { className: tableClassName, ...rest, children: [_jsx(SortableTableHead, { currentSort: currentSort, fields: fields, onChangeSort: onChangeSort }), !!data.length && (_jsx(DataTableTBody, { fields: fields, data: data, keyField: keyField, rowClassName: rowClassName, renderRow: renderRow, onSelectRow: onSelectRow, selected: selected })), children, tfoot] }));
}
SortableTable.displayName = 'SortableTable';
export default SortableTable;
//# sourceMappingURL=SortableTable.js.map