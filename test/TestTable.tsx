import {useState} from 'react';
import type {ProductLine} from './data'
import {ContainedSortableTable, type SortProps, useTableSort} from "../src";
import TablePagination from "../src/TablePagination";
import TableColumnsHandler from "./TableColumnsHandler";


const rowClassName = (row: ProductLine) => row.active ? '' : 'table-warning';

export interface TestTableProps {
    data: ProductLine[];
    onChangeSort?: (sort: SortProps<ProductLine>) => void;
}

export default function TestTable({data, onChangeSort}: TestTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [, setSort] = useTableSort<ProductLine>();


    const rowsPerPageChangeHandler = (rpp: number) => {
        setPage(0);
        setRowsPerPage(rpp);
    }

    const sortChangeHandler = (sort: SortProps<ProductLine>) => {
        onChangeSort?.(sort);
        setSort(sort);
    }


    return (
        <div>
            <TableColumnsHandler/>
            <ContainedSortableTable onChangeSort={sortChangeHandler} size="lg" responsive
                                    data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                    keyField="ProductLine" rowClassName={rowClassName}/>
            <TablePagination page={page} onChangePage={setPage} size="sm"
                             rowsPerPage={rowsPerPage}
                             rowsPerPageProps={{
                                 onChange: rowsPerPageChangeHandler,
                                 label: <span className="bi-images"/>,
                                 pageValues: [5, 10, 15, 25, 50, 100]
                             }}
                             showFirst={data.length > rowsPerPage}
                             showLast={data.length > rowsPerPage}
                             count={data.length}/>
        </div>

    )
}
