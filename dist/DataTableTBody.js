import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DataTableRow from "./DataTableRow";
function DataTableTBody({ fields, data, keyField, rowClassName, renderRow, onSelectRow, selected = '', children, ...rest }) {
    return (_jsxs("tbody", { ...rest, children: [data.map(row => {
                const keyValue = String(typeof keyField === "function" ? keyField(row) : row[keyField]);
                const isSelected = typeof selected === 'function' ? selected(row) : keyValue === selected;
                if (renderRow) {
                    return renderRow(row);
                }
                return (_jsx(DataTableRow, { onClick: onSelectRow, rowClassName: rowClassName, fields: fields, row: row, selected: isSelected }, keyValue));
            }), children] }));
}
DataTableTBody.displayName = 'DataTableTBody';
export default DataTableTBody;
//# sourceMappingURL=DataTableTBody.js.map