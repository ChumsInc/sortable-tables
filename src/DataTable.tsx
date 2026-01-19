import type {DataTableProps} from "./types";
import DataTableProvider from "./DataTableProvider";
import ContainedDataTable from "./ContainedDataTable";


export default function DataTable<T = unknown>({
                                    fields,
                                    ...rest
                                }: DataTableProps<T>) {
    return (
        <DataTableProvider initialFields={fields}>
            <ContainedDataTable {...rest}/>
        </DataTableProvider>
    )
}
DataTable.displayName = 'DataTable';
