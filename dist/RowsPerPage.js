import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import classNames from "classnames";
export const defaultRowsPerPageValues = [10, 25, 50, 100, 250, 500, 1000];
function RowsPerPage({ value, pageValues = defaultRowsPerPageValues, size, label, className, onChange, ...rest }) {
    const id = useId();
    const changeHandler = (ev) => onChange(Number(ev.target.value));
    const selectClassName = className ?? classNames('form-select', { [`form-select-${size}`]: !!size });
    const inputGroupClassName = classNames('input-group', {
        [`input-group-${size}`]: !!size,
    });
    return (_jsxs("div", { className: inputGroupClassName, children: [_jsx("label", { className: "input-group-text", htmlFor: id, children: label ?? 'Rows' }), _jsx("select", { className: selectClassName, id: id, value: value, onChange: changeHandler, ...rest, children: pageValues.map(value => (_jsx("option", { value: value, children: value }, value))) })] }, value));
}
RowsPerPage.displayName = 'RowsPerPage';
export default RowsPerPage;
//# sourceMappingURL=RowsPerPage.js.map