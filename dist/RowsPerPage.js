import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
export const defaultRowsPerPageValues = [10, 25, 50, 100, 250, 500, 1000];
function RowsPerPage({ value, pageValues = defaultRowsPerPageValues, size, className, onChange, ...rest }) {
    const changeHandler = (ev) => onChange(Number(ev.target.value));
    const selectClassName = className ?? classNames('form-select', { [`form-select-${size}`]: !!size });
    return (_jsx("select", { value: value, onChange: changeHandler, className: selectClassName, ...rest, children: pageValues.map(value => (_jsx("option", { value: value, children: value }, value))) }));
}
RowsPerPage.displayName = 'RowsPerPage';
export default RowsPerPage;
//# sourceMappingURL=RowsPerPage.js.map