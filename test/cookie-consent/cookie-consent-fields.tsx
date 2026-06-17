import type {SortableTableField} from "../../src";
import type {CookieConsentHistoryRecord} from "chums-types";
import clsx from "clsx";

export const tableFields: SortableTableField<CookieConsentHistoryRecord>[] = [
    {field: 'uuid', title: 'Item', sortable: true, render: (row) => row.uuid},
    {field: 'email', title: 'Email', sortable: true},
    {
        field: 'preferences.functional',
        title: 'Functional',
        sortable: true,
        align: 'center',
        render: row => <span className={clsx({['bi-check']: row.preferences.functional})} />
    },
    {
        field: 'preferences.analytics',
        title: 'Analytics',
        sortable: true,
        align: 'center',
        render: row => <span className={clsx({['bi-check']: row.preferences.analytics})} />
    },
    {
        field: 'preferences.marketing',
        title: 'Marketing',
        sortable: true,
        align: 'center',
        render: row => <span className={clsx({['bi-check']: row.preferences.marketing})} />
    },
    {
        field: 'preferences.preferences',
        title: 'Preferences',
        sortable: true,
        align: 'center',
        render: row => <span className={clsx({['bi-check']: row.preferences.preferences})} />
    },
    {field: 'url', title: 'SKU', sortable: true},
    {
        field: 'changes',
        title: 'Updates',
        className: 'status-container',
        sortable: true,
        align: 'center',
        render: (row) => row.changes?.length ?? 0,
    },
    {field: 'dateExpires', title: 'Date Expires', sortable: true},
]
