import {useId, useState} from "react";
import {DataTableProvider, type SortProps, StandaloneSortableTable} from "../src";
import {type ProductLine, productLines, productLineSorter} from "./data";
import {tableFields} from "./tableFields";
import TestTable from "./TestTable";

export default function Main() {
    const initialSort: SortProps<ProductLine> = {field: 'ProductLine', ascending: true};
    const [list, setList] = useState<ProductLine[]>([...productLines].sort(productLineSorter(initialSort)));
    const [sort, setSort] = useState<SortProps<ProductLine>>(initialSort);
    const [withProvider, setWithProvider] = useState(true);
    const idProviderCheckbox = useId();

    const sortChangeHandler = (sort: SortProps<ProductLine>) => {
        setList([...productLines.sort(productLineSorter(sort))])
        setSort(sort);
    }

    return (
        <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id={idProviderCheckbox} checked={withProvider}
                       onChange={e => setWithProvider(e.target.checked)}/>
                <label className="form-check-label" htmlFor={idProviderCheckbox}>With DataTableProvider</label>
            </div>
            {withProvider && (
                <DataTableProvider initialFields={tableFields} initialSort={initialSort}>
                    <TestTable data={list} onChangeSort={sortChangeHandler}/>
                </DataTableProvider>
            )}
            {!withProvider && <StandaloneSortableTable fields={tableFields.map(f => ({...f, visible: true}))} data={list}
                                                       keyField={(row) => row.ProductLine}
                                                       currentSort={sort} onChangeSort={sortChangeHandler}/>
            }
        </div>
    )
}
