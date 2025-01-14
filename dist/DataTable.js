import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import DataTableHead from "./DataTableHead";
import DataTableTBody from "./DataTableTBody";
import { noop } from "./utils";
function DataTable({ fields, data, keyField, size = '', rowClassName, renderRow, onSelectRow = noop, selected = '', className = '', tfoot, children, tableHeadProps, ...rest }) {
    const tableClassName = classNames('table', className, {
        [`table-${size}`]: !!size,
    });
    return (_jsxs("table", { className: tableClassName, ...rest, children: [_jsx(DataTableHead, { ...tableHeadProps, fields: fields }), !!data.length && (_jsx(DataTableTBody, { fields: fields, data: data, keyField: keyField, rowClassName: rowClassName, renderRow: renderRow, onSelectRow: onSelectRow, selected: selected })), children, tfoot] }));
}
DataTable.displayName = 'DataTable';
export default DataTable;
//# sourceMappingURL=DataTable.js.map