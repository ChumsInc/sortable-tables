import {useEffect, useState} from 'react';
import {DataTableRowCellSet, DataTableTR, SortableTableTH, type SortProps, Table} from "../../src";
import ProductStatusContainer from "./ProductStatusContainer";
import {type TableComponents, TableVirtuoso} from "react-virtuoso";
import type {ItemRecord} from "./product-status-types";
import {loadProductStatusData} from "./product-status-data";
import {tableFields} from "./tableFields";
import {itemSorter} from "./utils";


export default function TestVirtualTable() {
    const [dataList, setDataList] = useState<ItemRecord[]>([]);
    const [sort, setSort] = useState<SortProps<ItemRecord>>({field: 'ItemCode', ascending: true});

    const loadData = async () => {
        const data = await loadProductStatusData();
        setDataList(data);
    }
    useEffect(() => {
        loadData().catch(err => console.error(err));
    }, []);

    const sortChangeHandler = (sort: SortProps<ItemRecord>) => {
        setDataList([...dataList].sort(itemSorter(sort)))
        setSort(sort);
    }


    const components: TableComponents<ItemRecord> = {
        Table: ({children, style}) => (
            <Table style={style} className="table table-sm table-hover">{children}</Table>
        ),
        TableRow: ({children, item, ...rest}) => (
            <DataTableTR row={item} {...rest}>
                {children}
            </DataTableTR>
        )
    }

    return (
        <ProductStatusContainer>
            <TableVirtuoso data={dataList}
                           components={components}
                           fixedHeaderContent={() => (
                               <tr>
                                   {tableFields.map((field, index) => (
                                       <SortableTableTH key={index}
                                                        field={field}
                                                        sorted={sort.field === field.field}
                                                        ascending={sort.ascending}
                                                        onClick={sortChangeHandler}/>
                                   ))}
                               </tr>
                           )}
                           itemContent={(_index, row) => (
                               <DataTableRowCellSet fields={tableFields} row={row}/>
                           )}

            />
        </ProductStatusContainer>
    )
}
