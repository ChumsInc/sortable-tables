import { createContext as e, createElement as t, useCallback as n, useContext as r, useEffect as i, useId as a, useMemo as o, useState as s } from "react";
import c from "@emotion/styled";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region node_modules/clsx/dist/clsx.mjs
function f(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = f(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function p() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = f(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/Table.tsx
var m = c.table`
    --table-sticky-top: ${(e) => e.sticky ? "0" : void 0};

    thead {
        tr:nth-of-type(1) td,
        tr:nth-of-type(1) th {
            top: var(--table-sticky-top, unset);
            position: ${(e) => e.sticky ? "sticky" : "unset"};
            z-index: ${(e) => e.sticky ? 10 : "unset"};
            background: ${(e) => e.sticky ? "linear-gradient(var(--bs-table-bg) 75%, rgba(var(--bs-secondary-bg-rgb), 0.9))" : "unset"};
        }
    }
`;
function h({ sticky: e, responsive: t, children: n, className: r, ref: i, ...a }) {
	return t ? /* @__PURE__ */ u("div", {
		className: p(r, {
			"table-responsive": t === !0,
			[`table-responsive-${t}`]: t !== !0
		}),
		children: /* @__PURE__ */ u(m, {
			ref: i,
			...a,
			children: n
		})
	}) : /* @__PURE__ */ u(m, {
		className: r,
		sticky: e,
		ref: i,
		...a,
		children: n
	});
}
//#endregion
//#region src/DataTableTR.tsx
function g({ className: e, rowClassName: t, selected: n, row: r, trRef: i, onClick: a, children: o, ...s }) {
	let c = (e) => {
		a?.(r, e);
	}, l = typeof t == "function" ? t(r) : t;
	return r ? /* @__PURE__ */ u("tr", {
		ref: i,
		className: p({ "table-active": n }, e, l),
		onClick: c,
		...s,
		children: o
	}) : null;
}
g.displayName = "DataTableTR";
//#endregion
//#region src/DataTableCell.tsx
function _({ field: e, row: n, className: r, as: i, ...a }) {
	if (e.visible === !1) return null;
	let o = p({ [`text-${e.align}`]: !!e.align }, r, typeof e.className == "function" ? e.className(n) : e.className);
	return t(i ?? e.as ?? "td", {
		className: o,
		scope: (i ?? e.as) === "th" ? "row" : void 0,
		colSpan: e.colSpan,
		...e.cellProps,
		...a
	}, n[e.field] === void 0 && !e.render ? null : typeof e.render == "function" ? e.render(n) : n[e.field]);
}
_.displayName = "DataTableCell";
//#endregion
//#region src/DataTableRowCellSet.tsx
function v({ fields: e, row: t }) {
	return /* @__PURE__ */ u(l, { children: e.map((e, n) => /* @__PURE__ */ u(_, {
		field: e,
		row: t
	}, String(e?.id ?? n))) });
}
//#endregion
//#region src/DataTableContext.ts
var y = e(null);
//#endregion
//#region src/DataTableProvider.tsx
function b({ children: e, initialFields: t = [], initialSort: r = null }) {
	let [i, a] = s(t), [c, l] = s(r), d = n((e) => {
		a(e);
	}, []), f = n((e) => {
		l(e);
	}, []), p = n((e, t) => {
		a(i.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}, [i]), m = n((e) => i.find((t) => t.id === e), [i]), h = o(() => ({
		fields: i,
		setFields: d,
		sort: c,
		setSort: f,
		getField: m,
		updateField: p
	}), [
		i,
		d,
		c,
		f,
		p,
		m
	]);
	return /* @__PURE__ */ u(y.Provider, {
		value: h,
		children: e
	});
}
b.displayName = "DataTableProvider";
//#endregion
//#region src/DataTableTH.tsx
function x({ field: e, className: t, children: n, ...r }) {
	return e.visible === !1 ? null : /* @__PURE__ */ u("th", {
		className: p({ [`text-${e.align}`]: !!e.align }, t),
		scope: "col",
		...r,
		children: n ?? e.title
	});
}
x.displayName = "DataTableTH";
//#endregion
//#region src/useTableFields.ts
function S() {
	let e = r(y);
	if (!e) throw Error("useTableContext must be used within a DataTableProvider");
	return [e.fields, e.setFields];
}
//#endregion
//#region src/DataTableHead.tsx
function C({ ...e }) {
	let [t] = S();
	return /* @__PURE__ */ u("thead", {
		...e,
		children: /* @__PURE__ */ u("tr", { children: t.map((e, t) => /* @__PURE__ */ u(x, {
			...e.thProps,
			field: e,
			className: p(typeof e.className == "function" ? { [`text-${e.align}`]: !!e.align } : e.className)
		}, String(e.id ?? t))) })
	});
}
C.displayName = "DataTableHead";
//#endregion
//#region src/ContainedDataTable.tsx
function w({ className: e, size: t, responsive: n, sticky: r, data: i, keyField: a, rowClassName: o, renderRow: s, onSelectRow: c, selected: l, tableHeadProps: f, children: m, tfoot: g, ..._ }) {
	return /* @__PURE__ */ d(h, {
		sticky: r,
		responsive: n,
		className: p("table", e, { [`table-${t}`]: !!t }),
		..._,
		children: [
			/* @__PURE__ */ u(V, {}),
			/* @__PURE__ */ u(C, { ...f }),
			!!i.length && /* @__PURE__ */ u(O, {
				data: i,
				keyField: a,
				rowClassName: o,
				renderRow: s,
				onSelectRow: c,
				selected: l
			}),
			m,
			g
		]
	});
}
w.displayName = "ContainedDataTable";
//#endregion
//#region src/DataTable.tsx
function T({ fields: e, ...t }) {
	return /* @__PURE__ */ u(b, {
		initialFields: e,
		children: /* @__PURE__ */ u(w, { ...t })
	});
}
T.displayName = "DataTable";
//#endregion
//#region src/ContainedDataTableRow.tsx
function E({ className: e, rowClassName: t, selected: n, row: r, trRef: i, onClick: a, ...o }) {
	let [s] = S(), c = (e) => {
		a?.(r, e);
	}, l = typeof t == "function" ? t(r) : t;
	return r ? /* @__PURE__ */ u("tr", {
		ref: i,
		className: p({ "table-active": n }, e, l),
		onClick: c,
		...o,
		children: s.map((e, t) => /* @__PURE__ */ u(_, {
			field: e,
			row: r
		}, String(e?.id ?? t)))
	}) : null;
}
E.displayName = "ContainedDataTableRow";
//#endregion
//#region src/DataTableRow.tsx
function D({ fields: e, className: t, rowClassName: n, selected: r, row: i, trRef: a, onClick: o, ...s }) {
	return /* @__PURE__ */ u(g, {
		className: t,
		rowClassName: n,
		row: i,
		selected: r,
		trRef: a,
		onClick: o,
		...s,
		children: /* @__PURE__ */ u(v, {
			fields: e,
			row: i
		})
	});
}
D.displayName = "DataTableRow";
//#endregion
//#region src/DataTableTBody.tsx
function O({ data: e, keyField: t, rowClassName: n, renderRow: r, onSelectRow: i, selected: a = "", children: o, ...s }) {
	return /* @__PURE__ */ d("tbody", {
		...s,
		children: [e.map((e) => {
			let o = String(typeof t == "function" ? t(e) : e[t]), s = typeof a == "function" ? a(e) : o === a;
			return r ? r(e) : /* @__PURE__ */ u(E, {
				onClick: i,
				rowClassName: n,
				row: e,
				selected: s
			}, o);
		}), o]
	});
}
O.displayName = "DataTableTBody";
//#endregion
//#region src/useTableSort.ts
function k() {
	let e = r(y);
	if (!e) throw Error("useTableSort must be used within a DataTableProvider");
	return [e.sort, e.setSort];
}
//#endregion
//#region src/SortableTableTH.tsx
var A = (e) => {
	if (!e) return "flex-start";
	switch (e) {
		case "end": return "flex-end";
		default: return "center";
	}
}, j = c.div`
    display: flex;
    width: 100%;
    flex-direction: ${(e) => e.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(e) => A(e.align)};

    .sort-icon {
        flex-grow: ${(e) => e.align === "end" ? "1" : "0"};
        opacity: ${(e) => +!!e.sorted};
    }

    &:hover .sort-icon {
        color: ${(e) => e.sorted ? "unset" : "var(--bs-primary)"};
        opacity: 0.75;
        transition: opacity 0.2s;
    }
`;
function M({ field: e, sorted: t, ascending: n, className: r, onClick: i }) {
	if (e.visible === !1) return null;
	if (!e.sortable) return /* @__PURE__ */ u(x, {
		field: e,
		className: r
	});
	let { className: a, ...o } = e.thProps ?? {}, s = p(r, a, { [`text-${e.align}`]: !!e.align }), c = () => {
		i({
			field: e.field,
			ascending: t ? !n : !0
		});
	}, l = {
		"bi-arrow-down": n,
		"bi-arrow-up": !n
	};
	return /* @__PURE__ */ u("th", {
		...o,
		className: p("sortable", s),
		scope: "col",
		onClick: c,
		children: /* @__PURE__ */ d(j, {
			sorted: t,
			align: e.align,
			children: [/* @__PURE__ */ u("div", {
				className: "field-title",
				children: e.title
			}), /* @__PURE__ */ u("div", { className: p("me-1 sort-icon", l) })]
		})
	});
}
M.displayName = "SortableTableTH";
//#endregion
//#region src/SortableTableHead.tsx
function N({ onChangeSort: e }) {
	let [t] = S(), [n] = k();
	return /* @__PURE__ */ u("thead", { children: /* @__PURE__ */ u("tr", { children: t.map((t, r) => /* @__PURE__ */ u(M, {
		field: t,
		sorted: n?.field === t.field,
		ascending: n?.ascending,
		className: p(typeof t.className == "function" ? { [`text-${t.align}`]: !!t.align } : t.className),
		onClick: e
	}, r)) }) });
}
N.displayName = "SortableTableHead";
//#endregion
//#region src/SortableTableHeadWrapper.tsx
function P({ onChangeSort: e }) {
	let [t] = S(), [n] = k();
	return /* @__PURE__ */ u(N, {
		fields: t,
		currentSort: n,
		onChangeSort: e
	});
}
P.displayName = "SortableTableHeadWrapper";
//#endregion
//#region src/ContainedSortableTable.tsx
function F({ className: e, size: t, responsive: n, sticky: r, data: i, keyField: a, rowClassName: o, renderRow: s, onSelectRow: c, selected: l, tableHeadProps: f, children: m, tfoot: g, onChangeSort: _, ...v }) {
	return /* @__PURE__ */ d(h, {
		className: p("table", e, { [`table-${t}`]: !!t }),
		responsive: n,
		sticky: r,
		...v,
		children: [
			/* @__PURE__ */ u(V, {}),
			/* @__PURE__ */ u(P, {
				onChangeSort: _,
				...f
			}),
			!!i.length && /* @__PURE__ */ u(O, {
				data: i,
				keyField: a,
				rowClassName: o,
				renderRow: s,
				onSelectRow: c,
				selected: l
			}),
			m,
			g
		]
	});
}
F.displayName = "ContainedSortableTable";
//#endregion
//#region src/SortHelper.tsx
function I({ nextSort: e }) {
	let [, t] = k();
	return i(() => {
		console.log("setNextSort", e), t(e);
	}, [e, t]), null;
}
//#endregion
//#region src/SortableTable.tsx
function L({ fields: e, currentSort: t, ...n }) {
	return /* @__PURE__ */ d(b, {
		initialFields: e,
		initialSort: t,
		children: [/* @__PURE__ */ u(I, { nextSort: t }), /* @__PURE__ */ u(F, { ...n })]
	});
}
L.displayName = "SortableTable";
//#endregion
//#region src/RowsPerPage.tsx
var R = [
	10,
	25,
	50,
	100,
	250,
	500,
	1e3
];
function z({ value: e, pageValues: t = R, size: n, label: r, className: i, onChange: o, ...s }) {
	let c = a(), l = (e) => o(Number(e.target.value)), f = i ?? p("form-select", { [`form-select-${n}`]: !!n });
	return /* @__PURE__ */ d("div", {
		className: p("input-group", { [`input-group-${n}`]: !!n }),
		children: [/* @__PURE__ */ u("label", {
			className: "input-group-text",
			htmlFor: c,
			children: r ?? "Rows"
		}), /* @__PURE__ */ u("select", {
			className: f,
			id: c,
			value: e,
			onChange: l,
			...s,
			children: t.map((e) => /* @__PURE__ */ u("option", {
				value: e,
				children: e
			}, e))
		})]
	}, e);
}
z.displayName = "RowsPerPage";
//#endregion
//#region src/TablePagination.tsx
function B({ page: e, rowsPerPage: t, onChangePage: n, count: r, size: i, showFirst: a, showLast: o, className: s, rowsPerPageProps: c, ...l }) {
	let f = r === 0 ? 0 : e * t + 1, m = Math.min(e * t + t, r), h = t === 0 ? 0 : Math.floor((r - 1) / t), g = p("btn btn-link", { [`btn-${i}`]: !!i });
	return /* @__PURE__ */ d("div", {
		className: p("row g-3 justify-content-end", s),
		...l,
		children: [!!c && /* @__PURE__ */ u("div", {
			className: "col-auto",
			children: /* @__PURE__ */ u(z, {
				...c,
				value: t,
				size: i
			})
		}), /* @__PURE__ */ u("div", {
			className: "col-auto",
			children: /* @__PURE__ */ d("div", {
				className: "row g-3 flex-nowrap align-items-baseline",
				children: [
					/* @__PURE__ */ d("div", {
						className: "col-auto",
						children: [
							f,
							"-",
							m,
							" of ",
							r
						]
					}),
					a && /* @__PURE__ */ u("div", {
						className: "col-auto",
						children: /* @__PURE__ */ u("button", {
							className: g,
							disabled: e === 0,
							onClick: () => n(0),
							"aria-label": "First page",
							children: /* @__PURE__ */ u("span", {
								className: "bi-chevron-bar-left",
								"aria-hidden": "true"
							})
						})
					}),
					/* @__PURE__ */ u("div", {
						className: "col-auto",
						children: /* @__PURE__ */ u("button", {
							className: g,
							disabled: e === 0,
							onClick: () => n(e - 1),
							"aria-label": "Previous page",
							children: /* @__PURE__ */ u("span", {
								className: "bi-chevron-left",
								"aria-hidden": "true"
							})
						})
					}),
					/* @__PURE__ */ u("div", {
						className: "col-auto",
						children: /* @__PURE__ */ u("button", {
							className: g,
							disabled: e >= h,
							onClick: () => n(e + 1),
							"aria-label": "Next page",
							children: /* @__PURE__ */ u("span", {
								className: "bi-chevron-right",
								"aria-hidden": "true"
							})
						})
					}),
					o && /* @__PURE__ */ u("div", {
						className: "col-auto",
						children: /* @__PURE__ */ u("button", {
							className: g,
							disabled: e >= h,
							onClick: () => n(h),
							"aria-label": "Last page",
							children: /* @__PURE__ */ u("span", {
								className: "bi-chevron-bar-right",
								"aria-hidden": "true"
							})
						})
					})
				]
			})
		})]
	});
}
B.displayname = "TablePagination";
//#endregion
//#region src/DataTableCols.tsx
function V() {
	let [e] = S();
	return /* @__PURE__ */ u("colgroup", { children: e.filter((e) => e.visible !== !1).map((e, t) => /* @__PURE__ */ u("col", {
		className: e.colClassName,
		span: e.colSpan ?? 1
	}, t)) });
}
V.displayName = "DataTableCols";
//#endregion
//#region src/useField.ts
function H(e) {
	let t = r(y);
	if (!t) throw Error("useField must be used within a DataTableProvider");
	return [t.fields.find((t) => t.id === e) ?? null, t.updateField];
}
//#endregion
//#region src/useTableContext.ts
function U() {
	let e = r(y);
	if (!e) throw Error("useTableContext must be used within a DataTableProvider");
	return e;
}
//#endregion
export { w as ContainedDataTable, E as ContainedDataTableRow, F as ContainedSortableTable, T as DataTable, _ as DataTableCell, V as DataTableCols, y as DataTableContext, b as DataTableProvider, D as DataTableRow, v as DataTableRowCellSet, O as DataTableTBody, x as DataTableTH, g as DataTableTR, z as RowsPerPage, L as SortableTable, N as SortableTableHead, M as SortableTableTH, h as Table, B as TablePagination, H as useField, U as useTableContext, S as useTableFields, k as useTableSort };

//# sourceMappingURL=index.es.js.map