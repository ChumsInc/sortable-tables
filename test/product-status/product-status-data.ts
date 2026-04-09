import type {ItemRecord} from "./product-status-types";

export async function loadProductStatusData(): Promise<ItemRecord[]> {
    try {
        const url = `/api/operations/production/item/status/chums/?itemCode=12115`;
        const res = await fetch(url);
        const json = await res.json();
        return json?.result ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("loadProductStatusData()", err.message);
            return Promise.reject(err);
        }
        console.debug("loadProductStatusData()", err);
        return Promise.reject(new Error('Error in loadProductStatusData()'));
    }
}
