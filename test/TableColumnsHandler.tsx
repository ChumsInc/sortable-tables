import {useTableContext} from "../src";
import React, {useCallback, useId} from "react";
import type {ProductLine} from "./data";

export default function TableColumnsHandler() {
    const {updateField, getField} = useTableContext<ProductLine>();
    const [collapse, setCollapse] = React.useState<boolean>(getField('ProductLineDesc')?.collapse ?? false);
    // const {sort} = useTableSort();
    const id = useId();

    const toggleFieldCollapse = useCallback((key: string, next: boolean) => {
        console.debug('toggleFieldVisibility', key, next);
        updateField(key, {collapse: next})
        setCollapse(next);
    }, [updateField]);

    const handleVisibleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        toggleFieldCollapse('ProductLineDesc', ev.target.checked);
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem'}}>
            <input type="checkbox" checked={collapse} id={id} onChange={handleVisibleChange}/>
            <label htmlFor={id}>Hide Description</label>
            {/*<code>{JSON.stringify(sort)}</code>*/}
        </div>
    )
}
