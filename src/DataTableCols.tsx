import type {DataTableColProps} from "./types";
import styled from "@emotion/styled";
import clsx from "clsx";

const TableCol = styled.col`
    &.col-collapsed {
        visibility: collapse;
    } 
`

function DataTableCols<T = unknown>({fields}: DataTableColProps<T>) {

    return (
        <colgroup>
            {fields.map((field, index) => (
                <TableCol key={index}
                     className={clsx(field.colClassName, {'col-collapsed': field.collapse})}
                     span={field.colSpan ?? 1}/>
            ))}
        </colgroup>
    )
}

DataTableCols.displayName = 'DataTableCols';
export default DataTableCols;
