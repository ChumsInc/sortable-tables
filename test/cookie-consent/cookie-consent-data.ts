import type {CookieConsentHistoryRecord} from "chums-types";

export async function loadCookieConsentData(): Promise<CookieConsentHistoryRecord[]> {
    try {
        const url = '/api/user/v2/admin/cookie-consent/history.json'
        const res = await fetch(url);
        const json = await res.json();
        return json?.history ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("loadCookieConsentData()", err.message);
            return Promise.reject(err);
        }
        console.debug("loadCookieConsentData()", err);
        return Promise.reject(new Error('Error in loadCookieConsentData()'));
    }
}
