import type {DataTableProps} from "./types";
import DataTableProvider from "./DataTableProvider";
import DataTable from "./DataTable";


export default function StandaloneDataTable<T = unknown>({
                                    fields,
                                    ...rest
                                }: DataTableProps<T>) {
    return (
        <DataTableProvider initialFields={fields}>
            <DataTable {...rest}/>
        </DataTableProvider>
    )
}
StandaloneDataTable.displayName = 'StandaloneDataTable';
