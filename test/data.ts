import type {SortProps} from "../src";

export interface ProductLine {
    ProductLine: string,
    ProductLineDesc: string,
    ProductType: string;
    Valuation: string;
    ExplodeKitItems: string;
    active: boolean;
}

export const productLines: ProductLine[] = [
    {
        "ProductLine": "A",
        "ProductLineDesc": "Watchbands",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "BC",
        "ProductLineDesc": "Beyond Coastal",
        "ProductType": "F",
        "Valuation": "5",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "CASE",
        "ProductLineDesc": "Accessory Cases & Bags",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "A",
        "active": true
    },
    {
        "ProductLine": "D",
        "ProductLineDesc": "Display Racks",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "E",
        "ProductLineDesc": "Retainers",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "E2",
        "ProductLineDesc": "Optical Accessories",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "F2",
        "ProductLineDesc": "Active Gear/Fitness",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "FGRM",
        "ProductLineDesc": "Finished Goods w/USA Step",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "FUSA",
        "ProductLineDesc": "#Freestyle USA Sales",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "A",
        "active": false
    },
    {
        "ProductLine": "G",
        "ProductLineDesc": "Chums Custom OEM",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "J",
        "ProductLineDesc": "Winter Products",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "JP",
        "ProductLineDesc": "Japan Products",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "A",
        "active": true
    },
    {
        "ProductLine": "K",
        "ProductLineDesc": "Keychains",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "L",
        "ProductLineDesc": "Wallets",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "M",
        "ProductLineDesc": "Misc Products",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "O",
        "ProductLineDesc": "Lip Balm/Lotion",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "P",
        "ProductLineDesc": "Paracord",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "A",
        "active": true
    },
    {
        "ProductLine": "POFG",
        "ProductLineDesc": "Purchased Items with WT",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "R",
        "ProductLineDesc": "Rep Sample Product",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "RBC",
        "ProductLineDesc": "#Rep Sample BeyondCoastal",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "A",
        "active": false
    },
    {
        "ProductLine": "RM",
        "ProductLineDesc": "Raw Materials",
        "ProductType": "R",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "RMLY",
        "ProductLineDesc": "Lanyard RHOOKS Sold",
        "ProductType": "R",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "S",
        "ProductLineDesc": "Promotional Products",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    },
    {
        "ProductLine": "T",
        "ProductLineDesc": "Kits",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "A",
        "active": true
    },
    {
        "ProductLine": "V",
        "ProductLineDesc": "Lanyards",
        "ProductType": "F",
        "Valuation": "2",
        "ExplodeKitItems": "P",
        "active": true
    }
];

export const productLineSorter = (sort: SortProps<ProductLine>) => (a: ProductLine, b: ProductLine) => {
    const {field, ascending} = sort;
    const sortMod = ascending === false ? -1 : 1;
    switch (field) {
        case 'ProductLine':
        case 'ProductLineDesc':
        case 'ProductType':
        case 'Valuation':
        case 'ExplodeKitItems':
            return (
                a[field].localeCompare(b[field]) === 0
                    ? a.ProductLine.localeCompare(b.ProductLine)
                    : a[field].localeCompare(b[field])
            ) * sortMod;
        default:
            return a.ProductLine.localeCompare(b.ProductLine)
    }
}
