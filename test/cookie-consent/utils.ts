import type {CookieConsentHistoryRecord, CookieConsentSettings, SortFactory} from "chums-types";

export const consentSorter: SortFactory<CookieConsentHistoryRecord> = (sort) => (a, b) => {
    const field = sort.field;
    const sortMod = sort.ascending ? 1 : -1;
    switch (field) {
        case 'uuid':
        case 'url':
            return a[field].toLocaleLowerCase().localeCompare(b[field].toLowerCase()) * sortMod;
        case 'email':
            return (a[field] ?? '').toLocaleLowerCase().localeCompare((b[field] ?? '').toLocaleLowerCase());
        case 'preferences.analytics':
        case 'preferences.preferences':
        case 'preferences.functional':
        case 'preferences.marketing': {
            const subField = field.split('.')[1] as keyof CookieConsentSettings;
            return (+(a.preferences[subField]) - +(b.preferences[subField])) * sortMod;
        }
        default:
            return a.uuid.localeCompare(b.uuid) * sortMod;
    }
}
