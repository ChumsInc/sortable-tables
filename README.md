# sortable-tables
![Chums Logo](https://intranet.chums.com/images/chums/chums-badge-120x120.png "Chums Logo")

# CHUMS Sortable Table Component
A strongly typed Table Component package to replace parts of the `chums-components` package.

This components uses [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/content/tables/) tables class names, with 
additional table size 'xs' for less padding.

## Usage
Typical Usage:
```tsx
import {SortableTable, SortableTableField, SortProps} from "@chumsinc/sortable-tables";
import {ProductLine} from 'chums-type'

const fields: SortableTableField<ProductLine>[] = [
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
];

export default function ProductLinesList() {
  const [sort, setSort] = useState<SortProps<ProductLine>>({field: 'ProductLine', ascending: true});
  const [list, setList] = useState<ProductLine[]>(productLines);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    setList([...productLines.sort(productLineSorter(sort))]);
    setPage(0)
  }, [sort]);

  const rowsPerPageChangeHandler = (rpp: number) => {
    setPage(0);
    setRowsPerPage(rpp);
  }

  return (
          <div>
            <SortableTable currentSort={sort} onChangeSort={setSort} fields={fields} size="lg" responsive
                           data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           keyField="ProductLine" rowClassName={rowClassName}/>
            <TablePagination page={page} onChangePage={setPage} size="sm"
                             rowsPerPage={rowsPerPage}
                             rowsPerPageProps={{
                               onChange: rowsPerPageChangeHandler,
                               pageValues: [5, 10, 15, 25, 50, 100]
                             }}
                             showFirst={list.length > rowsPerPage}
                             showLast={list.length > rowsPerPage}
                             count={list.length}/>
          </div>
  )
} 
```

## Breaking Changes
Breaking changes from `chums-components`
- TablePagination
  - The rows per page options were moved to a new attribute `rowsPerPageProps`
  - RowsPerPage now renders as a bootstrap InputGroup element
