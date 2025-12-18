import {useState} from "react";
import {DataTableProvider, type SortProps} from "../src";
import {type ProductLine, productLines, productLineSorter} from "./data";
import {tableFields} from "./tableFields";
import TestTable from "./TestTable";

export default function Main() {
    const initialSort: SortProps<ProductLine> = {field: 'ProductLine', ascending: true};
    const [list, setList] = useState<ProductLine[]>([...productLines].sort(productLineSorter(initialSort)));

    const sortChangeHandler = (sort: SortProps<ProductLine>) => {
        setList([...productLines.sort(productLineSorter(sort))])
    }

    return (
        <DataTableProvider initialFields={tableFields} initialSort={initialSort}>
            <TestTable data={list} onChangeSort={sortChangeHandler}/>
        </DataTableProvider>
    )
}
