import { jsx as _jsx } from "react/jsx-runtime";
import DataTableTH from "./DataTableTH";
import classNames from "classnames";
function DataTableHead({ fields, ...rest }) {
    return (_jsx("thead", { ...rest, children: _jsx("tr", { children: fields.map((field, index) => (_jsx(DataTableTH, { ...field.thProps, field: field, className: classNames(typeof field.className === 'function'
                    ? { [`text-${field.align}`]: !!field.align }
                    : field.className) }, field.id ?? index))) }) }));
}
DataTableHead.displayName = 'DataTableHead';
export default DataTableHead;
//# sourceMappingURL=DataTableHead.js.map