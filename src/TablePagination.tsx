import RowsPerPage from "./RowsPerPage";
import type {TablePaginationProps} from "./types";
import clsx from "clsx";

export default function TablePagination({
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

    const buttonClassName = clsx("btn btn-link", {[`btn-${size}`]: !!size});

    return (
        <div className={clsx("row g-3 justify-content-end", className)} {...rest}>
            {!!rowsPerPageProps && (
                <div className="col-auto">
                    <RowsPerPage {...rowsPerPageProps} value={rowsPerPage} size={size}/>
                </div>
            )}
            <div className="col-auto">
                <div className="row g-3 flex-nowrap align-items-baseline">
                    <div className="col-auto">
                        {first}-{last} of {count}
                    </div>
                    {showFirst && (
                        <div className="col-auto">
                            <button className={buttonClassName} disabled={page === 0}
                                    onClick={() => onChangePage(0)} aria-label="First page">
                                <span className="bi-chevron-bar-left" aria-hidden="true"/>
                            </button>
                        </div>
                    )}
                    <div className="col-auto">
                        <button className={buttonClassName} disabled={page === 0}
                                onClick={() => onChangePage(page - 1)} aria-label="Previous page">
                            <span className="bi-chevron-left" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className={buttonClassName} disabled={page >= lastPage}
                                onClick={() => onChangePage(page + 1)} aria-label="Next page">
                            <span className="bi-chevron-right" aria-hidden="true"/>
                        </button>
                    </div>
                    {showLast && (
                        <div className="col-auto">
                            <button className={buttonClassName} disabled={page >= lastPage}
                                    onClick={() => onChangePage(lastPage)} aria-label="Last page">
                                <span className="bi-chevron-bar-right" aria-hidden="true"/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
TablePagination.displayname = 'TablePagination';
