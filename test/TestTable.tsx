import React, {useState} from 'react';
import {ProductLine, productLines} from './data'
import {SortableTableWithContext, SortProps} from "../src";
import TablePagination from "../src/TablePagination";
import TableProvider from "../src/TableProvider";
import TableColumnsHandler from "./TableColumnsHandler";
import {tableFields} from "./tableFields";


const rowClassName = (row: ProductLine) => row.active ? '' : 'table-warning';

export default function TestTable() {
    const [sort, setSort] = useState<SortProps<ProductLine>>({field: 'ProductLine', ascending: true});
    const [list, setList] = useState<ProductLine[]>(productLines);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const rowsPerPageChangeHandler = (rpp: number) => {
        setPage(0);
        setRowsPerPage(rpp);
    }


    return (
        <div>
            <TableProvider initialFields={tableFields}>
                <TableColumnsHandler/>
                <SortableTableWithContext currentSort={sort} onChangeSort={setSort} size="lg" responsive
                                          data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                          keyField="ProductLine" rowClassName={rowClassName}/>
            </TableProvider>
            <TablePagination page={page} onChangePage={setPage} size="sm"
                             rowsPerPage={rowsPerPage}
                             rowsPerPageProps={{
                                 onChange: rowsPerPageChangeHandler,
                                 label: <span className="bi-images"/>,
                                 pageValues: [5, 10, 15, 25, 50, 100]
                             }}
                             showFirst={list.length > rowsPerPage}
                             showLast={list.length > rowsPerPage}
                             count={list.length}/>
        </div>

    )
}
