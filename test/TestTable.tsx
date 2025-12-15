import React, {useEffect, useId, useState} from 'react';
import {ProductLine, productLines, productLineSorter} from './data'
import {SortableTable, SortableTableField, SortProps} from "../src";
import TablePagination from "../src/TablePagination";

const stdFields: SortableTableField<ProductLine>[] = [
    {field: 'ProductLine', title: 'Prod Line', sortable: true, as: 'th'},
    {field: 'ProductLineDesc', title: 'Description', sortable: true},
    {
        field: 'ProductType',
        title: 'Description',
        sortable: true,
        render: (row) => <span className="badge bg-info">{row.ProductType}</span>,
        align: 'center'
    },
    {
        field: 'Valuation',
        title: 'Valuation',
        sortable: true,
        render: (row) => <span className="badge bg-secondary">{row.Valuation}</span>,
        align: 'center'
    },
    {
        field: 'ExplodeKitItems',
        title: 'Explode Kit Items?',
        sortable: true,
        render: (row) => <span className="badge bg-primary">{row.ExplodeKitItems}</span>,
        align: 'end'
    },
]
const rowClassName = (row: ProductLine) => row.active ? '' : 'table-warning';

export default function TestTable() {
    const [sort, setSort] = useState<SortProps<ProductLine>>({field: 'ProductLine', ascending: true});
    const [list, setList] = useState<ProductLine[]>(productLines);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [visible, setVisible] = useState(true)
    const id = useId();
    const [fields, setFields] = useState(stdFields);


    useEffect(() => {
        setList([...productLines.sort(productLineSorter(sort))]);
        setPage(0)
    }, [sort]);

    const rowsPerPageChangeHandler = (rpp: number) => {
        setPage(0);
        setRowsPerPage(rpp);
    }

    const handleVisibleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const visible = ev.target.checked;
        setVisible(visible);
        const nextFields = fields.map(f => {
            switch (f.field) {
                case 'ProductLineDesc':
                    return {...f, collapse: !visible}
                default:
                    return f;
            }
        })
        setFields(nextFields)
    }

    return (
        <div>
            <input type="checkbox" checked={visible} id={id} onChange={handleVisibleChange}/>
            <label htmlFor={id}>Show Description</label>
            <SortableTable currentSort={sort} onChangeSort={setSort} fields={fields} size="lg" responsive
                           data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           keyField="ProductLine" rowClassName={rowClassName}/>
            <TablePagination page={page} onChangePage={setPage} size="sm"
                             rowsPerPage={rowsPerPage}
                             rowsPerPageProps={{
                                 onChange: rowsPerPageChangeHandler,
                                 label: <span className="bi-images" />,
                                 pageValues: [5, 10, 15, 25, 50, 100]
                             }}
                             showFirst={list.length > rowsPerPage}
                             showLast={list.length > rowsPerPage}
                             count={list.length}/>
        </div>

    )
}
