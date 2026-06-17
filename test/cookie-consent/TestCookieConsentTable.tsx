import {type ChangeEvent, useState} from "react";
import CookieConsentTable from "./CookieConsentTable";

export default function TestCookieConsentTable() {
    const [rows, setRows] = useState<number>(50);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.target.value === '') return;
        setRows(Number(ev.target.value));
    }

    return (
        <div>
            <h2>Cookie Consent Table Testing</h2>
            <div className="row g-3">
                <div className="col-auto">
                    <label htmlFor="virtual-table-size">Virtual Table Size</label>
                    <input type="number" className="form-control form-control-sm" id="virtual-table-size" min="0"
                           value={rows} onChange={changeHandler}/>
                </div>
            </div>
            <CookieConsentTable maxRows={rows}/>
            <div className="alert alert-info">Stuff below the table</div>
        </div>
    )
}
