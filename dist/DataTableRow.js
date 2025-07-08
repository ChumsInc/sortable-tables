import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
import DataTableCell from "./DataTableCell";
function DataTableRow({ className, rowClassName, selected, fields, row, trRef, onClick, ...rest }) {
    const clickHandler = (ev) => {
        onClick?.(row, ev);
    };
    const _className = typeof rowClassName === 'function' ? rowClassName(row) : rowClassName;
    if (!row) {
        return null;
    }
    return (_jsx("tr", { ref: trRef, className: classNames({ 'table-active': selected }, className, _className), onClick: clickHandler, ...rest, children: fields.map((field, index) => (_jsx(DataTableCell, { field: field, row: row }, index))) }));
}
DataTableRow.displayName = 'DataTableRow';
export default DataTableRow;
//# sourceMappingURL=DataTableRow.js.map