import React, {useId} from 'react';
import RowsPerPage from "./RowsPerPage";
import classNames from "classnames";
import {TablePaginationProps} from "./types";

function TablePagination({
                             page,
                             rowsPerPage,
                             onChangePage,
                             count,
                             size,
                             showFirst,
                             showLast,
                             className,
                             rowsPerPageProps,
                             ...rest
                         }: TablePaginationProps) {

    const first = count === 0 ? 0 : (page * rowsPerPage) + 1;
    const last = Math.min(page * rowsPerPage + rowsPerPage, count);
    const lastPage = rowsPerPage === 0 ? 0 : Math.floor((count - 1) / rowsPerPage);

    const buttonClassName = classNames("btn btn-link", {[`btn-${size}`]: !!size});

    return (
        <div className={classNames("row g-3 justify-content-end align-items-baseline", className)} {...rest}>
            {!!rowsPerPageProps && (
                <div className="col-auto">
                    <RowsPerPage {...rowsPerPageProps} value={rowsPerPage} size={size}/>
                </div>
            )}
            <div className="col-auto">
                <div className="row g-3 flex-nowrap">
                    <div className="col-auto">
                        {first}-{last} of {count}
                    </div>
                    {showFirst && (
                        <div className="col-auto">
                            <button className={buttonClassName} disabled={page === 0}
                                    onClick={() => onChangePage(0)}>
                                <span className="bi-chevron-bar-left"/>
                            </button>
                        </div>
                    )}
                    <div className="col-auto">
                        <button className={buttonClassName} disabled={page === 0}
                                onClick={() => onChangePage(page - 1)}>
                            <span className="bi-chevron-left"/>
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className={buttonClassName} disabled={page >= lastPage}
                                onClick={() => onChangePage(page + 1)}>
                            <span className="bi-chevron-right"/>
                        </button>
                    </div>
                    {showLast && (
                        <div className="col-auto">
                            <button className={buttonClassName} disabled={page >= lastPage}
                                    onClick={() => onChangePage(lastPage)}>
                                <span className="bi-chevron-bar-right"/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

TablePagination.displayname = 'TablePagination';
export default TablePagination
