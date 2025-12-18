import type {SortProps} from "../src";
import type {ProductLine} from "./data";

export const productLineSorter = (sort: SortProps<ProductLine>) => (a: ProductLine, b: ProductLine) => {
    const {field, ascending} = sort;
    const sortMod = ascending === false ? -1 : 1;
    switch (field) {
        case 'ProductLine':
        case 'ProductLineDesc':
        case 'ProductType':
        case 'Valuation':
            return (a[field].localeCompare(b[field]) === 0
                    ? a.ProductLine.localeCompare(b.ProductLine)
                    : a[field].localeCompare(b[field])
            ) * sortMod;
        default:
            return a.ProductLine.localeCompare(b.ProductLine) * sortMod;
    }
}
