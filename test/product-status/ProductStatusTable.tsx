import {useCallback, useEffect, useState} from 'react';
import {DataTableRowCellSet, DataTableTR, SortableTableTH, type SortProps, Table} from "@chumsinc/sortable-tables";
import {type TableComponents, TableVirtuoso} from "react-virtuoso";
import type {ItemRecord} from "./product-status-types";
import {loadProductStatusData} from "./product-status-data";
import {tableFields} from "./tableFields";
import {itemSorter} from "./utils";
import VirtualTableContainer from "../virtuoso/VirtualTableContainer";

export interface VirtualTableProps {
    maxRows?: number;
    rowHeight?: number;
    headerHeight?: number;
    maxHeight?: number;
}

export default function ProductStatusTable({maxRows, rowHeight = 33, maxHeight = 500, headerHeight = 33}: VirtualTableProps) {
    const [dataList, setDataList] = useState<ItemRecord[]>([]);
    const [sort, setSort] = useState<SortProps<ItemRecord>>({field: 'ItemCode', ascending: true});
    const [tableHeight, setTableHeight] = useState(maxHeight);
    const loadData = useCallback(async () => {
        const data = await loadProductStatusData();
        setDataList(data.slice(0, maxRows ?? data.length));

    }, [maxRows]);

    useEffect(() => {
        if (!maxRows || maxRows > dataList.length) {
            loadData().catch(err => console.error(err));
            return;
        }
        setDataList(dataList.slice(0, maxRows));
    }, [maxRows, dataList.length]);

    // Calculate height based on rows or max limit
    const handleTotalHeightChange = (totalHeight: number) => {
        const calculatedHeight = totalHeight + headerHeight;
        setTableHeight(Math.min(calculatedHeight, maxHeight));
    };
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
        <VirtualTableContainer style={{height: tableHeight, transition: 'height 0.3s ease-in-out'}}>
            <TableVirtuoso data={dataList}
                           components={components}
                           totalListHeightChanged={handleTotalHeightChange}
                           fixedItemHeight={rowHeight}
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
        </VirtualTableContainer>
    )
}
