import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
import { noop } from "./utils";
function DataTableRow({ className, rowClassName, selected, fields, row, trRef, onClick = noop, ...rest }) {
    const clickHandler = () => {
        return onClick ? onClick() : noop();
    };
    const _className = typeof rowClassName === 'function' ? rowClassName(row) : rowClassName;
    if (!row) {
        return null;
    }
    return (_jsx("tr", { ref: trRef, className: classNames({ 'table-active': selected }, className, _className), onClick: clickHandler, ...rest, children: fields.map((field, index) => {
            const fieldClassName = typeof field.className === 'function' ? field.className(row) : field.className;
            if (typeof field.render === 'function') {
                return (_jsx("td", { className: classNames({ [`text-${field.align}`]: !!field.align }, fieldClassName), colSpan: field.colSpan, ...field.cellProps, children: field.render(row) }, index));
            }
            if (row[field.field] === undefined) {
                return _jsx("td", { ...field.cellProps }, index);
            }
            return (_jsx("td", { className: classNames({ [`text-${field.align}`]: !!field.align }, fieldClassName), colSpan: field.colSpan, ...field.cellProps, children: row[field.field] }, index));
        }) }));
}
DataTableRow.displayName = 'DataTableRow';
export default DataTableRow;
//# sourceMappingURL=DataTableRow.js.map