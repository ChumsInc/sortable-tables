import styled from "@emotion/styled";
import clsx from "clsx";
import {useTableFields} from "./useTableFields";


const TableCol = styled.col`
    &.col-collapsed {
        visibility: collapse;
    }
`

export default function DataTableCols<T = unknown>() {
    const [fields] = useTableFields<T>()
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

