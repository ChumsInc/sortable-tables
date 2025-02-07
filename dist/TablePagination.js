import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RowsPerPage from "./RowsPerPage";
import classNames from "classnames";
function TablePagination({ page, rowsPerPage, onChangePage, count, size, showFirst, showLast, className, rowsPerPageProps, ...rest }) {
    const first = count === 0 ? 0 : (page * rowsPerPage) + 1;
    const last = Math.min(page * rowsPerPage + rowsPerPage, count);
    const lastPage = rowsPerPage === 0 ? 0 : Math.floor((count - 1) / rowsPerPage);
    const buttonClassName = classNames("btn btn-link", { [`btn-${size}`]: !!size });
    return (_jsxs("div", { className: classNames("row g-3 justify-content-end", className), ...rest, children: [!!rowsPerPageProps && (_jsx("div", { className: "col-auto", children: _jsx(RowsPerPage, { ...rowsPerPageProps, value: rowsPerPage, size: size }) })), _jsx("div", { className: "col-auto", children: _jsxs("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [_jsxs("div", { className: "col-auto", children: [first, "-", last, " of ", count] }), showFirst && (_jsx("div", { className: "col-auto", children: _jsx("button", { className: buttonClassName, disabled: page === 0, onClick: () => onChangePage(0), "aria-label": "First page", children: _jsx("span", { className: "bi-chevron-bar-left", "aria-hidden": "true" }) }) })), _jsx("div", { className: "col-auto", children: _jsx("button", { className: buttonClassName, disabled: page === 0, onClick: () => onChangePage(page - 1), "aria-label": "Previous page", children: _jsx("span", { className: "bi-chevron-left", "aria-hidden": "true" }) }) }), _jsx("div", { className: "col-auto", children: _jsx("button", { className: buttonClassName, disabled: page >= lastPage, onClick: () => onChangePage(page + 1), "aria-label": "Next page", children: _jsx("span", { className: "bi-chevron-right", "aria-hidden": "true" }) }) }), showLast && (_jsx("div", { className: "col-auto", children: _jsx("button", { className: buttonClassName, disabled: page >= lastPage, onClick: () => onChangePage(lastPage), "aria-label": "Last page", children: _jsx("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" }) }) }))] }) })] }));
}
TablePagination.displayname = 'TablePagination';
export default TablePagination;
//# sourceMappingURL=TablePagination.js.map