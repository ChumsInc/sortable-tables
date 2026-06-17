import type {VirtualTableProps} from "./VirtualTableTypes";
import {useEffect, useState} from "react";
import {getRowHeight} from "./size-utils";
import {useScreenHeight} from "./useScreenHeight";
import VirtualTableContainer from "./VirtualTableContainer";
import {type TableComponents, TableVirtuoso} from "react-virtuoso";
import clsx from "clsx";
import Table from "../Table";
import {DataTableTR} from "../index";
import DataTableProvider from "../DataTableProvider";
import FixedHeaderContent from "./FixedHeaderContent";
import ItemContent from "./ItemContent";

export default function VirtualTable<T = unknown>({
                                                      containerProps,
                                                      size,
                                                      rowHeight,
                                                      maxHeight,
                                                      headerHeight,
                                                      data,
                                                      className,
                                                      fields,
                                                      keyField,
                                                      onSelectRow,
                                                      selected,
                                                      ...rest
                                                  }: VirtualTableProps<T>) {
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
        TableRow: ({children, item, ...rest}) => (
            <DataTableTR row={item} {...rest}>
                {children}
            </DataTableTR>
        )
    }

    const fixedHeaderContent = () => {
        return (<FixedHeaderContent />)
    }

    return (
        <DataTableProvider initialFields={fields}>
            <VirtualTableContainer {...containerProps} style={{...containerProps?.style, height: tableHeight}}>
                <TableVirtuoso<T> data={data} components={components}
                                  totalListHeightChanged={handleTotalHeightChange}
                                  fixedItemHeight={vRowHeight}
                                  fixedHeaderContent={fixedHeaderContent}
                                  itemContent={(_index, row) => {
                                      const keyValue = String(typeof keyField === "function" ? keyField(row) : row[keyField]);
                                      const isSelected = typeof selected === 'function' ? selected(row) : keyValue === selected;
                                      return (
                                          <ItemContent row={row} key={_index} onClick={onSelectRow}
                                                       selected={isSelected}/>
                                      )
                                  }}
                />
            </VirtualTableContainer>
        </DataTableProvider>
    )

}
