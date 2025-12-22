import {useTableContext} from "../src";
import React, {useCallback, useId} from "react";
import type {ProductLine} from "./data";

export default function TableColumnsHandler() {
    const {updateField, getField} = useTableContext<ProductLine>();
    const [visible, setVisible] = React.useState<boolean>(getField('ProductLineDesc')?.visible ?? true);
    // const {sort} = useTableSort();
    const id = useId();

    const toggleFieldCollapse = useCallback((key: string, next: boolean) => {
        console.debug('toggleFieldVisibility', key, next);
        updateField(key, {visible: next})
        setVisible(next);
    }, [updateField]);

    const handleVisibleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        toggleFieldCollapse('ProductLineDesc', ev.target.checked);
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem'}}>
            <input type="checkbox" checked={visible} id={id} onChange={handleVisibleChange}/>
            <label htmlFor={id}>Show Description</label>
            {/*<code>{JSON.stringify(sort)}</code>*/}
        </div>
    )
}
