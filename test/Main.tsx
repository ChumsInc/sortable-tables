import {type ChangeEvent, useId, useState} from "react";
import TestSortableTable from "./SortableTable/TestSortableTable";
import TestCookieConsentTable from "./cookie-consent/TestCookieConsentTable";
import TestProductStatus from "./product-status/TestProductStatus";

type TableOption = 'sortable' | 'product-status' | 'cookie-consent';

export default function Main() {
    const id = useId();
    const [value, setValue] = useState<TableOption>('cookie-consent');

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        setValue(ev.target.value as TableOption);
    }

    return (
        <div>
            <h1>Sortable Tables Testing</h1>
            <div className="row g-3">
                <div className="col-auto">
                    <label htmlFor={id}>Test Option</label>
                </div>
                <div className="col-auto">
                    <select className="form-select form-select-sm" id={id}
                            value={value} onChange={changeHandler}>
                        <option value="sortable">Sortable</option>
                        <option value="product-status">Product Status</option>
                        <option value="cookie-consent">Cookie Consent</option>
                    </select>
                </div>
            </div>
            {value === 'sortable' && <TestSortableTable/>}
            {value === 'cookie-consent' && <TestCookieConsentTable/>}
            {value === 'product-status' && <TestProductStatus/>}
        </div>
    )
}
