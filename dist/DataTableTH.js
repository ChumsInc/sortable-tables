import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
function DataTableTH({ field, className, children, ...rest }) {
    const thClassName = classNames({ [`text-${field.align}`]: !!field.align }, className);
    return (_jsx("th", { className: thClassName, ...rest, children: children ?? field.title }));
}
DataTableTH.displayName = 'DataTableTH';
export default DataTableTH;
//# sourceMappingURL=DataTableTH.js.map