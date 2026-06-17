import {useCallback, useEffect, useState} from "react";
import {VirtualTable} from "../../src";
import {tableFields} from "./cookie-consent-fields";
import type {CookieConsentHistoryRecord, SortProps} from "chums-types";
import {loadCookieConsentData} from "./cookie-consent-data";
import {consentSorter} from "./utils";


export interface VirtualTableProps {
    maxRows?: number;
    rowHeight?: number;
    headerHeight?: number;
    maxHeight?: number;
}

export default function CookieConsentTable({
                                               maxRows,
                                           }: VirtualTableProps) {
    const [dataList, setDataList] = useState<CookieConsentHistoryRecord[]>([]);
    const [sort, setSort] = useState<SortProps<CookieConsentHistoryRecord>>({field: 'uuid', ascending: true});
    const loadData = useCallback(async () => {
        const data = await loadCookieConsentData();
        setDataList(data.slice(0, maxRows ?? data.length));

    }, [maxRows]);

    useEffect(() => {
        if (!maxRows || maxRows > dataList.length) {
            loadData().catch(err => console.error(err));
            return;
        }
        setDataList(dataList.slice(0, maxRows));
    }, [maxRows, dataList.length]);

    // Calculate height based on rows or max limit
    useEffect(() => {
        loadData().catch(err => console.error(err));
    }, []);

    const sortChangeHandler = (sort: SortProps<CookieConsentHistoryRecord>) => {
        console.log('sortChangeHandler', sort);
        setSort(sort);
    }

    const list = [...dataList].sort(consentSorter(sort));

    return (
        <VirtualTable fields={tableFields} currentSort={sort} onChangeSort={sortChangeHandler} data={list} keyField="uuid"
                      containerProps={{style: {maxHeight: '70vh'}}}
                      size="sm"/>
    )
}
