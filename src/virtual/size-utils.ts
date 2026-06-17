import type {UITableSize} from "../types";

export const getRowHeight = (size?: UITableSize) => {
    switch (size) {
        case 'sm':
            return 33; // default row height for bootstrap small table
        case 'xs':
            return 24; // default row height for Chums extra small table
        default:
            return 41; // default row height for bootstrap
    }
}
