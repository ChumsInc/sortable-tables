import ContainedDataTableRow from "./ContainedDataTableRow";
import type {DataTableTBodyProps} from "./types";


export default function DataTableTBody<T = unknown>({
                                         data,
                                         keyField,
                                         rowClassName,
                                         renderRow,
                                         onSelectRow,
                                         selected = '',
                                         children,
                                         ...rest
                                     }: DataTableTBodyProps<T>) {
    return (
        <tbody {...rest}>
        {data.map(row => {
            const keyValue = String(typeof keyField === "function" ? keyField(row) : row[keyField]);
            const isSelected = typeof selected === 'function' ? selected(row) : keyValue === selected;
            if (renderRow) {
                return renderRow(row);
            }
            return (
                <ContainedDataTableRow key={keyValue} onClick={onSelectRow}
                                       rowClassName={rowClassName}
                                       row={row} selected={isSelected}/>
            )
        })}
        {children}
        </tbody>
    )
}
DataTableTBody.displayName = 'DataTableTBody';
