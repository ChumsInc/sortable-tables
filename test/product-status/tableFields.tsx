import type {SortableTableField} from "@chumsinc/sortable-tables";
import type {ItemRecord} from "./product-status-types";

export const tableFields: SortableTableField<ItemRecord>[] = [
    {field: 'ItemCode', title: 'Item', sortable: true, render: (item) => item.ItemCode},
    {field: 'WarehouseCode', title: 'Whse', sortable: true},
    {field: 'ItemCodeDesc', title: 'Description', sortable: true},
    {field: 'ProductLine', title: 'P/L', sortable: true},
    {field: 'Category2', title: 'Category', sortable: true},
    {field: 'Category3', title: 'Collection', sortable: true},
    {field: 'Category4', title: 'SKU', sortable: true},
    {
        field: 'ItemStatus',
        title: 'Status',
        className: 'status-container',
        sortable: true,
        render: (row) => JSON.stringify(row.ItemStatus)
    },
    {
        field: 'QuantityOnHand',
        title: 'Qty On Hand',
        render: ({QuantityOnHand}) => QuantityOnHand,
        align: 'end',
        sortable: true
    },
    {
        field: 'QuantityAvailable',
        title: 'Qty Available',
        align: 'end',
        sortable: true
    },
    {
        field: 'AverageUnitCost',
        title: 'Item Cost',
        align: 'end',
        sortable: true
    },
    {
        field: 'QuantityAvailableCost',
        title: 'Ext Cost',
        align: 'end',
        sortable: true
    },

]
