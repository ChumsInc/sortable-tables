import e, { createContext as t, createElement as n, useCallback as r, useContext as i, useEffect as a, useId as o, useMemo as s, useState as c } from "react";
import l from "@emotion/styled";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
import p from "react-dom";
//#region node_modules/clsx/dist/clsx.mjs
function m(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = m(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function h() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = m(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/Table.tsx
var g = l.table`
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
function _({ sticky: e, responsive: t, children: n, className: r, ref: i, ...a }) {
	return t ? /* @__PURE__ */ d("div", {
		className: h(r, {
			"table-responsive": t === !0,
			[`table-responsive-${t}`]: t !== !0
		}),
		children: /* @__PURE__ */ d(g, {
			ref: i,
			...a,
			children: n
		})
	}) : /* @__PURE__ */ d(g, {
		className: r,
		sticky: e,
		ref: i,
		...a,
		children: n
	});
}
//#endregion
//#region src/DataTableTR.tsx
function v({ className: e, rowClassName: t, selected: n, row: r, trRef: i, onClick: a, children: o, ...s }) {
	let c = (e) => {
		a?.(r, e);
	}, l = typeof t == "function" ? t(r) : t;
	return r ? /* @__PURE__ */ d("tr", {
		ref: i,
		className: h({ "table-active": n }, e, l),
		onClick: c,
		...s,
		children: o
	}) : null;
}
v.displayName = "DataTableTR";
//#endregion
//#region src/DataTableCell.tsx
function y({ field: e, row: t, className: r, as: i, ...a }) {
	if (e.visible === !1) return null;
	let o = h({ [`text-${e.align}`]: !!e.align }, r, typeof e.className == "function" ? e.className(t) : e.className);
	return n(i ?? e.as ?? "td", {
		className: o,
		scope: (i ?? e.as) === "th" ? "row" : void 0,
		colSpan: e.colSpan,
		...e.cellProps,
		...a
	}, e.field.includes(".") || t[e.field] === void 0 && !e.render ? null : typeof e.render == "function" ? e.render(t) : t[e.field]);
}
y.displayName = "DataTableCell";
//#endregion
//#region src/DataTableRowCellSet.tsx
function b({ fields: e, row: t }) {
	return /* @__PURE__ */ d(u, { children: e.map((e, n) => /* @__PURE__ */ d(y, {
		field: e,
		row: t
	}, String(e?.id ?? n))) });
}
//#endregion
//#region src/DataTableContext.ts
var x = t(null);
//#endregion
//#region src/DataTableProvider.tsx
function S({ children: e, initialFields: t = [], initialSort: n = null }) {
	let [i, a] = c(t), [o, l] = c(n), u = r((e) => {
		a(e);
	}, []), f = r((e) => {
		l(e);
	}, []), p = r((e, t) => {
		a(i.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}, [i]), m = r((e) => i.find((t) => t.id === e), [i]), h = s(() => ({
		fields: i,
		setFields: u,
		sort: o,
		setSort: f,
		getField: m,
		updateField: p
	}), [
		i,
		u,
		o,
		f,
		p,
		m
	]);
	return /* @__PURE__ */ d(x.Provider, {
		value: h,
		children: e
	});
}
S.displayName = "DataTableProvider";
//#endregion
//#region src/DataTableTH.tsx
function C({ field: e, className: t, children: n, ...r }) {
	return e.visible === !1 ? null : /* @__PURE__ */ d("th", {
		className: h({ [`text-${e.align}`]: !!e.align }, t),
		scope: "col",
		...r,
		children: n ?? e.title
	});
}
C.displayName = "DataTableTH";
//#endregion
//#region src/useTableFields.ts
function w() {
	let e = i(x);
	if (!e) throw Error("useTableContext must be used within a DataTableProvider");
	return [e.fields, e.setFields];
}
//#endregion
//#region src/DataTableHead.tsx
function T({ ...e }) {
	let [t] = w();
	return /* @__PURE__ */ d("thead", {
		...e,
		children: /* @__PURE__ */ d("tr", { children: t.map((e, t) => /* @__PURE__ */ d(C, {
			...e.thProps,
			field: e,
			className: h(typeof e.className == "function" ? { [`text-${e.align}`]: !!e.align } : e.className)
		}, String(e.id ?? t))) })
	});
}
T.displayName = "DataTableHead";
//#endregion
//#region src/ContainedDataTable.tsx
function E({ className: e, size: t, responsive: n, sticky: r, data: i, keyField: a, rowClassName: o, renderRow: s, onSelectRow: c, selected: l, tableHeadProps: u, children: p, tfoot: m, ...g }) {
	return /* @__PURE__ */ f(_, {
		sticky: r,
		responsive: n,
		className: h("table", e, { [`table-${t}`]: !!t }),
		...g,
		children: [
			/* @__PURE__ */ d(he, {}),
			/* @__PURE__ */ d(T, { ...u }),
			!!i.length && /* @__PURE__ */ d(re, {
				data: i,
				keyField: a,
				rowClassName: o,
				renderRow: s,
				onSelectRow: c,
				selected: l
			}),
			p,
			m
		]
	});
}
E.displayName = "ContainedDataTable";
//#endregion
//#region src/DataTable.tsx
function ee({ fields: e, ...t }) {
	return /* @__PURE__ */ d(S, {
		initialFields: e,
		children: /* @__PURE__ */ d(E, { ...t })
	});
}
ee.displayName = "DataTable";
//#endregion
//#region src/ContainedDataTableRow.tsx
function te({ className: e, rowClassName: t, selected: n, row: r, trRef: i, onClick: a, ...o }) {
	let [s] = w(), c = (e) => {
		a?.(r, e);
	}, l = typeof t == "function" ? t(r) : t;
	return r ? /* @__PURE__ */ d("tr", {
		ref: i,
		className: h({ "table-active": n }, e, l),
		onClick: c,
		...o,
		children: s.map((e, t) => /* @__PURE__ */ d(y, {
			field: e,
			row: r
		}, String(e?.id ?? t)))
	}) : null;
}
te.displayName = "ContainedDataTableRow";
//#endregion
//#region src/DataTableRow.tsx
function ne({ fields: e, className: t, rowClassName: n, selected: r, row: i, trRef: a, onClick: o, ...s }) {
	return /* @__PURE__ */ d(v, {
		className: t,
		rowClassName: n,
		row: i,
		selected: r,
		trRef: a,
		onClick: o,
		...s,
		children: /* @__PURE__ */ d(b, {
			fields: e,
			row: i
		})
	});
}
ne.displayName = "DataTableRow";
//#endregion
//#region src/DataTableTBody.tsx
function re({ data: e, keyField: t, rowClassName: n, renderRow: r, onSelectRow: i, selected: a = "", children: o, ...s }) {
	return /* @__PURE__ */ f("tbody", {
		...s,
		children: [e.map((e) => {
			let o = String(typeof t == "function" ? t(e) : e[t]), s = typeof a == "function" ? a(e) : o === a;
			return r ? r(e) : /* @__PURE__ */ d(te, {
				onClick: i,
				rowClassName: n,
				row: e,
				selected: s
			}, o);
		}), o]
	});
}
re.displayName = "DataTableTBody";
//#endregion
//#region src/useTableSort.ts
function D() {
	let e = i(x);
	if (!e) throw Error("useTableSort must be used within a DataTableProvider");
	return [e.sort, e.setSort];
}
//#endregion
//#region src/SortableTableTH.tsx
var ie = (e) => {
	if (!e) return "flex-start";
	switch (e) {
		case "end": return "flex-end";
		default: return "center";
	}
}, ae = l.div`
    display: flex;
    width: 100%;
    flex-direction: ${(e) => e.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(e) => ie(e.align)};

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
function oe({ field: e, sorted: t, ascending: n, className: r, onClick: i }) {
	if (e.visible === !1) return null;
	if (!e.sortable) return /* @__PURE__ */ d(C, {
		field: e,
		className: r
	});
	let { className: a, ...o } = e.thProps ?? {}, s = h(r, a, { [`text-${e.align}`]: !!e.align }), c = () => {
		i({
			field: e.field,
			ascending: t ? !n : !0
		});
	}, l = {
		"bi-arrow-down": n,
		"bi-arrow-up": !n
	};
	return /* @__PURE__ */ d("th", {
		...o,
		className: h("sortable", s),
		scope: "col",
		onClick: c,
		children: /* @__PURE__ */ f(ae, {
			sorted: t,
			align: e.align,
			children: [/* @__PURE__ */ d("div", {
				className: "field-title",
				children: e.title
			}), /* @__PURE__ */ d("div", { className: h("me-1 sort-icon", l) })]
		})
	});
}
oe.displayName = "SortableTableTH";
//#endregion
//#region src/SortableTableHead.tsx
function se({ onChangeSort: e }) {
	let [t] = w(), [n] = D();
	return /* @__PURE__ */ d("thead", { children: /* @__PURE__ */ d("tr", { children: t.map((t, r) => /* @__PURE__ */ d(oe, {
		field: t,
		sorted: n?.field === t.field,
		ascending: n?.ascending,
		className: h(typeof t.className == "function" ? { [`text-${t.align}`]: !!t.align } : t.className),
		onClick: e
	}, r)) }) });
}
se.displayName = "SortableTableHead";
//#endregion
//#region src/SortableTableHeadWrapper.tsx
function ce({ onChangeSort: e }) {
	let [t] = w(), [n] = D();
	return /* @__PURE__ */ d(se, {
		fields: t,
		currentSort: n,
		onChangeSort: e
	});
}
ce.displayName = "SortableTableHeadWrapper";
//#endregion
//#region src/ContainedSortableTable.tsx
function le({ className: e, size: t, responsive: n, sticky: r, data: i, keyField: a, rowClassName: o, renderRow: s, onSelectRow: c, selected: l, tableHeadProps: u, children: p, tfoot: m, onChangeSort: g, ...v }) {
	return /* @__PURE__ */ f(_, {
		className: h("table", e, { [`table-${t}`]: !!t }),
		responsive: n,
		sticky: r,
		...v,
		children: [
			/* @__PURE__ */ d(he, {}),
			/* @__PURE__ */ d(ce, {
				onChangeSort: g,
				...u
			}),
			!!i.length && /* @__PURE__ */ d(re, {
				data: i,
				keyField: a,
				rowClassName: o,
				renderRow: s,
				onSelectRow: c,
				selected: l
			}),
			p,
			m
		]
	});
}
le.displayName = "ContainedSortableTable";
//#endregion
//#region src/SortHelper.tsx
function ue({ nextSort: e }) {
	let [, t] = D();
	return a(() => {
		t(e);
	}, [e, t]), null;
}
//#endregion
//#region src/SortableTable.tsx
function de({ fields: e, currentSort: t, ...n }) {
	return /* @__PURE__ */ f(S, {
		initialFields: e,
		initialSort: t,
		children: [/* @__PURE__ */ d(ue, { nextSort: t }), /* @__PURE__ */ d(le, { ...n })]
	});
}
de.displayName = "SortableTable";
//#endregion
//#region src/RowsPerPage.tsx
var fe = [
	10,
	25,
	50,
	100,
	250,
	500,
	1e3
];
function pe({ value: e, pageValues: t = fe, size: n, label: r, className: i, onChange: a, ...s }) {
	let c = o(), l = (e) => a(Number(e.target.value)), u = i ?? h("form-select", { [`form-select-${n}`]: !!n });
	return /* @__PURE__ */ f("div", {
		className: h("input-group", { [`input-group-${n}`]: !!n }),
		children: [/* @__PURE__ */ d("label", {
			className: "input-group-text",
			htmlFor: c,
			children: r ?? "Rows"
		}), /* @__PURE__ */ d("select", {
			className: u,
			id: c,
			value: e,
			onChange: l,
			...s,
			children: t.map((e) => /* @__PURE__ */ d("option", {
				value: e,
				children: e
			}, e))
		})]
	}, e);
}
pe.displayName = "RowsPerPage";
//#endregion
//#region src/TablePagination.tsx
function me({ page: e, rowsPerPage: t, onChangePage: n, count: r, size: i, showFirst: a, showLast: o, className: s, rowsPerPageProps: c, ...l }) {
	let u = r === 0 ? 0 : e * t + 1, p = Math.min(e * t + t, r), m = t === 0 ? 0 : Math.floor((r - 1) / t), g = h("btn btn-link", { [`btn-${i}`]: !!i });
	return /* @__PURE__ */ f("div", {
		className: h("row g-3 justify-content-end", s),
		...l,
		children: [!!c && /* @__PURE__ */ d("div", {
			className: "col-auto",
			children: /* @__PURE__ */ d(pe, {
				...c,
				value: t,
				size: i
			})
		}), /* @__PURE__ */ d("div", {
			className: "col-auto",
			children: /* @__PURE__ */ f("div", {
				className: "row g-3 flex-nowrap align-items-baseline",
				children: [
					/* @__PURE__ */ f("div", {
						className: "col-auto",
						children: [
							u,
							"-",
							p,
							" of ",
							r
						]
					}),
					a && /* @__PURE__ */ d("div", {
						className: "col-auto",
						children: /* @__PURE__ */ d("button", {
							className: g,
							disabled: e === 0,
							onClick: () => n(0),
							"aria-label": "First page",
							children: /* @__PURE__ */ d("span", {
								className: "bi-chevron-bar-left",
								"aria-hidden": "true"
							})
						})
					}),
					/* @__PURE__ */ d("div", {
						className: "col-auto",
						children: /* @__PURE__ */ d("button", {
							className: g,
							disabled: e === 0,
							onClick: () => n(e - 1),
							"aria-label": "Previous page",
							children: /* @__PURE__ */ d("span", {
								className: "bi-chevron-left",
								"aria-hidden": "true"
							})
						})
					}),
					/* @__PURE__ */ d("div", {
						className: "col-auto",
						children: /* @__PURE__ */ d("button", {
							className: g,
							disabled: e >= m,
							onClick: () => n(e + 1),
							"aria-label": "Next page",
							children: /* @__PURE__ */ d("span", {
								className: "bi-chevron-right",
								"aria-hidden": "true"
							})
						})
					}),
					o && /* @__PURE__ */ d("div", {
						className: "col-auto",
						children: /* @__PURE__ */ d("button", {
							className: g,
							disabled: e >= m,
							onClick: () => n(m),
							"aria-label": "Last page",
							children: /* @__PURE__ */ d("span", {
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
me.displayname = "TablePagination";
//#endregion
//#region src/DataTableCols.tsx
function he() {
	let [e] = w();
	return /* @__PURE__ */ d("colgroup", { children: e.filter((e) => e.visible !== !1).map((e, t) => /* @__PURE__ */ d("col", {
		className: e.colClassName,
		span: e.colSpan ?? 1
	}, t)) });
}
he.displayName = "DataTableCols";
//#endregion
//#region src/useField.ts
function ge(e) {
	let t = i(x);
	if (!t) throw Error("useField must be used within a DataTableProvider");
	return [t.fields.find((t) => t.id === e) ?? null, t.updateField];
}
//#endregion
//#region src/useTableContext.ts
function _e() {
	let e = i(x);
	if (!e) throw Error("useTableContext must be used within a DataTableProvider");
	return e;
}
//#endregion
//#region src/virtual/size-utils.ts
var ve = (e) => {
	switch (e) {
		case "sm": return 33;
		case "xs": return 24;
		default: return 41;
	}
};
//#endregion
//#region src/virtual/useScreenHeight.ts
function ye() {
	let [e, t] = c(typeof window < "u" ? window.innerHeight : 0);
	return a(() => {
		if (typeof window > "u") return;
		let e = () => t(window.innerHeight);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), e;
}
//#endregion
//#region src/virtual/VirtualTableContainer.tsx
var be = l.div`
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
    width: 100%;
    transition: height 0.2s ease-in-out;

    .table {
        white-space: nowrap;
        //height: 70vh;
        thead tr {
            th, td {
                background-color: var(--bs-table-bg) !important;
                border-bottom-width: 1px;
                border-color: var(--bs-border-color);
                box-shadow: var(--bs-box-shadow);
            }
        }
    } 
`, xe = 0, Se = 1, Ce = 2, we = 4;
function Te(e) {
	return () => e;
}
function Ee(e) {
	e();
}
function De(e, t) {
	return (n) => e(t(n));
}
function Oe(e, t) {
	return () => e(t);
}
function ke(e, t) {
	return (n) => e(t, n);
}
function Ae(e) {
	return e !== void 0;
}
function je(...e) {
	return () => {
		e.map(Ee);
	};
}
function Me() {}
function Ne(e, t) {
	return t(e), e;
}
function Pe(e, t) {
	return t(e);
}
function O(...e) {
	return e;
}
function k(e, t) {
	return e(Se, t);
}
function A(e, t) {
	e(xe, t);
}
function Fe(e) {
	e(Ce);
}
function j(e) {
	return e(we);
}
function M(e, t) {
	return k(e, ke(t, xe));
}
function Ie(e, t) {
	let n = e(Se, (e) => {
		n(), t(e);
	});
	return n;
}
function Le(e) {
	let t, n;
	return (r) => (i) => {
		t = i, n && clearTimeout(n), n = setTimeout(() => {
			r(t);
		}, e);
	};
}
function Re(e, t) {
	return e === t;
}
function N(e = Re) {
	let t;
	return (n) => (r) => {
		e(t, r) || (t = r, n(r));
	};
}
function P(e) {
	return (t) => (n) => {
		e(n) && t(n);
	};
}
function F(e) {
	return (t) => De(t, e);
}
function ze(e) {
	return (t) => () => {
		t(e);
	};
}
function I(e, ...t) {
	let n = Ue(...t);
	return ((t, r) => {
		switch (t) {
			case Ce:
				Fe(e);
				return;
			case Se: return k(e, n(r));
		}
	});
}
function Be(e, t) {
	return (n) => (r) => {
		n(t = e(t, r));
	};
}
function Ve(e) {
	return (t) => (n) => {
		e > 0 ? e-- : t(n);
	};
}
function He(e) {
	let t = null, n;
	return (r) => (i) => {
		t = i, !n && (n = setTimeout(() => {
			n = void 0, r(t);
		}, e));
	};
}
function L(...e) {
	let t = Array(e.length), n = 0, r = null, i = 2 ** e.length - 1;
	return e.forEach((e, a) => {
		let o = 2 ** a;
		k(e, (e) => {
			let s = n;
			n |= o, t[a] = e, s !== i && n === i && r && (r(), r = null);
		});
	}), (e) => (a) => {
		let o = () => {
			e([a].concat(t));
		};
		n === i ? o() : r = o;
	};
}
function Ue(...e) {
	return (t) => e.reduceRight(Pe, t);
}
function We(e) {
	let t, n, r = () => t?.();
	return function(i, a) {
		switch (i) {
			case Se: return a ? n === a ? void 0 : (r(), n = a, t = k(e, a), t) : (r(), Me);
			case Ce:
				r(), n = null;
				return;
		}
	};
}
function R(e) {
	let t = e, n = B();
	return ((e, r) => {
		switch (e) {
			case xe:
				t = r;
				break;
			case Se:
				r(t);
				break;
			case we: return t;
		}
		return n(e, r);
	});
}
function z(e, t) {
	return Ne(R(t), (t) => M(e, t));
}
function B() {
	let e = [];
	return ((t, n) => {
		switch (t) {
			case xe:
				e.slice().forEach((e) => {
					e(n);
				});
				return;
			case Ce:
				e.splice(0, e.length);
				return;
			case Se: return e.push(n), () => {
				let t = e.indexOf(n);
				t > -1 && e.splice(t, 1);
			};
		}
	});
}
function V(e) {
	return Ne(B(), (t) => M(e, t));
}
function H(e, t = [], { singleton: n } = { singleton: !0 }) {
	return {
		constructor: e,
		dependencies: t,
		id: Ge(),
		singleton: n
	};
}
var Ge = () => Symbol();
function Ke(e) {
	let t = /* @__PURE__ */ new Map(), n = ({ constructor: e, dependencies: r, id: i, singleton: a }) => {
		if (a && t.has(i)) return t.get(i);
		let o = e(r.map((e) => n(e)));
		return a && t.set(i, o), o;
	};
	return n(e);
}
function U(...e) {
	let t = B(), n = Array(e.length), r = 0, i = 2 ** e.length - 1;
	return e.forEach((e, a) => {
		let o = 2 ** a;
		k(e, (e) => {
			n[a] = e, r |= o, r === i && A(t, n);
		});
	}), function(e, a) {
		switch (e) {
			case Ce:
				Fe(t);
				return;
			case Se: return r === i && a(n), k(t, a);
		}
	};
}
function W(e, t = Re) {
	return I(e, N(t));
}
function qe(...e) {
	return function(t, n) {
		switch (t) {
			case Ce: return;
			case Se: return je(...e.map((e) => k(e, n)));
		}
	};
}
var G = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3
}, Je = {
	[G.DEBUG]: "debug",
	[G.ERROR]: "error",
	[G.INFO]: "log",
	[G.WARN]: "warn"
}, Ye = () => typeof globalThis > "u" ? window : globalThis, Xe = H(() => {
	let e = R(G.ERROR);
	return {
		log: R((t, n, r = G.INFO) => {
			r >= (Ye().VIRTUOSO_LOG_LEVEL ?? j(e)) && console[Je[r]]("%creact-virtuoso: %c%s %o", "color: #0253b3; font-weight: bold", "color: initial", t, n);
		}),
		logLevel: e
	};
}, [], { singleton: !0 }), Ze = /* @__PURE__ */ new WeakMap();
function Qe(e) {
	return "self" in e ? e.document.documentElement : e;
}
function $e(e) {
	let t = Qe(e), n = Ze.get(t);
	if (n !== void 0) return n;
	let r = t.ownerDocument.defaultView.getComputedStyle(t).direction === "rtl";
	return Ze.set(t, r), r;
}
function et(e) {
	Ze.delete(Qe(e));
}
function tt(e, t) {
	return $e(e) ? -t : t;
}
var nt = tt;
function rt(e, t) {
	return tt(e, t);
}
function it(e, t, n) {
	return at(e, t, n).callbackRef;
}
function at(t, n, r) {
	let i = e.useRef(null), a = (e) => {}, o = e.useMemo(() => typeof ResizeObserver < "u" ? new ResizeObserver((e) => {
		let n = () => {
			let n = e[0].target;
			n.offsetParent !== null && t(n);
		};
		r ? n() : requestAnimationFrame(n);
	}) : null, [t, r]);
	return a = (e) => {
		e && n ? (o?.observe(e), i.current = e) : (i.current && o?.unobserve(i.current), i.current = null);
	}, {
		callbackRef: a,
		ref: i
	};
}
function ot(t, n, r, i, a, o, s, c, l) {
	return at(e.useCallback((e) => {
		let r = st(e.children, n, c ? "offsetWidth" : "offsetHeight", a), l = e.parentElement;
		for (; l.dataset.virtuosoScroller === void 0;) l = l.parentElement;
		let u = l.lastElementChild.dataset.viewportType === "window", d;
		u && (d = l.ownerDocument.defaultView);
		let f = s ? c ? s.scrollWidth : s.scrollHeight : u ? c ? d.document.documentElement.scrollWidth : d.document.documentElement.scrollHeight : c ? l.scrollWidth : l.scrollHeight, p = s ? c ? s.offsetWidth : s.offsetHeight : u ? c ? d.innerWidth : d.innerHeight : c ? l.offsetWidth : l.offsetHeight, m = s ? c ? nt(s, s.scrollLeft) : s.scrollTop : u ? c ? nt(d, d.scrollX || d.document.documentElement.scrollLeft) : d.scrollY || d.document.documentElement.scrollTop : c ? nt(l, l.scrollLeft) : l.scrollTop;
		i({
			scrollHeight: f,
			scrollTop: Math.max(m, 0),
			viewportHeight: p
		}), o?.(c ? ct("column-gap", getComputedStyle(e).columnGap, a) : ct("row-gap", getComputedStyle(e).rowGap, a)), r !== null && t(r);
	}, [
		t,
		n,
		a,
		o,
		s,
		i,
		c
	]), r, l);
}
function st(e, t, n, r) {
	let i = e.length;
	if (i === 0) return null;
	let a = [];
	for (let o = 0; o < i; o++) {
		let i = e.item(o);
		if (i.dataset.index === void 0) continue;
		let s = parseInt(i.dataset.index), c = parseFloat(i.dataset.knownSize), l = t(i, n);
		if (l === 0 && r("Zero-sized element, this should not happen", { child: i }, G.ERROR), l === c) continue;
		let u = a[a.length - 1];
		a.length === 0 || u.size !== l || u.endIndex !== s - 1 ? a.push({
			endIndex: s,
			size: l,
			startIndex: s
		}) : a[a.length - 1].endIndex++;
	}
	return a;
}
function ct(e, t, n) {
	return t !== "normal" && t?.endsWith("px") !== !0 && n(`${e} was not resolved to pixel value correctly`, t, G.WARN), t === "normal" ? 0 : parseInt(t ?? "0", 10);
}
function lt(t, n, r) {
	let i = e.useRef(null), a = e.useCallback((e) => {
		if (!e?.offsetParent) return;
		let r = e.getBoundingClientRect(), a = r.width, o, c;
		if (n) {
			let e = n.getBoundingClientRect(), t = r.top - e.top;
			c = e.height - Math.max(0, t), o = t + n.scrollTop;
		} else {
			let e = s.current.ownerDocument.defaultView;
			c = e.innerHeight - Math.max(0, r.top), o = r.top + e.scrollY;
		}
		i.current = {
			listHeight: r.height,
			offsetTop: o,
			visibleHeight: c,
			visibleWidth: a
		}, t(i.current);
	}, [t, n]), { callbackRef: o, ref: s } = at(a, !0, r), c = e.useCallback(() => {
		a(s.current);
	}, [a, s]);
	return e.useEffect(() => {
		if (n) {
			n.addEventListener("scroll", c);
			let e = new ResizeObserver(() => {
				requestAnimationFrame(c);
			});
			return e.observe(n), () => {
				n.removeEventListener("scroll", c), e.unobserve(n);
			};
		}
		let e = s.current?.ownerDocument.defaultView;
		return e?.addEventListener("scroll", c), e?.addEventListener("resize", c), () => {
			e?.removeEventListener("scroll", c), e?.removeEventListener("resize", c);
		};
	}, [
		c,
		n,
		s
	]), o;
}
var K = H(() => {
	let e = B(), t = B(), n = R(0), r = B(), i = R(0), a = B(), o = B(), s = R(0), c = R(0), l = R(0), u = R(0), d = B(), f = B(), p = R(!1), m = R(!1), h = R(!1);
	return M(I(e, F(({ scrollTop: e }) => e)), t), M(I(e, F(({ scrollHeight: e }) => e)), o), M(t, i), {
		deviation: n,
		fixedFooterHeight: l,
		fixedHeaderHeight: c,
		footerHeight: u,
		headerHeight: s,
		horizontalDirection: m,
		scrollBy: f,
		scrollContainerState: e,
		scrollHeight: o,
		scrollingInProgress: p,
		scrollTo: d,
		scrollTop: t,
		skipAnimationFrameInResizeObserver: h,
		smoothScrollTargetReached: r,
		statefulScrollTop: i,
		viewportHeight: a
	};
}, [], { singleton: !0 }), ut = { lvl: 0 };
function dt(e, t) {
	let n = e.length;
	if (n === 0) return [];
	let { index: r, value: i } = t(e[0]), a = [];
	for (let o = 1; o < n; o++) {
		let { index: n, value: s } = t(e[o]);
		a.push({
			end: n - 1,
			start: r,
			value: i
		}), r = n, i = s;
	}
	return a.push({
		end: Infinity,
		start: r,
		value: i
	}), a;
}
function q(e) {
	return e === ut;
}
function ft(e, t) {
	if (!q(e)) return t === e.k ? e.v : t < e.k ? ft(e.l, t) : ft(e.r, t);
}
function pt(e, t, n = "k") {
	if (q(e)) return [-Infinity, void 0];
	if (Number(e[n]) === t) return [e.k, e.v];
	if (Number(e[n]) < t) {
		let r = pt(e.r, t, n);
		return r[0] === -Infinity ? [e.k, e.v] : r;
	}
	return pt(e.l, t, n);
}
function J(e, t, n) {
	return q(e) ? Ct(t, n, 1) : t === e.k ? Y(e, {
		k: t,
		v: n
	}) : t < e.k ? wt(Y(e, { l: J(e.l, t, n) })) : wt(Y(e, { r: J(e.r, t, n) }));
}
function mt() {
	return ut;
}
function ht(e, t, n) {
	if (q(e)) return [];
	let r = pt(e, t)[0];
	return Dt(vt(e, r, n));
}
function gt(e, t) {
	if (q(e)) return ut;
	let { k: n, l: r, r: i } = e;
	if (t === n) {
		if (q(r)) return i;
		if (q(i)) return r;
		let [t, n] = St(r);
		return yt(Y(e, {
			k: t,
			l: bt(r),
			v: n
		}));
	}
	return yt(t < n ? Y(e, { l: gt(r, t) }) : Y(e, { r: gt(i, t) }));
}
function _t(e) {
	return q(e) ? [] : [
		..._t(e.l),
		{
			k: e.k,
			v: e.v
		},
		..._t(e.r)
	];
}
function vt(e, t, n) {
	if (q(e)) return [];
	let { k: r, l: i, r: a, v: o } = e, s = [];
	return r > t && (s = s.concat(vt(i, t, n))), r >= t && r <= n && s.push({
		k: r,
		v: o
	}), r <= n && (s = s.concat(vt(a, t, n))), s;
}
function yt(e) {
	let { l: t, lvl: n, r } = e;
	if (r.lvl >= n - 1 && t.lvl >= n - 1) return e;
	if (n > r.lvl + 1) {
		if (xt(t)) return Tt(Y(e, { lvl: n - 1 }));
		if (!q(t) && !q(t.r)) return Y(t.r, {
			l: Y(t, { r: t.r.l }),
			lvl: n,
			r: Y(e, {
				l: t.r.r,
				lvl: n - 1
			})
		});
		throw Error("Unexpected empty nodes");
	}
	if (xt(e)) return Et(Y(e, { lvl: n - 1 }));
	if (!q(r) && !q(r.l)) {
		let t = r.l, i = xt(t) ? r.lvl - 1 : r.lvl;
		return Y(t, {
			l: Y(e, {
				lvl: n - 1,
				r: t.l
			}),
			lvl: t.lvl + 1,
			r: Et(Y(r, {
				l: t.r,
				lvl: i
			}))
		});
	}
	throw Error("Unexpected empty nodes");
}
function Y(e, t) {
	return Ct(t.k === void 0 ? e.k : t.k, t.v === void 0 ? e.v : t.v, t.lvl === void 0 ? e.lvl : t.lvl, t.l === void 0 ? e.l : t.l, t.r === void 0 ? e.r : t.r);
}
function bt(e) {
	return q(e.r) ? e.l : yt(Y(e, { r: bt(e.r) }));
}
function xt(e) {
	return q(e) || e.lvl > e.r.lvl;
}
function St(e) {
	return q(e.r) ? [e.k, e.v] : St(e.r);
}
function Ct(e, t, n, r = ut, i = ut) {
	return {
		k: e,
		l: r,
		lvl: n,
		r: i,
		v: t
	};
}
function wt(e) {
	return Et(Tt(e));
}
function Tt(e) {
	let { l: t } = e;
	return !q(t) && t.lvl === e.lvl ? Y(t, { r: Y(e, { l: t.r }) }) : e;
}
function Et(e) {
	let { lvl: t, r: n } = e;
	return !q(n) && !q(n.r) && n.lvl === t && n.r.lvl === t ? Y(n, {
		l: Y(e, { r: n.l }),
		lvl: t + 1
	}) : e;
}
function Dt(e) {
	return dt(e, ({ k: e, v: t }) => ({
		index: e,
		value: t
	}));
}
function Ot(e, t) {
	return !!(e && e.startIndex === t.startIndex && e.endIndex === t.endIndex);
}
function kt(e, t) {
	return !!(e && e[0] === t[0] && e[1] === t[1]);
}
var At = H(() => ({ recalcInProgress: R(!1) }), [], { singleton: !0 });
function jt(e, t, n) {
	return e[Mt(e, t, n)];
}
function Mt(e, t, n, r = 0) {
	let i = e.length - 1;
	for (; r <= i;) {
		let a = Math.floor((r + i) / 2), o = e[a], s = n(o, t);
		if (s === 0) return a;
		if (s === -1) {
			if (i - r < 2) return a - 1;
			i = a - 1;
		} else {
			if (i === r) return a;
			r = a + 1;
		}
	}
	throw Error(`Failed binary finding record in array - ${e.join(",")}, searched for ${t}`);
}
function Nt(e, t, n, r) {
	let i = Mt(e, t, r), a = Mt(e, n, r, i);
	return e.slice(i, a + 1);
}
function Pt(e, t) {
	return Math.round(e.getBoundingClientRect()[t]);
}
function Ft(e) {
	return !q(e.groupOffsetTree);
}
function It({ index: e }, t) {
	return t === e ? 0 : t < e ? -1 : 1;
}
function Lt() {
	return {
		groupIndices: [],
		groupOffsetTree: mt(),
		lastIndex: 0,
		lastOffset: 0,
		lastSize: 0,
		offsetTree: [],
		sizeTree: mt()
	};
}
function Rt(e, t) {
	let n = q(e) ? 0 : Infinity;
	for (let r of t) {
		let { endIndex: t, size: i, startIndex: a } = r;
		if (n = Math.min(n, a), q(e)) {
			e = J(e, 0, i);
			continue;
		}
		let o = ht(e, a - 1, t + 1);
		if (o.some(Xt(r))) continue;
		let s = !1, c = !1;
		for (let { end: n, start: r, value: a } of o) s ? (t >= r || i === a) && (e = gt(e, r)) : (c = a !== i, s = !0), n > t && t >= r && a !== i && (e = J(e, t + 1, a));
		c && (e = J(e, a, i));
	}
	return [e, n];
}
function zt(e) {
	return typeof e.groupIndex < "u";
}
function Bt({ offset: e }, t) {
	return t === e ? 0 : t < e ? -1 : 1;
}
function Vt(e, t, n) {
	if (t.length === 0) return 0;
	let { index: r, offset: i, size: a } = jt(t, e, It), o = e - r, s = a * o + (o - 1) * n + i;
	return s > 0 ? s + n : s;
}
function Ht(e, t) {
	if (!Ft(t)) return e;
	let n = 0;
	for (; t.groupIndices[n] <= e + n;) n++;
	return e + n;
}
function Ut(e, t, n) {
	if (zt(e)) return t.groupIndices[e.groupIndex] + 1;
	let r = Ht(e.index === "LAST" ? n : e.index, t);
	return r = Math.max(0, r, Math.min(n, r)), r;
}
function Wt(e, t, n, r = 0) {
	return r > 0 && (t = Math.max(t, jt(e, r, It).offset)), dt(Nt(e, t, n, Bt), Yt);
}
function Gt(e, [t, n, r, i]) {
	t.length > 0 && r("received item sizes", t, G.DEBUG);
	let a = e.sizeTree, o = a, s = 0;
	if (n.length > 0 && q(a) && t.length === 2) {
		let e = t[0].size, r = t[1].size;
		o = n.reduce((t, n) => J(J(t, n, e), n + 1, r), o);
	} else [o, s] = Rt(o, t);
	if (o === a) return e;
	let { lastIndex: c, lastOffset: l, lastSize: u, offsetTree: d } = Jt(e.offsetTree, s, o, i);
	return {
		groupIndices: n,
		groupOffsetTree: n.reduce((e, t) => J(e, t, Vt(t, d, i)), mt()),
		lastIndex: c,
		lastOffset: l,
		lastSize: u,
		offsetTree: d,
		sizeTree: o
	};
}
function Kt(e) {
	return _t(e).map(({ k: e, v: t }, n, r) => {
		let i = r[n + 1];
		return {
			endIndex: i === void 0 ? Infinity : i.k - 1,
			size: t,
			startIndex: e
		};
	});
}
function qt(e, t) {
	let n = 0, r = 0;
	for (; n < e;) n += t[r + 1] - t[r] - 1, r++;
	return r - (n === e ? 0 : 1);
}
function Jt(e, t, n, r) {
	let i = e, a = 0, o = 0, s = 0, c = 0;
	if (t !== 0) {
		c = Mt(i, t - 1, It), s = i[c].offset;
		let e = pt(n, t - 1);
		a = e[0], o = e[1], i.length && i[c].size === pt(n, t)[1] && --c, i = i.slice(0, c + 1);
	} else i = [];
	for (let { start: e, value: c } of ht(n, t, Infinity)) {
		let t = e - a, n = t * o + s + t * r;
		i.push({
			index: e,
			offset: n,
			size: c
		}), a = e, s = n, o = c;
	}
	return {
		lastIndex: a,
		lastOffset: s,
		lastSize: o,
		offsetTree: i
	};
}
function Yt(e) {
	return {
		index: e.index,
		value: e
	};
}
function Xt(e) {
	let { endIndex: t, size: n, startIndex: r } = e;
	return (e) => e.start === r && (e.end === t || e.end === Infinity) && e.value === n;
}
var Zt = {
	offsetHeight: "height",
	offsetWidth: "width"
}, Qt = H(([{ log: e }, { recalcInProgress: t }]) => {
	let n = B(), r = B(), i = z(r, 0), a = B(), o = B(), s = R(0), c = R([]), l = R(void 0), u = R(void 0), d = R(void 0), f = R(void 0), p = R((e, t) => Pt(e, Zt[t])), m = R(void 0), h = R(0), g = Lt(), _ = z(I(n, L(c, e, h), Be(Gt, g), N()), g), v = z(I(c, N(), Be((e, t) => ({
		current: t,
		prev: e.current
	}), {
		current: [],
		prev: []
	}), F(({ prev: e }) => e)), []);
	M(I(c, P((e) => e.length > 0), L(_, h), F(([e, t, n]) => {
		let r = e.reduce((e, r, i) => J(e, r, Vt(r, t.offsetTree, n) || i), mt());
		return {
			...t,
			groupIndices: e,
			groupOffsetTree: r
		};
	})), _), M(I(r, L(_), P(([e, { lastIndex: t }]) => e < t), F(([e, { lastIndex: t, lastSize: n }]) => [{
		endIndex: t,
		size: n,
		startIndex: e
	}])), n), M(l, u);
	let y = z(I(l, F((e) => e === void 0)), !0);
	M(I(u, P((e) => e !== void 0 && q(j(_).sizeTree)), F((e) => {
		let t = j(d), n = j(c).length > 0;
		return t !== void 0 && t !== 0 ? n ? [{
			endIndex: 0,
			size: t,
			startIndex: 0
		}, {
			endIndex: 1,
			size: e,
			startIndex: 1
		}] : [] : [{
			endIndex: 0,
			size: e,
			startIndex: 0
		}];
	})), n), M(I(f, P((e) => e !== void 0 && e.length > 0 && q(j(_).sizeTree)), F((e) => {
		let t = [], n = e[0], r = 0;
		for (let i = 1; i < e.length; i++) {
			let a = e[i];
			a !== n && (t.push({
				endIndex: i - 1,
				size: n,
				startIndex: r
			}), n = a, r = i);
		}
		return t.push({
			endIndex: e.length - 1,
			size: n,
			startIndex: r
		}), t;
	})), n), M(I(c, L(d, u), P(([, e, t]) => e !== void 0 && t !== void 0), F(([e, t, n]) => {
		let r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = e[i + 1];
			r.push({
				startIndex: a,
				endIndex: a,
				size: t
			}), o !== void 0 && r.push({
				startIndex: a + 1,
				endIndex: o - 1,
				size: n
			});
		}
		return r;
	})), n);
	let b = V(I(n, L(_), Be(({ sizes: e }, [t, n]) => ({
		changed: n !== e,
		sizes: n
	}), {
		changed: !1,
		sizes: g
	}), F((e) => e.changed)));
	k(I(s, Be((e, t) => ({
		diff: e.prev - t,
		prev: t
	}), {
		diff: 0,
		prev: 0
	}), F((e) => e.diff)), (e) => {
		let { groupIndices: n } = j(_);
		if (e > 0) A(t, !0), A(a, e + qt(e, n));
		else if (e < 0) {
			let t = j(v);
			t.length > 0 && (e -= qt(-e, t)), A(o, e);
		}
	}), k(I(s, L(e)), ([e, t]) => {
		e < 0 && t("`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value", { firstItemIndex: s }, G.ERROR);
	});
	let x = V(a);
	M(I(a, L(_), F(([e, t]) => {
		let n = t.groupIndices.length > 0, r = [], i = t.lastSize;
		if (n) {
			let n = ft(t.sizeTree, 0), a = 0, o = 0;
			for (; a < e;) {
				let e = t.groupIndices[o], s = t.groupIndices.length === o + 1 ? Infinity : t.groupIndices[o + 1] - e - 1;
				r.push({
					endIndex: e,
					size: n,
					startIndex: e
				}), r.push({
					endIndex: e + 1 + s - 1,
					size: i,
					startIndex: e + 1
				}), o++, a += s + 1;
			}
			let s = _t(t.sizeTree);
			return a !== e && s.shift(), s.reduce((t, { k: n, v: r }) => {
				let i = t.ranges;
				return t.prevSize !== 0 && (i = [...t.ranges, {
					endIndex: n + e - 1,
					size: t.prevSize,
					startIndex: t.prevIndex
				}]), {
					prevIndex: n + e,
					prevSize: r,
					ranges: i
				};
			}, {
				prevIndex: e,
				prevSize: 0,
				ranges: r
			}).ranges;
		}
		return _t(t.sizeTree).reduce((t, { k: n, v: r }) => ({
			prevIndex: n + e,
			prevSize: r,
			ranges: [...t.ranges, {
				endIndex: n + e - 1,
				size: t.prevSize,
				startIndex: t.prevIndex
			}]
		}), {
			prevIndex: 0,
			prevSize: i,
			ranges: []
		}).ranges;
	})), n);
	let S = V(I(o, L(_, h), F(([e, { offsetTree: t }, n]) => Vt(-e, t, n))));
	return M(I(o, L(_, h), F(([e, t, n]) => {
		if (t.groupIndices.length > 0) {
			if (q(t.sizeTree)) return t;
			let r = mt(), i = j(v), a = 0, o = 0, s = 0;
			for (; a < -e;) {
				s = i[o];
				let e = i[o + 1] - s - 1;
				o++, a += e + 1;
			}
			if (r = _t(t.sizeTree).reduce((t, { k: n, v: r }) => J(t, Math.max(0, n + e), r), r), a !== -e) {
				let n = ft(t.sizeTree, s);
				r = J(r, 0, n);
				let i = pt(t.sizeTree, -e + 1)[1];
				r = J(r, 1, i);
			}
			return {
				...t,
				sizeTree: r,
				...Jt(t.offsetTree, 0, r, n)
			};
		}
		let r = _t(t.sizeTree).reduce((t, { k: n, v: r }) => J(t, Math.max(0, n + e), r), mt());
		return {
			...t,
			sizeTree: r,
			...Jt(t.offsetTree, 0, r, n)
		};
	})), _), {
		beforeUnshiftWith: x,
		data: m,
		defaultItemSize: u,
		firstItemIndex: s,
		fixedItemSize: l,
		fixedGroupSize: d,
		gap: h,
		groupIndices: c,
		heightEstimates: f,
		itemSize: p,
		listRefresh: b,
		shiftWith: o,
		shiftWithOffset: S,
		sizeRanges: n,
		sizes: _,
		statefulTotalCount: i,
		totalCount: r,
		trackItemSizes: y,
		unshiftWith: a
	};
}, O(Xe, At), { singleton: !0 });
function $t(e) {
	return e.reduce((e, t) => (e.groupIndices.push(e.totalCount), e.totalCount += t + 1, e), {
		groupIndices: [],
		totalCount: 0
	});
}
var en = H(([{ groupIndices: e, sizes: t, totalCount: n }, { headerHeight: r, scrollTop: i }]) => {
	let a = B(), o = B(), s = V(I(a, F($t)));
	return M(I(s, F((e) => e.totalCount)), n), M(I(s, F((e) => e.groupIndices)), e), M(I(U(i, t, r), P(([e, t]) => Ft(t)), F(([e, t, n]) => pt(t.groupOffsetTree, Math.max(e - n, 0), "v")[0]), N(), F((e) => [e])), o), {
		groupCounts: a,
		topItemsIndexes: o
	};
}, O(Qt, K)), tn = H(([{ log: e }]) => {
	let t = R(!1), n = V(I(t, P((e) => e), N()));
	return k(t, (t) => {
		t && j(e)("props updated", {}, G.DEBUG);
	}), {
		didMount: n,
		propsReady: t
	};
}, O(Xe), { singleton: !0 }), nn = typeof document < "u" && "scrollBehavior" in document.documentElement.style;
function rn(e) {
	let t = typeof e == "number" ? { index: e } : e;
	return t.align ||= "start", (!t.behavior || !nn) && (t.behavior = "auto"), t.offset === void 0 && (t.offset = 0), t;
}
var an = H(([{ gap: e, listRefresh: t, sizes: n, totalCount: r }, { fixedFooterHeight: i, fixedHeaderHeight: a, footerHeight: o, headerHeight: s, scrollingInProgress: c, scrollTo: l, smoothScrollTargetReached: u, viewportHeight: d }, { log: f }]) => {
	let p = B(), m = B(), h = R(0), g = null, _ = null, v = null;
	function y() {
		g !== null && (g(), g = null), v !== null && (v(), v = null), _ &&= (clearTimeout(_), null), A(c, !1);
	}
	return M(I(p, L(n, d, r, h, s, o, f), L(e, a, i), F(([[e, n, r, i, a, o, s, l], d, f, h]) => {
		let b = rn(e), { align: x, behavior: S, offset: C } = b, w = i - 1, T = Ut(b, n, w), E = Vt(T, n.offsetTree, d) + o;
		x === "end" ? (E += f + pt(n.sizeTree, T)[1] - r + h, T === w && (E += s)) : x === "center" ? E += (f + pt(n.sizeTree, T)[1] - r + h) / 2 : E -= a, C !== void 0 && C !== 0 && (E += C);
		let ee = (t) => {
			y(), t ? (l("retrying to scroll to", { location: e }, G.DEBUG), A(p, e)) : (A(m, !0), l("list did not change, scroll successful", {}, G.DEBUG));
		};
		if (y(), S === "smooth") {
			let e = !1;
			v = k(t, (t) => {
				e ||= t;
			}), g = Ie(u, () => {
				ee(e);
			});
		} else g = Ie(I(t, on(150)), ee);
		return _ = setTimeout(() => {
			y();
		}, 1200), A(c, !0), l("scrolling from index to", {
			behavior: S,
			index: T,
			top: E
		}, G.DEBUG), {
			behavior: S,
			top: E
		};
	})), l), {
		scrollTargetReached: m,
		scrollToIndex: p,
		topListHeight: h
	};
}, O(Qt, K, Xe), { singleton: !0 });
function on(e) {
	return (t) => {
		let n = setTimeout(() => {
			t(!1);
		}, e);
		return (e) => {
			e && (t(!0), clearTimeout(n));
		};
	};
}
function sn(e, t) {
	e === 0 ? t() : requestAnimationFrame(() => {
		sn(e - 1, t);
	});
}
function cn(e, t) {
	let n = t - 1;
	return typeof e == "number" ? e : e.index === "LAST" ? n : e.index;
}
var ln = H(([{ defaultItemSize: e, listRefresh: t, sizes: n }, { scrollTop: r }, { scrollTargetReached: i, scrollToIndex: a }, { didMount: o }]) => {
	let s = R(!0), c = R(0), l = R(!0);
	return M(I(o, L(c), P(([e, t]) => t !== 0), ze(!1)), s), M(I(o, L(c), P(([e, t]) => t !== 0), ze(!1)), l), k(I(U(t, o), L(s, n, e, l), P(([[, e], t, { sizeTree: n }, r, i]) => e && (!q(n) || Ae(r)) && !t && !i), L(c)), ([, e]) => {
		Ie(i, () => {
			A(l, !0);
		}), sn(4, () => {
			Ie(r, () => {
				A(s, !0);
			}), A(a, e);
		});
	}), {
		initialItemFinalLocationReached: l,
		initialTopMostItemIndex: c,
		scrolledToInitialItem: s
	};
}, O(Qt, K, an, tn), { singleton: !0 });
function un(e, t) {
	return Math.abs(e - t) < 1.01;
}
var dn = "up", fn = "down", pn = "none", mn = {
	atBottom: !1,
	notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
	state: {
		offsetBottom: 0,
		scrollHeight: 0,
		scrollTop: 0,
		viewportHeight: 0
	}
}, hn = 0, gn = H(([{ footerHeight: e, headerHeight: t, scrollBy: n, scrollContainerState: r, scrollTop: i, viewportHeight: a }]) => {
	let o = R(!1), s = R(!0), c = B(), l = B(), u = R(4), d = R(hn), f = z(I(qe(I(W(i), Ve(1), ze(!0)), I(W(i), Ve(1), ze(!1), Le(100))), N()), !1), p = z(I(qe(I(n, ze(!0)), I(n, ze(!1), Le(200))), N()), !1);
	M(I(U(W(i), W(d)), F(([e, t]) => e <= t), N()), s), M(I(s, He(50)), l);
	let m = V(I(U(r, W(a), W(t), W(e), W(u)), Be((e, [{ scrollHeight: t, scrollTop: n }, r, i, a, o]) => {
		let s = n + r - t > -o, c = {
			scrollHeight: t,
			scrollTop: n,
			viewportHeight: r
		};
		if (s) {
			let t, r;
			return n > e.state.scrollTop ? (t = "SCROLLED_DOWN", r = e.state.scrollTop - n) : (t = "SIZE_DECREASED", r = e.state.scrollTop - n || e.scrollTopDelta), {
				atBottom: !0,
				atBottomBecause: t,
				scrollTopDelta: r,
				state: c
			};
		}
		let l;
		return l = c.scrollHeight > e.state.scrollHeight ? "SIZE_INCREASED" : r < e.state.viewportHeight ? "VIEWPORT_HEIGHT_DECREASING" : n < e.state.scrollTop ? "SCROLLING_UPWARDS" : "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM", {
			atBottom: !1,
			notAtBottomBecause: l,
			state: c
		};
	}, mn), N((e, t) => e !== void 0 && e.atBottom === t.atBottom))), h = z(I(r, Be((e, { scrollHeight: t, scrollTop: n, viewportHeight: r }) => {
		if (!un(e.scrollHeight, t)) {
			let i = t - (n + r) < 1;
			return e.scrollTop !== n && i ? {
				changed: !0,
				jump: e.scrollTop - n,
				scrollHeight: t,
				scrollTop: n
			} : {
				changed: !0,
				jump: 0,
				scrollHeight: t,
				scrollTop: n
			};
		}
		return {
			changed: !1,
			jump: 0,
			scrollHeight: t,
			scrollTop: n
		};
	}, {
		changed: !1,
		jump: 0,
		scrollHeight: 0,
		scrollTop: 0
	}), P((e) => e.changed), F((e) => e.jump)), 0);
	M(I(m, F((e) => e.atBottom)), o), M(I(o, He(50)), c);
	let g = R(fn);
	M(I(r, F(({ scrollTop: e }) => e), N(), Be((e, t) => j(p) ? {
		direction: e.direction,
		prevScrollTop: t
	} : {
		direction: t < e.prevScrollTop ? dn : fn,
		prevScrollTop: t
	}, {
		direction: fn,
		prevScrollTop: 0
	}), F((e) => e.direction)), g), M(I(r, He(50), ze(pn)), g);
	let _ = R(0);
	return M(I(f, P((e) => !e), ze(0)), _), M(I(i, He(100), L(f), P(([e, t]) => t), Be(([e, t], [n]) => [t, n], [0, 0]), F(([e, t]) => t - e)), _), {
		atBottomState: m,
		atBottomStateChange: c,
		atBottomThreshold: u,
		atTopStateChange: l,
		atTopThreshold: d,
		isAtBottom: o,
		isAtTop: s,
		isScrolling: f,
		lastJumpDueToItemResize: h,
		scrollDirection: g,
		scrollVelocity: _
	};
}, O(K)), _n = "top", vn = "bottom", yn = "none";
function bn(e, t, n) {
	return typeof e == "number" ? n === dn && t === _n || n === fn && t === vn ? e : 0 : n === dn ? t === _n ? e.main : e.reverse : t === vn ? e.main : e.reverse;
}
function xn(e, t) {
	return typeof e == "number" ? e : e[t] ?? 0;
}
var Sn = H(([{ deviation: e, fixedHeaderHeight: t, headerHeight: n, scrollTop: r, viewportHeight: i }]) => {
	let a = B(), o = R(0), s = R(0), c = R(0);
	return {
		increaseViewportBy: s,
		listBoundary: a,
		overscan: c,
		topListHeight: o,
		visibleRange: z(I(U(W(r), W(i), W(n), W(a, kt), W(c), W(o), W(t), W(e), W(s)), F(([e, t, n, [r, i], a, o, s, c, l]) => {
			let u = e - c, d = o + s, f = Math.max(n - u, 0), p = yn, m = xn(l, _n), h = xn(l, vn);
			return r -= c, r += n + s, i += n + s, i -= c, r > e + d - m && (p = dn), i < e - f + t + h && (p = fn), p === yn ? null : [Math.max(u - n - bn(a, _n, p) - m, 0), u - f - s + t + bn(a, vn, p) + h];
		}), P((e) => e !== null), N(kt)), [0, 0])
	};
}, O(K), { singleton: !0 });
function Cn(e, t, n) {
	if (Ft(t)) {
		let r = Ht(e, t);
		return [{
			index: pt(t.groupOffsetTree, r)[0],
			offset: 0,
			size: 0
		}, {
			data: n?.[0],
			index: r,
			offset: 0,
			size: 0
		}];
	}
	return [{
		data: n?.[0],
		index: e,
		offset: 0,
		size: 0
	}];
}
var wn = {
	bottom: 0,
	firstItemIndex: 0,
	items: [],
	offsetBottom: 0,
	offsetTop: 0,
	top: 0,
	topItems: [],
	topListHeight: 0,
	totalCount: 0
};
function Tn(e, t, n, r, i, a) {
	let { lastIndex: o, lastOffset: s, lastSize: c } = i, l = 0, u = 0;
	if (e.length > 0) {
		l = e[0].offset;
		let t = e[e.length - 1];
		u = t.offset + t.size;
	}
	let d = n - o, f = s + d * c + (d - 1) * r, p = l, m = f - u;
	return {
		bottom: u,
		firstItemIndex: a,
		items: Dn(e, i, a),
		offsetBottom: m,
		offsetTop: l,
		top: p,
		topItems: Dn(t, i, a),
		topListHeight: t.reduce((e, t) => t.size + e, 0),
		totalCount: n
	};
}
function En(e, t, n, r, i, a) {
	let o = 0;
	if (n.groupIndices.length > 0) for (let t of n.groupIndices) {
		if (t - o >= e) break;
		o++;
	}
	let s = e + o, c = cn(t, s);
	return Tn(Array.from({ length: s }).map((e, t) => ({
		data: a[t + c],
		index: t + c,
		offset: 0,
		size: 0
	})), [], s, i, n, r);
}
function Dn(e, t, n) {
	if (e.length === 0) return [];
	if (!Ft(t)) return e.map((e) => ({
		...e,
		index: e.index + n,
		originalIndex: e.index
	}));
	let r = e[0].index, i = e[e.length - 1].index, a = [], o = ht(t.groupOffsetTree, r, i), s, c = 0;
	for (let r of e) {
		(!s || s.end < r.index) && (s = o.shift(), c = t.groupIndices.indexOf(s.start));
		let e;
		e = r.index === s.start ? {
			index: c,
			type: "group"
		} : {
			groupIndex: c,
			index: r.index - (c + 1) + n
		}, a.push({
			...e,
			data: r.data,
			offset: r.offset,
			originalIndex: r.index,
			size: r.size
		});
	}
	return a;
}
function On(e, t) {
	return e === void 0 ? 0 : typeof e == "number" ? e : e[t] ?? 0;
}
var kn = H(([{ data: e, firstItemIndex: t, gap: n, sizes: r, totalCount: i }, a, { listBoundary: o, topListHeight: s, visibleRange: c }, { initialTopMostItemIndex: l, scrolledToInitialItem: u }, { topListHeight: d }, f, { didMount: p }, { recalcInProgress: m }]) => {
	let h = R([]), g = R(0), _ = B(), v = R(0);
	M(a.topItemsIndexes, h);
	let y = z(I(U(p, m, W(c, kt), W(i), W(r), W(l), u, W(h), W(t), W(n), W(v), e), P(([e, t, , n, , , , , , , , r]) => {
		let i = r !== void 0 && r.length !== n;
		return e && !t && !i;
	}), F(([, , [e, t], n, r, i, a, o, s, c, l, u]) => {
		let d = r, { offsetTree: f, sizeTree: p } = d, m = j(g);
		if (n === 0) return {
			...wn,
			totalCount: n
		};
		if (e === 0 && t === 0) return m === 0 ? {
			...wn,
			totalCount: n
		} : En(m, i, r, s, c, u || []);
		if (q(p)) return m > 0 ? null : Tn(Cn(cn(i, n), d, u), [], n, c, d, s);
		let h = [];
		if (o.length > 0) {
			let e = o[0], t = o[o.length - 1], n = 0;
			for (let r of ht(p, e, t)) {
				let i = r.value, a = Math.max(r.start, e), o = Math.min(r.end, t);
				for (let e = a; e <= o; e++) h.push({
					data: u?.[e],
					index: e,
					offset: n,
					size: i
				}), n += i;
			}
		}
		if (!a) return Tn([], h, n, c, d, s);
		let _ = o.length > 0 ? o[o.length - 1] + 1 : 0, v = Wt(f, e, t, _);
		if (v.length === 0) return null;
		let y = n - 1, b = Ne([], (n) => {
			for (let r of v) {
				let i = r.value, a = i.offset, o = r.start, s = i.size;
				if (i.offset < e) {
					o += Math.floor((e - i.offset + c) / (s + c));
					let t = o - r.start;
					a += t * s + t * c;
				}
				o < _ && (a += (_ - o) * s, o = _);
				let l = Math.min(r.end, y);
				for (let e = o; e <= l && !(a >= t); e++) n.push({
					data: u?.[e],
					index: e,
					offset: a,
					size: s
				}), a += s + c;
			}
		}), x = On(l, _n), S = On(l, vn);
		if (b.length > 0 && (x > 0 || S > 0)) {
			let e = b[0], t = b[b.length - 1];
			if (x > 0 && e.index > _) {
				let t = Math.min(x, e.index - _), n = [], r = e.offset;
				for (let i = e.index - 1; i >= e.index - t; i--) {
					let t = ht(p, i, i)[0]?.value ?? e.size;
					r -= t + c, n.unshift({
						data: u?.[i],
						index: i,
						offset: r,
						size: t
					});
				}
				b.unshift(...n);
			}
			if (S > 0 && t.index < y) {
				let e = Math.min(S, y - t.index), n = t.offset + t.size + c;
				for (let r = t.index + 1; r <= t.index + e; r++) {
					let e = ht(p, r, r)[0]?.value ?? t.size;
					b.push({
						data: u?.[r],
						index: r,
						offset: n,
						size: e
					}), n += e + c;
				}
			}
		}
		return Tn(b, h, n, c, d, s);
	}), P((e) => e !== null), N()), wn);
	M(I(e, P(Ae), F((e) => e?.length)), i), M(I(y, F((e) => e.topListHeight)), d), M(d, s), M(I(y, F((e) => [e.top, e.bottom])), o), M(I(y, F((e) => e.items)), _);
	let b = V(I(y, P(({ items: e }) => e.length > 0), L(i, e), P(([{ items: e }, t]) => e[e.length - 1].originalIndex === t - 1), F(([, e, t]) => [e - 1, t]), N(kt), F(([e]) => e))), x = V(I(y, He(200), P(({ items: e, topItems: t }) => e.length > 0 && e[0].originalIndex === t.length), F(({ items: e }) => e[0].index), N()));
	return {
		endReached: b,
		initialItemCount: g,
		itemsRendered: _,
		listState: y,
		minOverscanItemCount: v,
		rangeChanged: V(I(y, P(({ items: e }) => e.length > 0), F(({ items: e }) => {
			let t = 0, n = e.length - 1;
			for (; e[t].type === "group" && t < n;) t++;
			for (; e[n].type === "group" && n > t;) n--;
			return {
				endIndex: e[n].index,
				startIndex: e[t].index
			};
		}), N(Ot))),
		startReached: x,
		topItemsIndexes: h,
		...f
	};
}, O(Qt, en, Sn, ln, an, gn, tn, At), { singleton: !0 }), An = H(([{ fixedFooterHeight: e, fixedHeaderHeight: t, footerHeight: n, headerHeight: r }, { listState: i }]) => {
	let a = B(), o = z(I(U(n, e, r, t, i), F(([e, t, n, r, i]) => e + t + n + r + i.offsetBottom + i.bottom)), 0);
	return M(W(o), a), {
		totalListHeight: o,
		totalListHeightChanged: a
	};
}, O(K, kn), { singleton: !0 }), jn = H(([{ viewportHeight: e }, { totalListHeight: t }]) => {
	let n = R(!1);
	return {
		alignToBottom: n,
		paddingTopAddition: z(I(U(n, e, t), P(([e]) => e), F(([, e, t]) => Math.max(0, e - t)), He(0), N()), 0)
	};
}, O(K, An), { singleton: !0 }), Mn = H(() => ({ context: R(null) })), Nn = ({ itemBottom: e, itemTop: t, locationParams: { align: n, behavior: r, ...i }, viewportBottom: a, viewportTop: o }) => t < o ? {
	...i,
	align: n ?? "start",
	...r === void 0 ? {} : { behavior: r }
} : e > a ? {
	...i,
	align: n ?? "end",
	...r === void 0 ? {} : { behavior: r }
} : null, Pn = H(([{ gap: e, sizes: t, totalCount: n }, { fixedFooterHeight: r, fixedHeaderHeight: i, headerHeight: a, scrollingInProgress: o, scrollTop: s, viewportHeight: c }, { scrollToIndex: l }]) => {
	let u = B();
	return M(I(u, L(t, c, n, a, i, r, s), L(e), F(([[e, t, n, r, i, a, s, c], l]) => {
		let { calculateViewLocation: u = Nn, done: d, ...f } = e, p = Ut(e, t, r - 1), m = Vt(p, t.offsetTree, l) + i + a, h = m + pt(t.sizeTree, p)[1], g = c + a, _ = u({
			itemBottom: h,
			itemTop: m,
			locationParams: f,
			viewportBottom: c + n - s,
			viewportTop: g
		});
		return _ === null ? d?.() : d && Ie(I(o, P((e) => !e), Ve(j(o) ? 1 : 2)), d), _;
	}), P((e) => e !== null)), l), { scrollIntoView: u };
}, O(Qt, K, an, kn, Xe), { singleton: !0 });
function Fn(e) {
	return e === !1 ? !1 : e === "smooth" ? "smooth" : "auto";
}
var In = (e, t) => typeof e == "function" ? Fn(e(t)) : t && Fn(e), Ln = H(([{ listRefresh: e, totalCount: t, fixedItemSize: n, data: r }, { atBottomState: i, isAtBottom: a }, { scrollToIndex: o }, { scrolledToInitialItem: s }, { didMount: c, propsReady: l }, { log: u }, { scrollingInProgress: d }, { context: f }, { scrollIntoView: p }]) => {
	let m = R(!1), h = B(), g = null;
	function _(e) {
		A(o, {
			align: "end",
			behavior: e,
			index: "LAST"
		});
	}
	k(I(U(I(W(t), Ve(1)), c), L(W(m), a, s, d), F(([[e, t], n, r, i, a]) => {
		let o = t && i, s = "auto";
		return o && (s = In(n, r || a), o &&= s !== !1), {
			followOutputBehavior: s,
			shouldFollow: o,
			totalCount: e
		};
	}), P(({ shouldFollow: e }) => e)), ({ followOutputBehavior: t, totalCount: r }) => {
		g !== null && (g(), g = null), j(n) === void 0 ? g = Ie(e, () => {
			j(u)("following output to ", { totalCount: r }, G.DEBUG), _(t), g = null;
		}) : requestAnimationFrame(() => {
			j(u)("following output to ", { totalCount: r }, G.DEBUG), _(t);
		});
	});
	function v(e) {
		let t = Ie(i, (t) => {
			e && !t.atBottom && t.notAtBottomBecause === "SIZE_INCREASED" && g === null && (j(u)("scrolling to bottom due to increased size", {}, G.DEBUG), _("auto"));
		});
		setTimeout(t, 100);
	}
	k(I(U(W(m), t, l), P(([e, , t]) => e !== !1 && t), Be(({ value: e }, [, t]) => ({
		refreshed: e === t,
		value: t
	}), {
		refreshed: !1,
		value: 0
	}), P(({ refreshed: e }) => e), L(m, t)), ([, e]) => {
		j(s) && v(e !== !1);
	}), k(h, () => {
		v(j(m) !== !1);
	}), k(U(W(m), i), ([e, t]) => {
		e !== !1 && !t.atBottom && t.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING" && _("auto");
	});
	let y = R(null), b = B();
	return M(qe(I(W(r), F((e) => e?.length ?? 0)), I(W(t))), b), k(I(U(I(b, Ve(1)), c), L(W(y), s, d, f), F(([[e, t], n, r, i, a]) => t && r && n?.({
		context: a,
		totalCount: e,
		scrollingInProgress: i
	})), P((e) => !!e), He(0)), (t) => {
		g !== null && (g(), g = null), j(n) === void 0 ? g = Ie(e, () => {
			j(u)("scrolling into view", {}), A(p, t), g = null;
		}) : requestAnimationFrame(() => {
			j(u)("scrolling into view", {}), A(p, t);
		});
	}), {
		autoscrollToBottom: h,
		followOutput: m,
		scrollIntoViewOnChange: y
	};
}, O(Qt, gn, an, ln, tn, Xe, K, Mn, Pn)), Rn = H(([{ data: e, firstItemIndex: t, gap: n, sizes: r }, { initialTopMostItemIndex: i }, { initialItemCount: a, listState: o }, { didMount: s }]) => (M(I(s, L(a), P(([, e]) => e !== 0), L(i, r, t, n, e), F(([[, e], t, n, r, i, a = []]) => En(e, t, n, r, i, a))), o), {}), O(Qt, ln, kn, tn), { singleton: !0 }), zn = H(([{ didMount: e }, { scrollTo: t }, { listState: n }]) => {
	let r = R(0);
	return k(I(e, L(r), P(([, e]) => e !== 0), F(([, e]) => ({ top: e }))), (e) => {
		Ie(I(n, Ve(1), P((e) => e.items.length > 1)), () => {
			requestAnimationFrame(() => {
				A(t, e);
			});
		});
	}), { initialScrollTop: r };
}, O(tn, K, kn), { singleton: !0 }), Bn = H(([{ scrollVelocity: e }]) => {
	let t = R(!1), n = B(), r = R(!1);
	return M(I(e, L(r, t, n), P(([e, t]) => t !== !1 && t !== void 0), F(([e, t, n, r]) => {
		let { enter: i, exit: a } = t;
		if (n) {
			if (a(e, r)) return !1;
		} else if (i(e, r)) return !0;
		return n;
	}), N()), t), k(I(U(t, e, n), L(r)), ([[e, t, n], r]) => {
		e && r !== !1 && r !== void 0 && r.change && r.change(t, n);
	}), {
		isSeeking: t,
		scrollSeekConfiguration: r,
		scrollSeekRangeChanged: n,
		scrollVelocity: e
	};
}, O(gn), { singleton: !0 }), Vn = H(([{ scrollContainerState: e, scrollTo: t }]) => {
	let n = B(), r = B(), i = B(), a = R(!1), o = R(void 0);
	return M(I(U(n, r), F(([{ scrollTop: e, viewportHeight: t }, { offsetTop: n, listHeight: r }]) => ({
		scrollHeight: r,
		scrollTop: Math.max(0, e - n),
		viewportHeight: t
	}))), e), M(I(t, L(r), F(([e, { offsetTop: t }]) => ({
		...e,
		top: e.top + t
	}))), i), {
		customScrollParent: o,
		useWindowScroll: a,
		windowScrollContainerState: n,
		windowScrollTo: i,
		windowViewportRect: r
	};
}, O(K)), Hn = H(([{ sizeRanges: e, sizes: t }, { headerHeight: n, scrollTop: r }, { initialTopMostItemIndex: i }, { didMount: a }, { useWindowScroll: o, windowScrollContainerState: s, windowViewportRect: c }]) => {
	let l = B(), u = R(void 0), d = R(null), f = R(null);
	return M(s, d), M(c, f), k(I(l, L(t, r, o, d, f, n)), ([e, t, n, r, i, a, o]) => {
		let s = Kt(t.sizeTree);
		r && i !== null && a !== null && (n = i.scrollTop - a.offsetTop), n -= o, e({
			ranges: s,
			scrollTop: n
		});
	}), M(I(u, P(Ae), F(Un)), i), M(I(a, L(u), P(([, e]) => e !== void 0), N(), F(([, e]) => e.ranges)), e), {
		getState: l,
		restoreStateFrom: u
	};
}, O(Qt, K, ln, tn, Vn));
function Un(e) {
	return {
		align: "start",
		index: 0,
		offset: e.scrollTop
	};
}
var Wn = H(([{ topItemsIndexes: e }]) => {
	let t = R(0);
	return M(I(t, P((e) => e >= 0), F((e) => Array.from({ length: e }).map((e, t) => t))), e), { topItemCount: t };
}, O(kn));
function Gn(e) {
	let t = !1, n;
	return (() => (t || (t = !0, n = e()), n));
}
var Kn = Gn(() => /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent)), qn = H(([{ data: e, defaultItemSize: t, firstItemIndex: n, fixedItemSize: r, fixedGroupSize: i, gap: a, groupIndices: o, heightEstimates: s, itemSize: c, sizeRanges: l, sizes: u, statefulTotalCount: d, totalCount: f, trackItemSizes: p }, { initialItemFinalLocationReached: m, initialTopMostItemIndex: h, scrolledToInitialItem: g }, _, v, y, b, { scrollToIndex: x }, S, { topItemCount: C }, { groupCounts: w }, T]) => {
	let { listState: E, minOverscanItemCount: ee, topItemsIndexes: te, rangeChanged: ne, ...re } = b;
	return M(ne, T.scrollSeekRangeChanged), M(I(T.windowViewportRect, F((e) => e.visibleHeight)), _.viewportHeight), {
		data: e,
		defaultItemHeight: t,
		firstItemIndex: n,
		fixedItemHeight: r,
		fixedGroupHeight: i,
		gap: a,
		groupCounts: w,
		heightEstimates: s,
		initialItemFinalLocationReached: m,
		initialTopMostItemIndex: h,
		scrolledToInitialItem: g,
		sizeRanges: l,
		topItemCount: C,
		topItemsIndexes: te,
		totalCount: f,
		...y,
		groupIndices: o,
		itemSize: c,
		listState: E,
		minOverscanItemCount: ee,
		scrollToIndex: x,
		statefulTotalCount: d,
		trackItemSizes: p,
		rangeChanged: ne,
		...re,
		...T,
		..._,
		sizes: u,
		...v
	};
}, O(Qt, ln, K, Hn, Ln, kn, an, H(([{ deviation: e, scrollBy: t, scrollingInProgress: n, scrollTop: r }, { isAtBottom: i, isScrolling: a, lastJumpDueToItemResize: o, scrollDirection: s }, { listState: c }, { beforeUnshiftWith: l, gap: u, shiftWithOffset: d, sizes: f }, { log: p }, { recalcInProgress: m }]) => {
	let h = V(I(c, L(o), Be(([, e, t, n], [{ bottom: r, items: i, offsetBottom: a, totalCount: o }, s]) => {
		let c = r + a, l = 0;
		return t === o && e.length > 0 && i.length > 0 && (i[0].originalIndex === 0 && e[0].originalIndex === 0 || (l = c - n, l !== 0 && (l += s))), [
			l,
			i,
			o,
			c
		];
	}, [
		0,
		[],
		0,
		0
	]), P(([e]) => e !== 0), L(r, s, n, i, p, m), P(([, e, t, n, , , r]) => !r && !n && e !== 0 && t === dn), F(([[e], , , , , t]) => (t("Upward scrolling compensation", { amount: e }, G.DEBUG), e))));
	function g(n) {
		n > 0 ? (A(t, {
			behavior: "auto",
			top: -n
		}), A(e, 0)) : (A(e, 0), A(t, {
			behavior: "auto",
			top: -n
		}));
	}
	return k(I(h, L(e, a)), ([t, n, r]) => {
		r && Kn() ? A(e, n - t) : g(-t);
	}), k(I(U(z(a, !1), e, m), P(([e, t, n]) => !e && !n && t !== 0), F(([e, t]) => t), He(1)), g), M(I(d, F((e) => ({ top: -e }))), t), k(I(l, L(f, u), F(([e, { groupIndices: t, lastSize: n, sizeTree: r }, i]) => {
		function a(e) {
			return e * (n + i);
		}
		if (t.length === 0) return a(e);
		let o = 0, s = ft(r, 0), c = 0, l = 0;
		for (; c < e;) {
			c++, o += s;
			let n = t.length === l + 1 ? Infinity : t[l + 1] - t[l] - 1;
			c + n > e && (o -= s, n = e - c + 1), c += n, o += a(n), l++;
		}
		return o;
	})), (n) => {
		A(e, n), requestAnimationFrame(() => {
			A(t, { top: n }), requestAnimationFrame(() => {
				A(e, 0), A(m, !1);
			});
		});
	}), { deviation: e };
}, O(K, gn, kn, Qt, Xe, At)), Wn, en, H(([e, t, n, r, i, a, o, s, c, l, u]) => ({
	...e,
	...t,
	...n,
	...r,
	...i,
	...a,
	...o,
	...s,
	...c,
	...l,
	...u
}), O(Sn, Rn, tn, Bn, An, zn, jn, Vn, Pn, Xe, Mn))));
function Jn(e, t) {
	let n = {}, r = {}, i = 0, a = e.length;
	for (; i < a;) r[e[i]] = 1, i += 1;
	for (let e in t) Object.hasOwn(r, e) || (n[e] = t[e]);
	return n;
}
var Yn = typeof document < "u" ? e.useLayoutEffect : e.useEffect;
function Xn(t, n, r) {
	let i = Object.keys(n.required || {}), a = Object.keys(n.optional || {}), o = Object.keys(n.methods || {}), s = Object.keys(n.events || {}), c = e.createContext({});
	function l(e, t) {
		e.propsReady !== void 0 && A(e.propsReady, !1);
		for (let r of i) {
			let i = e[n.required[r]];
			A(i, t[r]);
		}
		for (let r of a) if (r in t) {
			let i = e[n.optional[r]];
			A(i, t[r]);
		}
		e.propsReady !== void 0 && A(e.propsReady, !0);
	}
	function u(e) {
		return o.reduce((t, r) => (t[r] = (t) => {
			let i = e[n.methods[r]];
			A(i, t);
		}, t), {});
	}
	function f(e) {
		return s.reduce((t, r) => (t[r] = We(e[n.events[r]]), t), {});
	}
	return {
		Component: e.forwardRef(function(n, o) {
			let { children: p, ...m } = n, [h] = e.useState(() => Ne(Ke(t), (e) => {
				l(e, m);
			})), [g] = e.useState(Oe(f, h));
			Yn(() => {
				for (let e of s) e in m && k(g[e], m[e]);
				return () => {
					Object.values(g).map(Fe);
				};
			}, [
				m,
				g,
				h
			]), Yn(() => {
				l(h, m);
			}), e.useImperativeHandle(o, Te(u(h)));
			let _ = r;
			return /* @__PURE__ */ d(c.Provider, {
				value: h,
				children: r === void 0 ? p : /* @__PURE__ */ d(_, {
					...Jn([
						...i,
						...a,
						...s
					], m),
					children: p
				})
			});
		}),
		useEmitter: (t, n) => {
			let r = e.useContext(c)[t];
			Yn(() => k(r, n), [n, r]);
		},
		useEmitterValue: parseInt(e.version) >= 18 ? (t) => {
			let n = e.useContext(c)[t], r = e.useCallback((e) => k(n, e), [n]);
			return e.useSyncExternalStore(r, () => j(n), () => j(n));
		} : (t) => {
			let n = e.useContext(c)[t], [r, i] = e.useState(Oe(j, n));
			return Yn(() => k(n, (e) => {
				e !== r && i(Te(e));
			}), [n, r]), r;
		},
		usePublisher: (t) => {
			let n = e.useContext(c);
			return e.useCallback((e) => {
				A(n[t], e);
			}, [n, t]);
		}
	};
}
var Zn = e.createContext(void 0), Qn = e.createContext(void 0), $n = "-webkit-sticky", er = "sticky", tr = Gn(() => {
	if (typeof document > "u") return er;
	let e = document.createElement("div");
	return e.style.position = $n, e.style.position === $n ? $n : er;
}), nr = typeof document < "u" ? e.useLayoutEffect : e.useEffect;
function rr(e) {
	return "self" in e;
}
function ir(e) {
	return "body" in e;
}
function ar(t, n, r, i = Me, a, o) {
	let s = e.useRef(null), c = e.useRef(null), l = e.useRef(null), u = e.useCallback((e) => {
		let r, i, a, s = e.target;
		if (ir(s) || rr(s)) {
			let e = rr(s) ? s : s.defaultView;
			a = o === !0 ? nt(e, e.scrollX) : e.scrollY, r = o === !0 ? e.document.documentElement.scrollWidth : e.document.documentElement.scrollHeight, i = o === !0 ? e.innerWidth : e.innerHeight;
		} else a = o === !0 ? nt(s, s.scrollLeft) : s.scrollTop, r = o === !0 ? s.scrollWidth : s.scrollHeight, i = o === !0 ? s.offsetWidth : s.offsetHeight;
		let u = () => {
			t({
				scrollHeight: r,
				scrollTop: Math.max(a, 0),
				viewportHeight: i
			});
		};
		e.suppressFlushSync === !0 ? u() : p.flushSync(u), c.current !== null && (a === c.current || a <= 0 || a === r - i) && (c.current = null, n(!0), l.current &&= (clearTimeout(l.current), null));
	}, [
		t,
		n,
		o
	]);
	e.useEffect(() => {
		let e = a || s.current;
		return et(e), i(a || s.current), u({
			suppressFlushSync: !0,
			target: e
		}), e.addEventListener("scroll", u, { passive: !0 }), () => {
			et(e), i(null), e.removeEventListener("scroll", u);
		};
	}, [
		s,
		u,
		r,
		i,
		a
	]);
	function d(e) {
		let r = s.current;
		if (!r || (o === !0 ? "offsetWidth" in r && r.offsetWidth === 0 : "offsetHeight" in r && r.offsetHeight === 0)) return;
		let i = e.behavior === "smooth", a, u, d;
		rr(r) ? (u = Math.max(Pt(r.document.documentElement, o === !0 ? "width" : "height"), o === !0 ? r.document.documentElement.scrollWidth : r.document.documentElement.scrollHeight), a = o === !0 ? r.innerWidth : r.innerHeight, d = o === !0 ? nt(r, r.scrollX) : r.scrollY) : (u = r[o === !0 ? "scrollWidth" : "scrollHeight"], a = Pt(r, o === !0 ? "width" : "height"), d = o === !0 ? nt(r, r.scrollLeft) : r.scrollTop);
		let f = u - a;
		if (e.top === void 0) {
			r.scrollTo(e);
			return;
		}
		let p = Math.ceil(Math.max(Math.min(f, e.top), 0));
		if (e.top = p, un(a, u) || p === d) {
			t({
				scrollHeight: u,
				scrollTop: d,
				viewportHeight: a
			}), i && n(!0);
			return;
		}
		i ? (c.current = p, l.current && clearTimeout(l.current), l.current = setTimeout(() => {
			l.current = null, c.current = null, n(!0);
		}, 1e3)) : c.current = null, o === !0 && (e = {
			...e.behavior === void 0 ? {} : { behavior: e.behavior },
			left: rt(r, p)
		}), r.scrollTo(e);
	}
	function f(e) {
		o === !0 && (e = {
			...e.behavior === void 0 ? {} : { behavior: e.behavior },
			...e.top === void 0 ? {} : { left: rt(s.current, e.top) }
		}), s.current.scrollBy(e);
	}
	return {
		scrollByCallback: f,
		scrollerRef: s,
		scrollToCallback: d
	};
}
function or(e) {
	return e;
}
var sr = /* @__PURE__ */ H(([e, t]) => ({
	...e,
	...t
}), O(qn, /* @__PURE__ */ H(() => {
	let e = R((e) => `Item ${e}`), t = R((e) => `Group ${e}`), n = R({}), r = R(or), i = R("div"), a = R(Me), o = (e, t = null) => z(I(n, F((t) => t[e]), N()), t);
	return {
		components: n,
		computeItemKey: r,
		EmptyPlaceholder: o("EmptyPlaceholder"),
		FooterComponent: o("Footer"),
		GroupComponent: o("Group", "div"),
		groupContent: t,
		HeaderComponent: o("Header"),
		HeaderFooterTag: i,
		ItemComponent: o("Item", "div"),
		itemContent: e,
		ListComponent: o("List", "div"),
		ScrollerComponent: o("Scroller", "div"),
		scrollerRef: a,
		ScrollSeekPlaceholder: o("ScrollSeekPlaceholder"),
		TopItemListComponent: o("TopItemList")
	};
}))), cr = ({ height: e }) => /* @__PURE__ */ d("div", { style: { height: e } }), lr = {
	overflowAnchor: "none",
	position: tr(),
	zIndex: 1
}, ur = { overflowAnchor: "none" }, dr = {
	...ur,
	display: "inline-block",
	height: "100%"
}, fr = /* @__PURE__ */ e.memo(function({ showTopList: t = !1 }) {
	let r = Z("listState"), i = Or("sizeRanges"), a = Z("useWindowScroll"), o = Z("customScrollParent"), s = Or("windowScrollContainerState"), c = Or("scrollContainerState"), l = o || a ? s : c, u = Z("itemContent"), f = Z("context"), p = Z("groupContent"), m = Z("trackItemSizes"), h = Z("itemSize"), g = Z("log"), _ = Or("gap"), v = Z("horizontalDirection"), { callbackRef: y } = ot(i, h, m, t ? Me : l, g, _, o, v, Z("skipAnimationFrameInResizeObserver")), [b, x] = e.useState(0);
	Dr("deviation", (e) => {
		b !== e && x(e);
	});
	let S = Z("EmptyPlaceholder"), C = Z("ScrollSeekPlaceholder") ?? cr, w = Z("ListComponent"), T = Z("ItemComponent"), E = Z("GroupComponent"), ee = Z("computeItemKey"), te = Z("isSeeking"), ne = Z("groupIndices").length > 0, re = Z("alignToBottom"), D = Z("initialItemFinalLocationReached"), ie = t ? {} : {
		boxSizing: "border-box",
		...v ? {
			display: "inline-block",
			height: "100%",
			marginInlineStart: b === 0 ? re ? "auto" : 0 : b,
			paddingInlineEnd: r.offsetBottom,
			paddingInlineStart: r.offsetTop,
			whiteSpace: "nowrap"
		} : {
			marginTop: b === 0 ? re ? "auto" : 0 : b,
			paddingBottom: r.offsetBottom,
			paddingTop: r.offsetTop
		},
		...D ? {} : { visibility: "hidden" }
	};
	return !t && r.totalCount === 0 && S != null ? /* @__PURE__ */ d(S, { ...X(S, f) }) : /* @__PURE__ */ d(w, {
		...X(w, f),
		"data-testid": t ? "virtuoso-top-item-list" : "virtuoso-item-list",
		ref: y,
		style: ie,
		children: (t ? r.topItems : r.items).map((e) => {
			let t = e.originalIndex, i = ee(t + r.firstItemIndex, e.data, f);
			return te ? /* @__PURE__ */ n(C, {
				...X(C, f),
				height: e.size,
				index: e.index,
				key: i,
				type: e.type || "item",
				...e.type === "group" ? {} : { groupIndex: e.groupIndex }
			}) : e.type === "group" ? /* @__PURE__ */ n(E, {
				...X(E, f),
				"data-index": t,
				"data-item-index": e.index,
				"data-known-size": e.size,
				key: i,
				style: lr
			}, p(e.index, f)) : /* @__PURE__ */ n(T, {
				...X(T, f),
				...vr(T, e.data),
				"data-index": t,
				"data-item-group-index": e.groupIndex,
				"data-item-index": e.index,
				"data-known-size": e.size,
				key: i,
				style: v ? dr : ur
			}, ne ? u(e.index, e.groupIndex, e.data, f) : u(e.index, e.data, f));
		})
	});
}), pr = {
	height: "100%",
	outline: "none",
	overflowY: "auto",
	position: "relative",
	WebkitOverflowScrolling: "touch"
}, mr = {
	outline: "none",
	overflowX: "auto",
	position: "relative"
}, hr = (e) => ({
	height: "100%",
	position: "absolute",
	top: 0,
	width: "100%",
	...e ? {
		display: "flex",
		flexDirection: "column"
	} : void 0
}), gr = (e, t, n = 0) => ({
	...hr(e),
	position: t ? "relative" : "absolute",
	top: t ? -n : 0
}), _r = {
	position: tr(),
	top: 0,
	width: "100%",
	zIndex: 1
};
function X(e, t) {
	if (typeof e != "string") return { context: t };
}
function vr(e, t) {
	return { item: typeof e == "string" ? void 0 : t };
}
var yr = /* @__PURE__ */ e.memo(function() {
	let t = Z("HeaderComponent"), n = Or("headerHeight"), r = Z("HeaderFooterTag"), i = it(e.useMemo(() => (e) => {
		n(Pt(e, "height"));
	}, [n]), !0, Z("skipAnimationFrameInResizeObserver")), a = Z("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...X(t, a) })
	});
}), br = /* @__PURE__ */ e.memo(function() {
	let t = Z("FooterComponent"), n = Or("footerHeight"), r = Z("HeaderFooterTag"), i = it(e.useMemo(() => (e) => {
		n(Pt(e, "height"));
	}, [n]), !0, Z("skipAnimationFrameInResizeObserver")), a = Z("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...X(t, a) })
	});
});
function xr({ useEmitter: t, useEmitterValue: n, usePublisher: r }) {
	return e.memo(function({ children: e, style: i, context: a, ...o }) {
		let s = r("scrollContainerState"), c = n("ScrollerComponent"), l = r("smoothScrollTargetReached"), u = n("scrollerRef"), f = n("horizontalDirection") || !1, { scrollByCallback: p, scrollerRef: m, scrollToCallback: h } = ar(s, l, c, u, void 0, f);
		return t("scrollTo", h), t("scrollBy", p), /* @__PURE__ */ d(c, {
			"data-testid": "virtuoso-scroller",
			"data-virtuoso-scroller": !0,
			ref: m,
			style: {
				...f ? mr : pr,
				...i
			},
			tabIndex: 0,
			...o,
			...X(c, a),
			children: e
		});
	});
}
function Sr({ useEmitter: t, useEmitterValue: n, usePublisher: r }) {
	return e.memo(function({ children: i, style: a, context: o, ...s }) {
		let c = r("windowScrollContainerState"), l = n("ScrollerComponent"), u = r("smoothScrollTargetReached"), f = n("totalListHeight"), p = n("deviation"), m = n("customScrollParent"), h = e.useRef(null), { scrollByCallback: g, scrollerRef: _, scrollToCallback: v } = ar(c, u, l, n("scrollerRef"), m);
		return nr(() => (_.current = m || h.current?.ownerDocument.defaultView, () => {
			_.current = null;
		}), [_, m]), t("windowScrollTo", v), t("scrollBy", g), /* @__PURE__ */ d(l, {
			ref: h,
			"data-virtuoso-scroller": !0,
			style: {
				position: "relative",
				...a,
				...f === 0 ? void 0 : { height: f + p }
			},
			...s,
			...X(l, o),
			children: i
		});
	});
}
var Cr = ({ children: t }) => {
	let n = e.useContext(Zn), r = Or("viewportHeight"), i = Or("fixedItemHeight"), a = Z("alignToBottom"), o = Z("horizontalDirection"), s = it(e.useMemo(() => De(r, (e) => Pt(e, o ? "width" : "height")), [r, o]), !0, Z("skipAnimationFrameInResizeObserver"));
	return e.useEffect(() => {
		n && (r(n.viewportHeight), i(n.itemHeight));
	}, [
		n,
		r,
		i
	]), /* @__PURE__ */ d("div", {
		"data-viewport-type": "element",
		ref: s,
		style: hr(a),
		children: t
	});
}, wr = ({ children: t }) => {
	let n = e.useContext(Zn), r = Or("windowViewportRect"), i = Or("fixedItemHeight"), a = Z("customScrollParent"), o = Z("useWindowScroll"), s = Z("topListHeight"), c = lt(r, a, Z("skipAnimationFrameInResizeObserver")), l = Z("alignToBottom");
	return e.useEffect(() => {
		n && (i(n.itemHeight), r({
			listHeight: 0,
			offsetTop: 0,
			visibleHeight: n.viewportHeight,
			visibleWidth: 100
		}));
	}, [
		n,
		r,
		i
	]), /* @__PURE__ */ d("div", {
		"data-viewport-type": "window",
		ref: c,
		style: gr(l, o, s),
		children: t
	});
}, Tr = ({ children: e }) => {
	let t = Z("TopItemListComponent") ?? "div", n = Z("headerHeight");
	return /* @__PURE__ */ d(t, {
		style: {
			..._r,
			marginTop: `${n}px`
		},
		...X(t, Z("context")),
		children: e
	});
}, { Component: Er, useEmitter: Dr, useEmitterValue: Z, usePublisher: Or } = /* @__PURE__ */ Xn(sr, {
	optional: {
		restoreStateFrom: "restoreStateFrom",
		context: "context",
		followOutput: "followOutput",
		scrollIntoViewOnChange: "scrollIntoViewOnChange",
		itemContent: "itemContent",
		groupContent: "groupContent",
		overscan: "overscan",
		increaseViewportBy: "increaseViewportBy",
		minOverscanItemCount: "minOverscanItemCount",
		totalCount: "totalCount",
		groupCounts: "groupCounts",
		topItemCount: "topItemCount",
		firstItemIndex: "firstItemIndex",
		initialTopMostItemIndex: "initialTopMostItemIndex",
		components: "components",
		atBottomThreshold: "atBottomThreshold",
		atTopThreshold: "atTopThreshold",
		computeItemKey: "computeItemKey",
		defaultItemHeight: "defaultItemHeight",
		fixedGroupHeight: "fixedGroupHeight",
		fixedItemHeight: "fixedItemHeight",
		heightEstimates: "heightEstimates",
		itemSize: "itemSize",
		scrollSeekConfiguration: "scrollSeekConfiguration",
		headerFooterTag: "HeaderFooterTag",
		data: "data",
		initialItemCount: "initialItemCount",
		initialScrollTop: "initialScrollTop",
		alignToBottom: "alignToBottom",
		useWindowScroll: "useWindowScroll",
		customScrollParent: "customScrollParent",
		scrollerRef: "scrollerRef",
		logLevel: "logLevel",
		horizontalDirection: "horizontalDirection",
		skipAnimationFrameInResizeObserver: "skipAnimationFrameInResizeObserver"
	},
	methods: {
		scrollToIndex: "scrollToIndex",
		scrollIntoView: "scrollIntoView",
		scrollTo: "scrollTo",
		scrollBy: "scrollBy",
		autoscrollToBottom: "autoscrollToBottom",
		getState: "getState"
	},
	events: {
		isScrolling: "isScrolling",
		endReached: "endReached",
		startReached: "startReached",
		rangeChanged: "rangeChanged",
		atBottomStateChange: "atBottomStateChange",
		atTopStateChange: "atTopStateChange",
		totalListHeightChanged: "totalListHeightChanged",
		itemsRendered: "itemsRendered",
		groupIndices: "groupIndices"
	}
}, /* @__PURE__ */ e.memo(function(e) {
	let t = Z("useWindowScroll"), n = Z("topItemsIndexes").length > 0, r = Z("customScrollParent"), i = Z("context");
	return /* @__PURE__ */ f(r || t ? Ar : kr, {
		...e,
		context: i,
		children: [n && /* @__PURE__ */ d(Tr, { children: /* @__PURE__ */ d(fr, { showTopList: !0 }) }), /* @__PURE__ */ f(r || t ? wr : Cr, { children: [
			/* @__PURE__ */ d(yr, {}),
			/* @__PURE__ */ d(fr, {}),
			/* @__PURE__ */ d(br, {})
		] })]
	});
})), kr = /* @__PURE__ */ xr({
	useEmitter: Dr,
	useEmitterValue: Z,
	usePublisher: Or
}), Ar = /* @__PURE__ */ Sr({
	useEmitter: Dr,
	useEmitterValue: Z,
	usePublisher: Or
}), jr = /* @__PURE__ */ H(([e, t]) => ({
	...e,
	...t
}), O(qn, /* @__PURE__ */ H(() => {
	let e = R((e) => /* @__PURE__ */ f("td", { children: ["Item $", e] })), t = R(null), n = R((e) => /* @__PURE__ */ f("td", {
		colSpan: 1e3,
		children: ["Group ", e]
	})), r = R(null), i = R(null), a = R({}), o = R(or), s = R(Me), c = (e, t = null) => z(I(a, F((t) => t[e]), N()), t);
	return {
		components: a,
		computeItemKey: o,
		context: t,
		EmptyPlaceholder: c("EmptyPlaceholder"),
		FillerRow: c("FillerRow"),
		fixedFooterContent: i,
		fixedHeaderContent: r,
		itemContent: e,
		groupContent: n,
		ScrollerComponent: c("Scroller", "div"),
		scrollerRef: s,
		ScrollSeekPlaceholder: c("ScrollSeekPlaceholder"),
		TableBodyComponent: c("TableBody", "tbody"),
		TableComponent: c("Table", "table"),
		TableFooterComponent: c("TableFoot", "tfoot"),
		TableHeadComponent: c("TableHead", "thead"),
		TableRowComponent: c("TableRow", "tr"),
		GroupComponent: c("Group", "tr")
	};
}))), Mr = ({ height: e }) => /* @__PURE__ */ d("tr", { children: /* @__PURE__ */ d("td", { style: { height: e } }) }), Nr = ({ height: e }) => /* @__PURE__ */ d("tr", { children: /* @__PURE__ */ d("td", { style: {
	border: 0,
	height: e,
	padding: 0
} }) }), Pr = { overflowAnchor: "none" }, Fr = {
	position: tr(),
	zIndex: 2,
	overflowAnchor: "none"
}, Ir = /* @__PURE__ */ e.memo(function({ showTopList: e = !1 }) {
	let t = Q("listState"), r = Q("computeItemKey"), i = Q("firstItemIndex"), a = Q("context"), o = Q("isSeeking"), s = Q("fixedHeaderHeight"), c = Q("groupIndices").length > 0, l = Q("itemContent"), u = Q("groupContent"), d = Q("ScrollSeekPlaceholder") ?? Mr, f = Q("GroupComponent"), p = Q("TableRowComponent"), m = (e ? t.topItems : []).reduce((e, t, n) => (n === 0 ? e.push(t.size) : e.push(e[n - 1] + t.size), e), []);
	return (e ? t.topItems : t.items).map((t) => {
		let h = t.originalIndex, g = r(h + i, t.data, a), _ = e ? h === 0 ? 0 : m[h - 1] : 0;
		return o ? /* @__PURE__ */ n(d, {
			...X(d, a),
			height: t.size,
			index: t.index,
			key: g,
			type: t.type || "item"
		}) : t.type === "group" ? /* @__PURE__ */ n(f, {
			...X(f, a),
			"data-index": h,
			"data-item-index": t.index,
			"data-known-size": t.size,
			key: g,
			style: {
				...Fr,
				top: s
			}
		}, u(t.index, a)) : /* @__PURE__ */ n(p, {
			...X(p, a),
			...vr(p, t.data),
			"data-index": h,
			"data-item-index": t.index,
			"data-known-size": t.size,
			"data-item-group-index": t.groupIndex,
			key: g,
			style: e ? {
				...Fr,
				top: s + _
			} : Pr
		}, c ? l(t.index, t.groupIndex, t.data, a) : l(t.index, t.data, a));
	});
}), Lr = /* @__PURE__ */ e.memo(function() {
	let t = Q("listState"), n = Q("topItemsIndexes").length > 0, r = Hr("sizeRanges"), i = Q("useWindowScroll"), a = Q("customScrollParent"), o = Hr("windowScrollContainerState"), s = Hr("scrollContainerState"), c = a || i ? o : s, l = Q("trackItemSizes"), { callbackRef: u, ref: p } = ot(r, Q("itemSize"), l, c, Q("log"), void 0, a, !1, Q("skipAnimationFrameInResizeObserver")), [m, h] = e.useState(0);
	Vr("deviation", (e) => {
		m !== e && (p.current.style.marginTop = `${e}px`, h(e));
	});
	let g = Q("EmptyPlaceholder"), _ = Q("FillerRow") ?? Nr, v = Q("TableBodyComponent"), y = Q("paddingTopAddition"), b = Q("statefulTotalCount"), x = Q("context");
	if (b === 0 && g != null) return /* @__PURE__ */ d(g, { ...X(g, x) });
	let S = (n ? t.topItems : []).reduce((e, t) => e + t.size, 0), C = t.offsetTop + y + m - S, w = t.offsetBottom, T = C > 0 ? /* @__PURE__ */ d(_, {
		context: x,
		height: C
	}, "padding-top") : null, E = w > 0 ? /* @__PURE__ */ d(_, {
		context: x,
		height: w
	}, "padding-bottom") : null;
	return /* @__PURE__ */ f(v, {
		"data-testid": "virtuoso-item-list",
		ref: u,
		...X(v, x),
		children: [
			T,
			n && /* @__PURE__ */ d(Ir, { showTopList: !0 }),
			/* @__PURE__ */ d(Ir, {}),
			E
		]
	});
}), Rr = ({ children: t }) => {
	let n = e.useContext(Zn), r = Hr("viewportHeight"), i = Hr("fixedItemHeight"), a = it(e.useMemo(() => De(r, (e) => Pt(e, "height")), [r]), !0, Q("skipAnimationFrameInResizeObserver"));
	return e.useEffect(() => {
		n && (r(n.viewportHeight), i(n.itemHeight));
	}, [
		n,
		r,
		i
	]), /* @__PURE__ */ d("div", {
		"data-viewport-type": "element",
		ref: a,
		style: hr(!1),
		children: t
	});
}, zr = ({ children: t }) => {
	let n = e.useContext(Zn), r = Hr("windowViewportRect"), i = Hr("fixedItemHeight"), a = Q("customScrollParent"), o = Q("useWindowScroll"), s = lt(r, a, Q("skipAnimationFrameInResizeObserver"));
	return e.useEffect(() => {
		n && (i(n.itemHeight), r({
			listHeight: 0,
			offsetTop: 0,
			visibleHeight: n.viewportHeight,
			visibleWidth: 100
		}));
	}, [
		n,
		r,
		i
	]), /* @__PURE__ */ d("div", {
		"data-viewport-type": "window",
		ref: s,
		style: gr(!1, o),
		children: t
	});
}, { Component: Br, useEmitter: Vr, useEmitterValue: Q, usePublisher: Hr } = /* @__PURE__ */ Xn(jr, {
	optional: {
		restoreStateFrom: "restoreStateFrom",
		context: "context",
		followOutput: "followOutput",
		firstItemIndex: "firstItemIndex",
		itemContent: "itemContent",
		groupContent: "groupContent",
		fixedHeaderContent: "fixedHeaderContent",
		fixedFooterContent: "fixedFooterContent",
		overscan: "overscan",
		increaseViewportBy: "increaseViewportBy",
		minOverscanItemCount: "minOverscanItemCount",
		totalCount: "totalCount",
		topItemCount: "topItemCount",
		initialTopMostItemIndex: "initialTopMostItemIndex",
		components: "components",
		groupCounts: "groupCounts",
		atBottomThreshold: "atBottomThreshold",
		atTopThreshold: "atTopThreshold",
		computeItemKey: "computeItemKey",
		defaultItemHeight: "defaultItemHeight",
		fixedGroupHeight: "fixedGroupHeight",
		fixedItemHeight: "fixedItemHeight",
		itemSize: "itemSize",
		scrollSeekConfiguration: "scrollSeekConfiguration",
		data: "data",
		initialItemCount: "initialItemCount",
		initialScrollTop: "initialScrollTop",
		alignToBottom: "alignToBottom",
		useWindowScroll: "useWindowScroll",
		customScrollParent: "customScrollParent",
		scrollerRef: "scrollerRef",
		logLevel: "logLevel"
	},
	methods: {
		scrollToIndex: "scrollToIndex",
		scrollIntoView: "scrollIntoView",
		scrollTo: "scrollTo",
		scrollBy: "scrollBy",
		getState: "getState"
	},
	events: {
		isScrolling: "isScrolling",
		endReached: "endReached",
		startReached: "startReached",
		rangeChanged: "rangeChanged",
		atBottomStateChange: "atBottomStateChange",
		atTopStateChange: "atTopStateChange",
		totalListHeightChanged: "totalListHeightChanged",
		itemsRendered: "itemsRendered",
		groupIndices: "groupIndices"
	}
}, /* @__PURE__ */ e.memo(function(t) {
	let n = Q("useWindowScroll"), r = Q("customScrollParent"), i = Hr("fixedHeaderHeight"), a = Hr("fixedFooterHeight"), o = Q("fixedHeaderContent"), s = Q("fixedFooterContent"), c = Q("context"), l = it(e.useMemo(() => De(i, (e) => Pt(e, "height")), [i]), !0, Q("skipAnimationFrameInResizeObserver")), u = it(e.useMemo(() => De(a, (e) => Pt(e, "height")), [a]), !0, Q("skipAnimationFrameInResizeObserver")), p = r || n ? Wr : Ur, m = r || n ? zr : Rr, h = Q("TableComponent"), g = Q("TableHeadComponent"), _ = Q("TableFooterComponent"), v = o ? /* @__PURE__ */ d(g, {
		ref: l,
		style: {
			position: "sticky",
			top: 0,
			zIndex: 2
		},
		...X(g, c),
		children: o()
	}, "TableHead") : null, y = s ? /* @__PURE__ */ d(_, {
		ref: u,
		style: {
			bottom: 0,
			position: "sticky",
			zIndex: 1
		},
		...X(_, c),
		children: s()
	}, "TableFoot") : null;
	return /* @__PURE__ */ d(p, {
		...t,
		...X(p, c),
		children: /* @__PURE__ */ d(m, { children: /* @__PURE__ */ f(h, {
			style: {
				borderSpacing: 0,
				overflowAnchor: "none"
			},
			...X(h, c),
			children: [
				v,
				/* @__PURE__ */ d(Lr, {}, "TableBody"),
				y
			]
		}) })
	});
})), Ur = /* @__PURE__ */ xr({
	useEmitter: Vr,
	useEmitterValue: Q,
	usePublisher: Hr
}), Wr = /* @__PURE__ */ Sr({
	useEmitter: Vr,
	useEmitterValue: Q,
	usePublisher: Hr
}), Gr = Br, Kr = {
	bottom: 0,
	itemHeight: 0,
	items: [],
	itemWidth: 0,
	offsetBottom: 0,
	offsetTop: 0,
	top: 0
}, qr = {
	bottom: 0,
	itemHeight: 0,
	items: [{ index: 0 }],
	itemWidth: 0,
	offsetBottom: 0,
	offsetTop: 0,
	top: 0
}, { ceil: Jr, floor: Yr, max: Xr, min: Zr, round: Qr } = Math;
function $r(e, t, n) {
	return Array.from({ length: t - e + 1 }).map((t, r) => ({
		data: n === null ? null : n[r + e],
		index: r + e
	}));
}
function ei(e) {
	return {
		...qr,
		items: e
	};
}
function ti(e, t) {
	return e !== void 0 && e.width === t.width && e.height === t.height;
}
function ni(e, t) {
	return e !== void 0 && e.column === t.column && e.row === t.row;
}
var ri = /* @__PURE__ */ H(([{ increaseViewportBy: e, listBoundary: t, overscan: n, visibleRange: r }, { footerHeight: i, headerHeight: a, scrollBy: o, scrollContainerState: s, scrollTo: c, scrollTop: l, smoothScrollTargetReached: u, viewportHeight: d }, f, p, { didMount: m, propsReady: h }, { customScrollParent: g, useWindowScroll: _, windowScrollContainerState: v, windowScrollTo: y, windowViewportRect: b }, x]) => {
	let S = R(0), C = R(0), w = R(Kr), T = R({
		height: 0,
		width: 0
	}), E = R({
		height: 0,
		width: 0
	}), ee = B(), te = B(), ne = R(0), re = R(null), D = R({
		column: 0,
		row: 0
	}), ie = B(), ae = B(), oe = R(!1), se = R(0), ce = R(!0), le = R(!1), ue = R(!1);
	k(I(m, L(se), P(([e, t]) => t !== 0)), () => {
		A(ce, !1);
	}), k(I(U(m, ce, E, T, se, le), P(([e, t, n, r, , i]) => e && !t && n.height !== 0 && r.height !== 0 && !i)), ([, , , , e]) => {
		A(le, !0), sn(1, () => {
			A(ee, e);
		}), Ie(I(l), () => {
			A(t, [0, 0]), A(ce, !0);
		});
	}), M(I(ae, P((e) => e != null && e.scrollTop > 0), ze(0)), C), k(I(m, L(ae), P(([, e]) => e != null)), ([, e]) => {
		e && (A(T, e.viewport), A(E, e.item), A(D, e.gap), e.scrollTop > 0 && (A(oe, !0), Ie(I(l, Ve(1)), (e) => {
			A(oe, !1);
		}), A(c, { top: e.scrollTop })));
	}), M(I(T, F(({ height: e }) => e)), d), M(I(U(W(T, ti), W(E, ti), W(D, (e, t) => e !== void 0 && e.column === t.column && e.row === t.row), W(l)), F(([e, t, n, r]) => ({
		gap: n,
		item: t,
		scrollTop: r,
		viewport: e
	}))), ie), M(I(U(W(S), r, W(D, ni), W(E, ti), W(T, ti), W(re), W(C), W(oe), W(ce), W(se)), P(([, , , , , , , e]) => !e), F(([e, [t, n], r, i, a, o, s, , c, l]) => {
		let { column: u, row: d } = r, { height: f, width: p } = i, { width: m } = a;
		if (s === 0 && (e === 0 || m === 0)) return Kr;
		if (p === 0) {
			let t = cn(l, e);
			return ei($r(t, t + Math.max(s - 1, 0), o));
		}
		let h = ii(m, p, u), g, _;
		c ? t === 0 && n === 0 && s > 0 ? (g = 0, _ = s - 1) : (g = h * Yr((t + d) / (f + d)), _ = h * Jr((n + d) / (f + d)) - 1, _ = Zr(e - 1, Xr(_, h - 1)), g = Zr(_, Xr(0, g))) : (g = 0, _ = -1);
		let v = $r(g, _, o), { bottom: y, top: b } = ai(a, r, i, v), x = Jr(e / h);
		return {
			bottom: y,
			itemHeight: f,
			items: v,
			itemWidth: p,
			offsetBottom: x * f + (x - 1) * d - y,
			offsetTop: b,
			top: b
		};
	})), w), M(I(re, P((e) => e !== null), F((e) => e.length)), S), M(I(U(T, E, w, D), P(([e, t, { items: n }]) => n.length > 0 && t.height !== 0 && e.height !== 0), F(([e, t, { items: n }, r]) => {
		let { bottom: i, top: a } = ai(e, r, t, n);
		return [a, i];
	}), N(kt)), t);
	let de = R(!1);
	M(I(l, L(de), F(([e, t]) => t || e !== 0)), de);
	let fe = V(I(U(w, S), P(([{ items: e }]) => e.length > 0), L(de), P(([[e, t], n]) => {
		let r = e.items[e.items.length - 1].index === t - 1;
		return (n || e.bottom > 0 && e.itemHeight > 0 && e.offsetBottom === 0 && e.items.length === t) && r;
	}), F(([[, e]]) => e - 1), N())), pe = V(I(W(w), P(({ items: e }) => e.length > 0 && e[0].index === 0), ze(0), N())), me = V(I(W(w), L(oe), P(([{ items: e }, t]) => e.length > 0 && !t), F(([{ items: e }]) => ({
		endIndex: e[e.length - 1].index,
		startIndex: e[0].index
	})), N(Ot), He(0)));
	M(me, p.scrollSeekRangeChanged), M(I(ee, L(T, E, S, D), F(([e, t, n, r, i]) => {
		let a = rn(e), { align: o, behavior: s, offset: c } = a, l = a.index;
		l === "LAST" && (l = r - 1), l = Xr(0, l, Zr(r - 1, l));
		let u = oi(t, i, n, l);
		return o === "end" ? u = Qr(u - t.height + n.height) : o === "center" && (u = Qr(u - t.height / 2 + n.height / 2)), c !== void 0 && c !== 0 && (u += c), {
			behavior: s,
			top: u
		};
	})), c);
	let he = z(I(w, F((e) => e.offsetBottom + e.bottom)), 0);
	return M(I(b, F((e) => ({
		height: e.visibleHeight,
		width: e.visibleWidth
	}))), T), {
		customScrollParent: g,
		data: re,
		deviation: ne,
		footerHeight: i,
		gap: D,
		headerHeight: a,
		increaseViewportBy: e,
		initialItemCount: C,
		itemDimensions: E,
		overscan: n,
		restoreStateFrom: ae,
		scrollBy: o,
		scrollContainerState: s,
		scrollHeight: te,
		scrollTo: c,
		scrollToIndex: ee,
		scrollTop: l,
		smoothScrollTargetReached: u,
		totalCount: S,
		useWindowScroll: _,
		viewportDimensions: T,
		windowScrollContainerState: v,
		windowScrollTo: y,
		windowViewportRect: b,
		...p,
		gridState: w,
		horizontalDirection: ue,
		initialTopMostItemIndex: se,
		totalListHeight: he,
		...f,
		endReached: fe,
		propsReady: h,
		rangeChanged: me,
		startReached: pe,
		stateChanged: ie,
		stateRestoreInProgress: oe,
		...x
	};
}, O(Sn, K, gn, Bn, tn, Vn, Xe));
function ii(e, t, n) {
	return Xr(1, Yr((e + n) / (Yr(t) + n)));
}
function ai(e, t, n, r) {
	let { height: i } = n;
	if (i === void 0 || r.length === 0) return {
		bottom: 0,
		top: 0
	};
	let a = oi(e, t, n, r[0].index);
	return {
		bottom: oi(e, t, n, r[r.length - 1].index) + i,
		top: a
	};
}
function oi(e, t, n, r) {
	let i = Yr(r / ii(e.width, n.width, t.column)), a = i * n.height + Xr(0, i - 1) * t.row;
	return a > 0 ? a + t.row : a;
}
var si = /* @__PURE__ */ H(([e, t]) => ({
	...e,
	...t
}), O(ri, /* @__PURE__ */ H(() => {
	let e = R((e) => `Item ${e}`), t = R({}), n = R(null), r = R("virtuoso-grid-item"), i = R("virtuoso-grid-list"), a = R(or), o = R("div"), s = R(Me), c = (e, n = null) => z(I(t, F((t) => t[e]), N()), n), l = R(!1), u = R(!1);
	return M(W(u), l), {
		components: t,
		computeItemKey: a,
		context: n,
		FooterComponent: c("Footer"),
		HeaderComponent: c("Header"),
		headerFooterTag: o,
		itemClassName: r,
		ItemComponent: c("Item", "div"),
		itemContent: e,
		listClassName: i,
		ListComponent: c("List", "div"),
		readyStateChanged: l,
		reportReadyState: u,
		ScrollerComponent: c("Scroller", "div"),
		scrollerRef: s,
		ScrollSeekPlaceholder: c("ScrollSeekPlaceholder", "div")
	};
}))), ci = /* @__PURE__ */ e.memo(function() {
	let t = $("gridState"), r = $("listClassName"), i = $("itemClassName"), a = $("itemContent"), o = $("computeItemKey"), s = $("isSeeking"), c = hi("scrollHeight"), l = $("ItemComponent"), u = $("ListComponent"), f = $("ScrollSeekPlaceholder"), p = $("context"), m = hi("itemDimensions"), h = hi("gap"), g = $("log"), _ = $("stateRestoreInProgress"), v = hi("reportReadyState"), y = it(e.useMemo(() => (e) => {
		let t = e.parentElement.parentElement.scrollHeight;
		c(t);
		let n = e.firstChild;
		if (n !== null) {
			let { height: e, width: t } = n.getBoundingClientRect();
			m({
				height: e,
				width: t
			});
		}
		h({
			column: vi("column-gap", getComputedStyle(e).columnGap, g),
			row: vi("row-gap", getComputedStyle(e).rowGap, g)
		});
	}, [
		c,
		m,
		h,
		g
	]), !0, !1);
	return nr(() => {
		t.itemHeight > 0 && t.itemWidth > 0 && v(!0);
	}, [t]), _ ? null : /* @__PURE__ */ d(u, {
		className: r,
		ref: y,
		...X(u, p),
		"data-testid": "virtuoso-item-list",
		style: {
			paddingBottom: t.offsetBottom,
			paddingTop: t.offsetTop
		},
		children: t.items.map((e) => {
			let r = o(e.index, e.data, p);
			return s ? /* @__PURE__ */ d(f, {
				...X(f, p),
				height: t.itemHeight,
				index: e.index,
				width: t.itemWidth
			}, r) : /* @__PURE__ */ n(l, {
				...X(l, p),
				className: i,
				"data-index": e.index,
				key: r
			}, a(e.index, e.data, p));
		})
	});
}), li = e.memo(function() {
	let t = $("HeaderComponent"), n = hi("headerHeight"), r = $("headerFooterTag"), i = it(e.useMemo(() => (e) => {
		n(Pt(e, "height"));
	}, [n]), !0, !1), a = $("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...X(t, a) })
	});
}), ui = e.memo(function() {
	let t = $("FooterComponent"), n = hi("footerHeight"), r = $("headerFooterTag"), i = it(e.useMemo(() => (e) => {
		n(Pt(e, "height"));
	}, [n]), !0, !1), a = $("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...X(t, a) })
	});
}), di = ({ children: t }) => {
	let n = e.useContext(Qn), r = hi("itemDimensions"), i = hi("viewportDimensions"), a = it(e.useMemo(() => (e) => {
		i(e.getBoundingClientRect());
	}, [i]), !0, !1);
	return e.useEffect(() => {
		n && (i({
			height: n.viewportHeight,
			width: n.viewportWidth
		}), r({
			height: n.itemHeight,
			width: n.itemWidth
		}));
	}, [
		n,
		i,
		r
	]), /* @__PURE__ */ d("div", {
		ref: a,
		style: hr(!1),
		children: t
	});
}, fi = ({ children: t }) => {
	let n = e.useContext(Qn), r = hi("windowViewportRect"), i = hi("itemDimensions"), a = $("customScrollParent"), o = $("useWindowScroll"), s = lt(r, a, !1);
	return e.useEffect(() => {
		n && (i({
			height: n.itemHeight,
			width: n.itemWidth
		}), r({
			listHeight: 0,
			offsetTop: 0,
			visibleHeight: n.viewportHeight,
			visibleWidth: n.viewportWidth
		}));
	}, [
		n,
		r,
		i
	]), /* @__PURE__ */ d("div", {
		ref: s,
		style: gr(!1, o),
		children: t
	});
}, { Component: pi, useEmitter: mi, useEmitterValue: $, usePublisher: hi } = /* @__PURE__ */ Xn(si, {
	optional: {
		context: "context",
		totalCount: "totalCount",
		overscan: "overscan",
		itemContent: "itemContent",
		components: "components",
		computeItemKey: "computeItemKey",
		data: "data",
		initialItemCount: "initialItemCount",
		scrollSeekConfiguration: "scrollSeekConfiguration",
		headerFooterTag: "headerFooterTag",
		listClassName: "listClassName",
		itemClassName: "itemClassName",
		useWindowScroll: "useWindowScroll",
		customScrollParent: "customScrollParent",
		scrollerRef: "scrollerRef",
		logLevel: "logLevel",
		restoreStateFrom: "restoreStateFrom",
		initialTopMostItemIndex: "initialTopMostItemIndex",
		increaseViewportBy: "increaseViewportBy"
	},
	methods: {
		scrollTo: "scrollTo",
		scrollBy: "scrollBy",
		scrollToIndex: "scrollToIndex"
	},
	events: {
		isScrolling: "isScrolling",
		endReached: "endReached",
		startReached: "startReached",
		rangeChanged: "rangeChanged",
		atBottomStateChange: "atBottomStateChange",
		atTopStateChange: "atTopStateChange",
		stateChanged: "stateChanged",
		readyStateChanged: "readyStateChanged"
	}
}, /* @__PURE__ */ e.memo(function({ ...e }) {
	let t = $("useWindowScroll"), n = $("customScrollParent"), r = n || t ? _i : gi, i = n || t ? fi : di, a = $("context");
	return /* @__PURE__ */ d(r, {
		...e,
		...X(r, a),
		children: /* @__PURE__ */ f(i, { children: [
			/* @__PURE__ */ d(li, {}),
			/* @__PURE__ */ d(ci, {}),
			/* @__PURE__ */ d(ui, {})
		] })
	});
})), gi = /* @__PURE__ */ xr({
	useEmitter: mi,
	useEmitterValue: $,
	usePublisher: hi
}), _i = /* @__PURE__ */ Sr({
	useEmitter: mi,
	useEmitterValue: $,
	usePublisher: hi
});
function vi(e, t, n) {
	return t !== "normal" && t?.endsWith("px") !== !0 && n(`${e} was not resolved to pixel value correctly`, t, G.WARN), t === "normal" ? 0 : parseInt(t ?? "0", 10);
}
//#endregion
//#region src/virtual/FixedHeaderContent.tsx
function yi() {
	let [e] = w(), [t, n] = D();
	return /* @__PURE__ */ d("tr", { children: e.map((e, r) => /* @__PURE__ */ d(oe, {
		field: e,
		sorted: t?.field === e.field,
		ascending: t?.ascending,
		className: h(typeof e.className == "function" ? { [`text-${e.align}`]: !!e.align } : e.className),
		onClick: n
	}, r)) });
}
//#endregion
//#region src/virtual/ItemContent.tsx
function bi({ row: e, renderRow: t }) {
	let [n] = w();
	return t ? t(e) : /* @__PURE__ */ d(b, {
		fields: n,
		row: e
	});
}
//#endregion
//#region src/virtual/VirtualTable.tsx
function xi({ containerProps: e, size: t, rowHeight: n, maxHeight: r, headerHeight: i, data: o, className: s, fields: l, keyField: u, onSelectRow: f, selected: p, ...m }) {
	let g = ye(), y = n ?? ve(t), b = i ?? ve(t), [x, C] = c(r ?? g), [w, T] = c(x);
	a(() => {
		C(r ?? g);
	}, [r, g]);
	let E = (e) => {
		let t = e + b;
		T(Math.min(t, x));
	}, ee = h("table", s, { [`table-${t}`]: !!t }), te = {
		Table: ({ children: e, style: t }) => /* @__PURE__ */ d(_, {
			style: t,
			className: ee,
			...m,
			children: e
		}),
		TableRow: ({ children: e, item: t, ...n }) => /* @__PURE__ */ d(v, {
			row: t,
			...n,
			children: e
		})
	}, ne = () => /* @__PURE__ */ d(yi, {});
	return /* @__PURE__ */ d(S, {
		initialFields: l,
		children: /* @__PURE__ */ d(be, {
			...e,
			style: {
				...e?.style,
				height: w
			},
			children: /* @__PURE__ */ d(Gr, {
				data: o,
				components: te,
				totalListHeightChanged: E,
				fixedItemHeight: y,
				fixedHeaderContent: ne,
				itemContent: (e, t) => {
					let n = String(typeof u == "function" ? u(t) : t[u]);
					return /* @__PURE__ */ d(bi, {
						row: t,
						onClick: f,
						selected: typeof p == "function" ? p(t) : n === p
					}, e);
				}
			})
		})
	});
}
//#endregion
export { E as ContainedDataTable, te as ContainedDataTableRow, le as ContainedSortableTable, ee as DataTable, y as DataTableCell, he as DataTableCols, x as DataTableContext, S as DataTableProvider, ne as DataTableRow, b as DataTableRowCellSet, re as DataTableTBody, C as DataTableTH, v as DataTableTR, pe as RowsPerPage, de as SortableTable, se as SortableTableHead, oe as SortableTableTH, _ as Table, me as TablePagination, xi as VirtualTable, ge as useField, _e as useTableContext, w as useTableFields, D as useTableSort };

//# sourceMappingURL=index.es.js.map