import type {SortableTableField} from "../src";
import type {ProductLine} from "./data";
import React from "react";

export const tableFields: SortableTableField<ProductLine>[] = [
    {
        id: 'prodLine',
        field: 'ProductLine',
        title: 'Prod Line',
        sortable: true,
        as: 'th'
    },
    {
        id: 'ProductLineDesc',
        field: 'ProductLineDesc',
        title: 'Description',
        sortable: true,
        visible: false,
    },
    {
        id: 'prodType',
        field: 'ProductType',
        title: 'Description',
        sortable: true,
        render: (row) => <span className="badge bg-info">{row.ProductType}</span>,
        align: 'center'
    },
    {
        id: 'valuation',
        field: 'Valuation',
        title: 'Valuation',
        sortable: true,
        render: (row) => <span className="badge bg-secondary">{row.Valuation}</span>,
        align: 'center'
    },
    {
        id: 'explodeKit',
        field: 'ExplodeKitItems',
        title: 'Explode Kit Items?',
        sortable: true,
        render: (row) => <span className="badge bg-primary">{row.ExplodeKitItems}</span>,
        align: 'end'
    },
    {
        id: 'active',
        field: 'active',
        title: 'Active?',
        sortable: true,
        align: 'center',
        render: (row) => <span className={`badge ${row.active ? 'bg-success' : 'bg-danger'}`}>{row.active ? 'Yes' : 'No'}</span>,
    }
]
