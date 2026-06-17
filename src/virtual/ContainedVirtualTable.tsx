import type {VirtualTableProps} from "./VirtualTableTypes";
import {useScreenHeight} from "./useScreenHeight";
import {useEffect, useState} from "react";
import {type TableComponents, TableVirtuoso} from "react-virtuoso";
import Table from "../Table";
import DataTableTR from "../DataTableTR";
import {getRowHeight} from "./size-utils";
import FixedHeaderContent from "./FixedHeaderContent";
import clsx from "clsx";
import ItemContent from "./ItemContent";
import VirtualTableContainer from "./VirtualTableContainer";

export default function ContainedVirtualTable<T = unknown>({
                                                               rowHeight,
                                                               headerHeight,
                                                               maxHeight,
                                                               className,
                                                               size,
                                                               data,
                                                               keyField,
                                                               rowClassName,
                                                               renderRow,
                                                               onSelectRow,
                                                               selected,
                                                               tfoot,
                                                               onChangeSort,
                                                               containerProps,
                                                               ...rest
                                                           }: Omit<VirtualTableProps<T>, 'fields' | 'currentSort'>) {
    const screenHeight = useScreenHeight();
    const vRowHeight = rowHeight ?? getRowHeight(size);
    const vHeaderHeight = headerHeight ?? getRowHeight(size);
    const [vMaxHeight, setVMaxHeight] = useState(maxHeight ?? screenHeight);
    const [tableHeight, setTableHeight] = useState(vMaxHeight);

    useEffect(() => {
        setVMaxHeight(maxHeight ?? screenHeight);
    }, [maxHeight, screenHeight]);


    const handleTotalHeightChange = (totalHeight: number) => {
        const calculatedHeight = totalHeight + vHeaderHeight;
        setTableHeight(Math.min(calculatedHeight, vMaxHeight));
    }

    const tableClassName = clsx('table', className, {
        [`table-${size}`]: !!size,
    })

    const components: TableComponents<T> = {
        Table: ({children, style}) => (
            <Table style={style} className={tableClassName} {...rest}>
                {children}
            </Table>
        ),
        TableRow: ({children, item, ...rest}) => {
            const keyValue = String(typeof keyField === "function" ? keyField(item) : item[keyField]);
            const isSelected = typeof selected === 'function' ? selected(item) : keyValue === selected;
            return (
            <DataTableTR row={item} {...rest} onClick={onSelectRow} rowClassName={rowClassName} selected={isSelected}>
                {children}
            </DataTableTR>
            )
        },
        TableFoot: () => (tfoot ? tfoot : null)
    }

    const fixedHeaderContent = () => {
        return (<FixedHeaderContent onChangeSort={onChangeSort}/>)
    }

    return (
        <VirtualTableContainer {...containerProps} style={{...containerProps?.style, height: tableHeight}}>
            <TableVirtuoso<T> data={data} components={components}
                              totalListHeightChanged={handleTotalHeightChange}
                              fixedItemHeight={vRowHeight}
                              fixedHeaderContent={fixedHeaderContent}
                              itemContent={(_index, row) => {

                                  return (
                                      <ItemContent row={row} key={_index} renderRow={renderRow}/>
                                  )
                              }}
            />
        </VirtualTableContainer>
    )

}
