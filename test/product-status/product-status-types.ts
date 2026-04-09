export interface ItemRecord {
    ItemCode: string;
    ItemCodeDesc: string;
    ProductType: ProductType;
    ProductLine: string;
    Category2: string | null;
    Category3: string | null;
    Category4: string | null;
    InactiveItem: 'Y' | 'N';
    WarehouseCode: string;
    QuantityOnHand: string|number;
    QuantityOnSalesOrder: string|number;
    QuantityOnBackOrder: string|number;
    QuantityOnPurchaseOrder: string|number;
    QuantityOnWorkOrder: string|number;
    QuantityRequiredForWO: string|number;
    QuantityOnMaterialReq: string|number;
    QuantityAvailable: string|number;
    StandardUnitCost: string|number;
    AverageUnitCost: string|number;
    QuantityAvailableCost: string|number;
    selected?: boolean;
    changed?: boolean;
    ItemStatus: string;
    BinLocation: string | null;
    ReorderMethod: ReorderMethod;
    ReorderPointQty: string|number;
    EconomicOrderQty: string|number;
    MaximumOnHandQty: string|number;
    MinimumOrderQty: string|number;
    PrimaryVendorNo: string;
    ItemStatusHistory?: ItemStatusHistory[];
}

export type ProductType = 'F' | 'K' | 'R' | 'D';
export type ReorderMethod = 'E' | 'M' | 'R' | null;
export interface ItemStatusHistory {
    date: string;
    status: string | null;
    user: number
}
export type ItemKeyProps = Pick<ItemRecord, 'ItemCode' | 'WarehouseCode'>
