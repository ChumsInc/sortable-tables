import React from 'react';
import classNames from "classnames";
export default function DataTableCell({ field, row, className, as, ...rest }) {
    const cellClassName = classNames({ [`text-${field.align}`]: !!field.align }, className, typeof field.className === 'function' ? field.className(row) : field.className);
    return React.createElement((as ?? field.as) ?? 'td', {
        className: cellClassName,
        scope: (as ?? field.as) === 'th' ? 'row' : undefined,
        colSpan: field.colSpan,
        ...field.cellProps,
        ...rest
    }, row[field.field] === undefined
        ? null
        : (typeof field.render === 'function'
            ? field.render(row)
            : row[field.field]));
}
//# sourceMappingURL=DataTableCell.js.map