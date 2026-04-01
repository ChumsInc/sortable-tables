import type {DataTableRowProps} from "./types";
import DataTableTR from "./DataTableTR";
import DataTableRowCellSet from "./DataTableRowCellSet";

export default function DataTableRow<T = unknown>({
                                                      fields,
                                                      className,
                                                      rowClassName,
                                                      selected,
                                                      row,
                                                      trRef,
                                                      onClick,
                                                      ...rest
                                                  }: DataTableRowProps<T>) {
    return (
        <DataTableTR<T> className={className} rowClassName={rowClassName}
                        row={row} selected={selected} trRef={trRef} onClick={onClick} {...rest} >
            <DataTableRowCellSet<T> fields={fields} row={row}/>
        </DataTableTR>
    )
}
DataTableRow.displayName = 'DataTableRow';
