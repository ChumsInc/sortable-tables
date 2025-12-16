import type {DataTableProps} from "./types";
import TableProvider from "./TableProvider";
import DataTableWithContext from "./DataTableWithContext";


function DataTable<T = unknown>({
                                    fields,
                                    ...rest
                                }: DataTableProps<T>) {
    return (
        <TableProvider initialFields={fields}>
            <DataTableWithContext {...rest}/>
        </TableProvider>
    )
}

DataTable.displayName = 'DataTable';
export default DataTable;
