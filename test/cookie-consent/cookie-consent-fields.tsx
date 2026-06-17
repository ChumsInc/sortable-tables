import type {SortableTableField} from "../../src";
import type {CookieConsentHistoryRecord} from "chums-types";

export const tableFields: SortableTableField<CookieConsentHistoryRecord>[] = [
    {field: 'uuid', title: 'Item', sortable: true, render: (row) => row.uuid},
    {field: 'email', title: 'Email', sortable: true},
    {field: 'preferences.functional', title: 'Functional', sortable: true, render: row => row.preferences.functional ? 1 : 0},
    {field: 'preferences.analytics', title: 'Analytics', sortable: true, render: row => row.preferences.analytics ? 1 : 0},
    {field: 'preferences.marketing', title: 'Marketing', sortable: true, render: row => row.preferences.marketing ? 1 : 0},
    {field: 'preferences.preferences', title: 'Preferences', sortable: true, render: row => row.preferences.preferences ? 1 : 0},
    {field: 'url', title: 'SKU', sortable: true},
    {
        field: 'changes',
        title: 'Updates',
        className: 'status-container',
        sortable: true,
        render: (row) => row.changes?.length ?? 0,
    },
    {field: 'dateExpires', title: 'Date Expires', sortable: true},
]
