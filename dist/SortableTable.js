import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import SortableTableHead from "./SortableTableHead";
import DataTableTBody from "./DataTableTBody";
import Table from "./Table";
function SortableTable({ fields, data, currentSort, onChangeSort, keyField, size = '', sticky, rowClassName, renderRow, onSelectRow, selected = '', className = '', tfoot, children, ...rest }) {
    const tableClassName = classNames('table', className, {
        [`table-${size}`]: !!size,
    });
    return (_jsxs(Table, { className: tableClassName, sticky: sticky, ...rest, children: [_jsx(SortableTableHead, { currentSort: currentSort, fields: fields, onChangeSort: onChangeSort }), !!data.length && (_jsx(DataTableTBody, { fields: fields, data: data, keyField: keyField, rowClassName: rowClassName, renderRow: renderRow, onSelectRow: onSelectRow, selected: selected })), children, tfoot] }));
}
SortableTable.displayName = 'SortableTable';
export default SortableTable;
//# sourceMappingURL=SortableTable.js.map