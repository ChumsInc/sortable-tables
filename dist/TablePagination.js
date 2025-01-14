import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RowsPerPage from "./RowsPerPage";
import classNames from "classnames";
function TablePagination({ page, rowsPerPage, onChangePage, count, size, showFirst, showLast, className, rowsPerPageProps, ...rest }) {
    const first = count === 0 ? 0 : (page * rowsPerPage) + 1;
    const last = Math.min(page * rowsPerPage + rowsPerPage, count);
    const lastPage = rowsPerPage === 0 ? 0 : Math.floor((count - 1) / rowsPerPage);
    const buttonClassName = classNames("btn btn-link", { [`btn-${size}`]: !!size });
    return (_jsxs("div", { className: classNames("row g-3 justify-content-end align-items-baseline", className), ...rest, children: [!!rowsPerPageProps && (_jsx("div", { className: "col-auto", children: _jsx(RowsPerPage, { ...rowsPerPageProps, value: rowsPerPage, size: size }) })), _jsx("div", { className: "col-auto", children: _jsxs("div", { className: "row g-3 flex-nowrap", children: [_jsxs("div", { className: "col-auto", children: [first, "-", last, " of ", count] }), showFirst && (_jsx("div", { className: "col-auto", children: _jsx("button", { className: buttonClassName, disabled: page === 0, onClick: () => onChangePage(0), children: _jsx("span", { className: "bi-chevron-bar-left" }) }) })), _jsx("div", { className: "col-auto", children: _jsx("button", { className: buttonClassName, disabled: page === 0, onClick: () => onChangePage(page - 1), children: _jsx("span", { className: "bi-chevron-left" }) }) }), _jsx("div", { className: "col-auto", children: _jsx("button", { className: buttonClassName, disabled: page >= lastPage, onClick: () => onChangePage(page + 1), children: _jsx("span", { className: "bi-chevron-right" }) }) }), showLast && (_jsx("div", { className: "col-auto", children: _jsx("button", { className: buttonClassName, disabled: page >= lastPage, onClick: () => onChangePage(lastPage), children: _jsx("span", { className: "bi-chevron-bar-right" }) }) }))] }) })] }));
}
TablePagination.displayname = 'TablePagination';
export default TablePagination;
//# sourceMappingURL=TablePagination.js.map