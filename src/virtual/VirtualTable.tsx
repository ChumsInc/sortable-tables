import type {VirtualTableProps} from "./VirtualTableTypes";
import DataTableProvider from "../DataTableProvider";
import {SortHelper} from "../SortHelper";
import ContainedVirtualTable from "./ContainedVirtualTable";

export default function VirtualTable<T = unknown>({
                                                      data,
                                                      fields,
                                                      keyField,
                                                      currentSort,
                                                      onChangeSort,
                                                      ...rest
                                                  }: VirtualTableProps<T>) {

    return (
        <DataTableProvider initialFields={fields}>
            <SortHelper nextSort={currentSort}/>
            <ContainedVirtualTable onChangeSort={onChangeSort} data={data} keyField={keyField} {...rest} />
        </DataTableProvider>
    )

}
