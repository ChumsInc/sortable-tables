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
	}, (e.field.includes(".") || t[e.field] === void 0) && !e.render ? null : typeof e.render == "function" ? e.render(t) : t[e.field]);
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
    // flex-direction: ${(e) => e.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(e) => ie(e.align)};

    .sort-icon {
        flex-grow: 0;
        opacity: ${(e) => e.sorted ? 1 : .25};
        padding-right: 0.25rem;
    }

    &:hover .sort-icon {
        color: ${(e) => e.sorted ? "unset" : "var(--bs-primary)"};
        opacity: 1;
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
		"bi-arrow-down": t && n,
		"bi-arrow-up": t && !n,
		"bi-arrow-down-up": !t
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
			}), /* @__PURE__ */ d("div", { className: h("ms-1 sort-icon", l) })]
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
//#region src/virtual/useScreenHeight.ts
function ve() {
	let [e, t] = c(typeof window < "u" ? window.innerHeight : 0);
	return a(() => {
		if (typeof window > "u") return;
		let e = () => t(window.innerHeight);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), e;
}
//#endregion
//#region node_modules/react-virtuoso/dist/index.mjs
var ye = 0, be = 1, xe = 2, Se = 4;
function Ce(e) {
	return () => e;
}
function we(e) {
	e();
}
function Te(e, t) {
	return (n) => e(t(n));
}
function Ee(e, t) {
	return () => e(t);
}
function De(e, t) {
	return (n) => e(t, n);
}
function Oe(e) {
	return e !== void 0;
}
function ke(...e) {
	return () => {
		e.map(we);
	};
}
function Ae() {}
function je(e, t) {
	return t(e), e;
}
function Me(e, t) {
	return t(e);
}
function O(...e) {
	return e;
}
function k(e, t) {
	return e(be, t);
}
function A(e, t) {
	e(ye, t);
}
function Ne(e) {
	e(xe);
}
function j(e) {
	return e(Se);
}
function M(e, t) {
	return k(e, De(t, ye));
}
function Pe(e, t) {
	let n = e(be, (e) => {
		n(), t(e);
	});
	return n;
}
function Fe(e) {
	let t, n;
	return (r) => (i) => {
		t = i, n && clearTimeout(n), n = setTimeout(() => {
			r(t);
		}, e);
	};
}
function Ie(e, t) {
	return e === t;
}
function N(e = Ie) {
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
	return (t) => Te(t, e);
}
function Le(e) {
	return (t) => () => {
		t(e);
	};
}
function I(e, ...t) {
	let n = Ve(...t);
	return ((t, r) => {
		switch (t) {
			case xe:
				Ne(e);
				return;
			case be: return k(e, n(r));
		}
	});
}
function Re(e, t) {
	return (n) => (r) => {
		n(t = e(t, r));
	};
}
function ze(e) {
	return (t) => (n) => {
		e > 0 ? e-- : t(n);
	};
}
function Be(e) {
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
function Ve(...e) {
	return (t) => e.reduceRight(Me, t);
}
function He(e) {
	let t, n, r = () => t?.();
	return function(i, a) {
		switch (i) {
			case be: return a ? n === a ? void 0 : (r(), n = a, t = k(e, a), t) : (r(), Ae);
			case xe:
				r(), n = null;
				return;
		}
	};
}
function R(e) {
	let t = e, n = B();
	return ((e, r) => {
		switch (e) {
			case ye:
				t = r;
				break;
			case be:
				r(t);
				break;
			case Se: return t;
		}
		return n(e, r);
	});
}
function z(e, t) {
	return je(R(t), (t) => M(e, t));
}
function B() {
	let e = [];
	return ((t, n) => {
		switch (t) {
			case ye:
				e.slice().forEach((e) => {
					e(n);
				});
				return;
			case xe:
				e.splice(0, e.length);
				return;
			case be: return e.push(n), () => {
				let t = e.indexOf(n);
				t > -1 && e.splice(t, 1);
			};
		}
	});
}
function V(e) {
	return je(B(), (t) => M(e, t));
}
function H(e, t = [], { singleton: n } = { singleton: !0 }) {
	return {
		constructor: e,
		dependencies: t,
		id: Ue(),
		singleton: n
	};
}
var Ue = () => Symbol();
function We(e) {
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
			case xe:
				Ne(t);
				return;
			case be: return r === i && a(n), k(t, a);
		}
	};
}
function W(e, t = Ie) {
	return I(e, N(t));
}
function Ge(...e) {
	return function(t, n) {
		switch (t) {
			case xe: return;
			case be: return ke(...e.map((e) => k(e, n)));
		}
	};
}
var G = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3
}, Ke = {
	[G.DEBUG]: "debug",
	[G.ERROR]: "error",
	[G.INFO]: "log",
	[G.WARN]: "warn"
}, qe = () => typeof globalThis > "u" ? window : globalThis, Je = H(() => {
	let e = R(G.ERROR);
	return {
		log: R((t, n, r = G.INFO) => {
			r >= (qe().VIRTUOSO_LOG_LEVEL ?? j(e)) && console[Ke[r]]("%creact-virtuoso: %c%s %o", "color: #0253b3; font-weight: bold", "color: initial", t, n);
		}),
		logLevel: e
	};
}, [], { singleton: !0 }), Ye = /* @__PURE__ */ new WeakMap();
function Xe(e) {
	return "self" in e ? e.document.documentElement : e;
}
function Ze(e) {
	let t = Xe(e), n = Ye.get(t);
	if (n !== void 0) return n;
	let r = t.ownerDocument.defaultView.getComputedStyle(t).direction === "rtl";
	return Ye.set(t, r), r;
}
function Qe(e) {
	Ye.delete(Xe(e));
}
function $e(e, t) {
	return Ze(e) ? -t : t;
}
var et = $e;
function tt(e, t) {
	return $e(e, t);
}
function nt(e, t, n) {
	return rt(e, t, n).callbackRef;
}
function rt(t, n, r) {
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
function it(t, n, r, i, a, o, s, c, l) {
	return rt(e.useCallback((e) => {
		let r = at(e.children, n, c ? "offsetWidth" : "offsetHeight", a), l = e.parentElement;
		for (; l.dataset.virtuosoScroller === void 0;) l = l.parentElement;
		let u = l.lastElementChild.dataset.viewportType === "window", d;
		u && (d = l.ownerDocument.defaultView);
		let f = s ? c ? s.scrollWidth : s.scrollHeight : u ? c ? d.document.documentElement.scrollWidth : d.document.documentElement.scrollHeight : c ? l.scrollWidth : l.scrollHeight, p = s ? c ? s.offsetWidth : s.offsetHeight : u ? c ? d.innerWidth : d.innerHeight : c ? l.offsetWidth : l.offsetHeight, m = s ? c ? et(s, s.scrollLeft) : s.scrollTop : u ? c ? et(d, d.scrollX || d.document.documentElement.scrollLeft) : d.scrollY || d.document.documentElement.scrollTop : c ? et(l, l.scrollLeft) : l.scrollTop;
		i({
			scrollHeight: f,
			scrollTop: Math.max(m, 0),
			viewportHeight: p
		}), o?.(c ? ot("column-gap", getComputedStyle(e).columnGap, a) : ot("row-gap", getComputedStyle(e).rowGap, a)), r !== null && t(r);
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
function at(e, t, n, r) {
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
function ot(e, t, n) {
	return t !== "normal" && t?.endsWith("px") !== !0 && n(`${e} was not resolved to pixel value correctly`, t, G.WARN), t === "normal" ? 0 : parseInt(t ?? "0", 10);
}
function st(t, n, r) {
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
	}, [t, n]), { callbackRef: o, ref: s } = rt(a, !0, r), c = e.useCallback(() => {
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
}, [], { singleton: !0 }), ct = { lvl: 0 };
function lt(e, t) {
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
	return e === ct;
}
function ut(e, t) {
	if (!q(e)) return t === e.k ? e.v : t < e.k ? ut(e.l, t) : ut(e.r, t);
}
function dt(e, t, n = "k") {
	if (q(e)) return [-Infinity, void 0];
	if (Number(e[n]) === t) return [e.k, e.v];
	if (Number(e[n]) < t) {
		let r = dt(e.r, t, n);
		return r[0] === -Infinity ? [e.k, e.v] : r;
	}
	return dt(e.l, t, n);
}
function J(e, t, n) {
	return q(e) ? xt(t, n, 1) : t === e.k ? Y(e, {
		k: t,
		v: n
	}) : t < e.k ? St(Y(e, { l: J(e.l, t, n) })) : St(Y(e, { r: J(e.r, t, n) }));
}
function ft() {
	return ct;
}
function pt(e, t, n) {
	if (q(e)) return [];
	let r = dt(e, t)[0];
	return Tt(gt(e, r, n));
}
function mt(e, t) {
	if (q(e)) return ct;
	let { k: n, l: r, r: i } = e;
	if (t === n) {
		if (q(r)) return i;
		if (q(i)) return r;
		let [t, n] = bt(r);
		return _t(Y(e, {
			k: t,
			l: vt(r),
			v: n
		}));
	}
	return _t(t < n ? Y(e, { l: mt(r, t) }) : Y(e, { r: mt(i, t) }));
}
function ht(e) {
	return q(e) ? [] : [
		...ht(e.l),
		{
			k: e.k,
			v: e.v
		},
		...ht(e.r)
	];
}
function gt(e, t, n) {
	if (q(e)) return [];
	let { k: r, l: i, r: a, v: o } = e, s = [];
	return r > t && (s = s.concat(gt(i, t, n))), r >= t && r <= n && s.push({
		k: r,
		v: o
	}), r <= n && (s = s.concat(gt(a, t, n))), s;
}
function _t(e) {
	let { l: t, lvl: n, r } = e;
	if (r.lvl >= n - 1 && t.lvl >= n - 1) return e;
	if (n > r.lvl + 1) {
		if (yt(t)) return Ct(Y(e, { lvl: n - 1 }));
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
	if (yt(e)) return wt(Y(e, { lvl: n - 1 }));
	if (!q(r) && !q(r.l)) {
		let t = r.l, i = yt(t) ? r.lvl - 1 : r.lvl;
		return Y(t, {
			l: Y(e, {
				lvl: n - 1,
				r: t.l
			}),
			lvl: t.lvl + 1,
			r: wt(Y(r, {
				l: t.r,
				lvl: i
			}))
		});
	}
	throw Error("Unexpected empty nodes");
}
function Y(e, t) {
	return xt(t.k === void 0 ? e.k : t.k, t.v === void 0 ? e.v : t.v, t.lvl === void 0 ? e.lvl : t.lvl, t.l === void 0 ? e.l : t.l, t.r === void 0 ? e.r : t.r);
}
function vt(e) {
	return q(e.r) ? e.l : _t(Y(e, { r: vt(e.r) }));
}
function yt(e) {
	return q(e) || e.lvl > e.r.lvl;
}
function bt(e) {
	return q(e.r) ? [e.k, e.v] : bt(e.r);
}
function xt(e, t, n, r = ct, i = ct) {
	return {
		k: e,
		l: r,
		lvl: n,
		r: i,
		v: t
	};
}
function St(e) {
	return wt(Ct(e));
}
function Ct(e) {
	let { l: t } = e;
	return !q(t) && t.lvl === e.lvl ? Y(t, { r: Y(e, { l: t.r }) }) : e;
}
function wt(e) {
	let { lvl: t, r: n } = e;
	return !q(n) && !q(n.r) && n.lvl === t && n.r.lvl === t ? Y(n, {
		l: Y(e, { r: n.l }),
		lvl: t + 1
	}) : e;
}
function Tt(e) {
	return lt(e, ({ k: e, v: t }) => ({
		index: e,
		value: t
	}));
}
function Et(e, t) {
	return !!(e && e.startIndex === t.startIndex && e.endIndex === t.endIndex);
}
function Dt(e, t) {
	return !!(e && e[0] === t[0] && e[1] === t[1]);
}
var Ot = H(() => ({ recalcInProgress: R(!1) }), [], { singleton: !0 });
function kt(e, t, n) {
	return e[At(e, t, n)];
}
function At(e, t, n, r = 0) {
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
function jt(e, t, n, r) {
	let i = At(e, t, r), a = At(e, n, r, i);
	return e.slice(i, a + 1);
}
function Mt(e, t) {
	return Math.round(e.getBoundingClientRect()[t]);
}
function Nt(e) {
	return !q(e.groupOffsetTree);
}
function Pt({ index: e }, t) {
	return t === e ? 0 : t < e ? -1 : 1;
}
function Ft() {
	return {
		groupIndices: [],
		groupOffsetTree: ft(),
		lastIndex: 0,
		lastOffset: 0,
		lastSize: 0,
		offsetTree: [],
		sizeTree: ft()
	};
}
function It(e, t) {
	let n = q(e) ? 0 : Infinity;
	for (let r of t) {
		let { endIndex: t, size: i, startIndex: a } = r;
		if (n = Math.min(n, a), q(e)) {
			e = J(e, 0, i);
			continue;
		}
		let o = pt(e, a - 1, t + 1);
		if (o.some(Jt(r))) continue;
		let s = !1, c = !1;
		for (let { end: n, start: r, value: a } of o) s ? (t >= r || i === a) && (e = mt(e, r)) : (c = a !== i, s = !0), n > t && t >= r && a !== i && (e = J(e, t + 1, a));
		c && (e = J(e, a, i));
	}
	return [e, n];
}
function Lt(e) {
	return typeof e.groupIndex < "u";
}
function Rt({ offset: e }, t) {
	return t === e ? 0 : t < e ? -1 : 1;
}
function zt(e, t, n) {
	if (t.length === 0) return 0;
	let { index: r, offset: i, size: a } = kt(t, e, Pt), o = e - r, s = a * o + (o - 1) * n + i;
	return s > 0 ? s + n : s;
}
function Bt(e, t) {
	if (!Nt(t)) return e;
	let n = 0;
	for (; t.groupIndices[n] <= e + n;) n++;
	return e + n;
}
function Vt(e, t, n) {
	if (Lt(e)) return t.groupIndices[e.groupIndex] + 1;
	let r = Bt(e.index === "LAST" ? n : e.index, t);
	return r = Math.max(0, r, Math.min(n, r)), r;
}
function Ht(e, t, n, r = 0) {
	return r > 0 && (t = Math.max(t, kt(e, r, Pt).offset)), lt(jt(e, t, n, Rt), qt);
}
function Ut(e, [t, n, r, i]) {
	t.length > 0 && r("received item sizes", t, G.DEBUG);
	let a = e.sizeTree, o = a, s = 0;
	if (n.length > 0 && q(a) && t.length === 2) {
		let e = t[0].size, r = t[1].size;
		o = n.reduce((t, n) => J(J(t, n, e), n + 1, r), o);
	} else [o, s] = It(o, t);
	if (o === a) return e;
	let { lastIndex: c, lastOffset: l, lastSize: u, offsetTree: d } = Kt(e.offsetTree, s, o, i);
	return {
		groupIndices: n,
		groupOffsetTree: n.reduce((e, t) => J(e, t, zt(t, d, i)), ft()),
		lastIndex: c,
		lastOffset: l,
		lastSize: u,
		offsetTree: d,
		sizeTree: o
	};
}
function Wt(e) {
	return ht(e).map(({ k: e, v: t }, n, r) => {
		let i = r[n + 1];
		return {
			endIndex: i === void 0 ? Infinity : i.k - 1,
			size: t,
			startIndex: e
		};
	});
}
function Gt(e, t) {
	let n = 0, r = 0;
	for (; n < e;) n += t[r + 1] - t[r] - 1, r++;
	return r - (n === e ? 0 : 1);
}
function Kt(e, t, n, r) {
	let i = e, a = 0, o = 0, s = 0, c = 0;
	if (t !== 0) {
		c = At(i, t - 1, Pt), s = i[c].offset;
		let e = dt(n, t - 1);
		a = e[0], o = e[1], i.length && i[c].size === dt(n, t)[1] && --c, i = i.slice(0, c + 1);
	} else i = [];
	for (let { start: e, value: c } of pt(n, t, Infinity)) {
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
function qt(e) {
	return {
		index: e.index,
		value: e
	};
}
function Jt(e) {
	let { endIndex: t, size: n, startIndex: r } = e;
	return (e) => e.start === r && (e.end === t || e.end === Infinity) && e.value === n;
}
var Yt = {
	offsetHeight: "height",
	offsetWidth: "width"
}, Xt = H(([{ log: e }, { recalcInProgress: t }]) => {
	let n = B(), r = B(), i = z(r, 0), a = B(), o = B(), s = R(0), c = R([]), l = R(void 0), u = R(void 0), d = R(void 0), f = R(void 0), p = R((e, t) => Mt(e, Yt[t])), m = R(void 0), h = R(0), g = Ft(), _ = z(I(n, L(c, e, h), Re(Ut, g), N()), g), v = z(I(c, N(), Re((e, t) => ({
		current: t,
		prev: e.current
	}), {
		current: [],
		prev: []
	}), F(({ prev: e }) => e)), []);
	M(I(c, P((e) => e.length > 0), L(_, h), F(([e, t, n]) => {
		let r = e.reduce((e, r, i) => J(e, r, zt(r, t.offsetTree, n) || i), ft());
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
	let b = V(I(n, L(_), Re(({ sizes: e }, [t, n]) => ({
		changed: n !== e,
		sizes: n
	}), {
		changed: !1,
		sizes: g
	}), F((e) => e.changed)));
	k(I(s, Re((e, t) => ({
		diff: e.prev - t,
		prev: t
	}), {
		diff: 0,
		prev: 0
	}), F((e) => e.diff)), (e) => {
		let { groupIndices: n } = j(_);
		if (e > 0) A(t, !0), A(a, e + Gt(e, n));
		else if (e < 0) {
			let t = j(v);
			t.length > 0 && (e -= Gt(-e, t)), A(o, e);
		}
	}), k(I(s, L(e)), ([e, t]) => {
		e < 0 && t("`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value", { firstItemIndex: s }, G.ERROR);
	});
	let x = V(a);
	M(I(a, L(_), F(([e, t]) => {
		let n = t.groupIndices.length > 0, r = [], i = t.lastSize;
		if (n) {
			let n = ut(t.sizeTree, 0), a = 0, o = 0;
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
			let s = ht(t.sizeTree);
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
		return ht(t.sizeTree).reduce((t, { k: n, v: r }) => ({
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
	let S = V(I(o, L(_, h), F(([e, { offsetTree: t }, n]) => zt(-e, t, n))));
	return M(I(o, L(_, h), F(([e, t, n]) => {
		if (t.groupIndices.length > 0) {
			if (q(t.sizeTree)) return t;
			let r = ft(), i = j(v), a = 0, o = 0, s = 0;
			for (; a < -e;) {
				s = i[o];
				let e = i[o + 1] - s - 1;
				o++, a += e + 1;
			}
			if (r = ht(t.sizeTree).reduce((t, { k: n, v: r }) => J(t, Math.max(0, n + e), r), r), a !== -e) {
				let n = ut(t.sizeTree, s);
				r = J(r, 0, n);
				let i = dt(t.sizeTree, -e + 1)[1];
				r = J(r, 1, i);
			}
			return {
				...t,
				sizeTree: r,
				...Kt(t.offsetTree, 0, r, n)
			};
		}
		let r = ht(t.sizeTree).reduce((t, { k: n, v: r }) => J(t, Math.max(0, n + e), r), ft());
		return {
			...t,
			sizeTree: r,
			...Kt(t.offsetTree, 0, r, n)
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
}, O(Je, Ot), { singleton: !0 });
function Zt(e) {
	return e.reduce((e, t) => (e.groupIndices.push(e.totalCount), e.totalCount += t + 1, e), {
		groupIndices: [],
		totalCount: 0
	});
}
var Qt = H(([{ groupIndices: e, sizes: t, totalCount: n }, { headerHeight: r, scrollTop: i }]) => {
	let a = B(), o = B(), s = V(I(a, F(Zt)));
	return M(I(s, F((e) => e.totalCount)), n), M(I(s, F((e) => e.groupIndices)), e), M(I(U(i, t, r), P(([e, t]) => Nt(t)), F(([e, t, n]) => dt(t.groupOffsetTree, Math.max(e - n, 0), "v")[0]), N(), F((e) => [e])), o), {
		groupCounts: a,
		topItemsIndexes: o
	};
}, O(Xt, K)), $t = H(([{ log: e }]) => {
	let t = R(!1), n = V(I(t, P((e) => e), N()));
	return k(t, (t) => {
		t && j(e)("props updated", {}, G.DEBUG);
	}), {
		didMount: n,
		propsReady: t
	};
}, O(Je), { singleton: !0 }), en = typeof document < "u" && "scrollBehavior" in document.documentElement.style;
function tn(e) {
	let t = typeof e == "number" ? { index: e } : e;
	return t.align ||= "start", (!t.behavior || !en) && (t.behavior = "auto"), t.offset === void 0 && (t.offset = 0), t;
}
var nn = H(([{ gap: e, listRefresh: t, sizes: n, totalCount: r }, { fixedFooterHeight: i, fixedHeaderHeight: a, footerHeight: o, headerHeight: s, scrollingInProgress: c, scrollTo: l, smoothScrollTargetReached: u, viewportHeight: d }, { log: f }]) => {
	let p = B(), m = B(), h = R(0), g = null, _ = null, v = null;
	function y() {
		g !== null && (g(), g = null), v !== null && (v(), v = null), _ &&= (clearTimeout(_), null), A(c, !1);
	}
	return M(I(p, L(n, d, r, h, s, o, f), L(e, a, i), F(([[e, n, r, i, a, o, s, l], d, f, h]) => {
		let b = tn(e), { align: x, behavior: S, offset: C } = b, w = i - 1, T = Vt(b, n, w), E = zt(T, n.offsetTree, d) + o;
		x === "end" ? (E += f + dt(n.sizeTree, T)[1] - r + h, T === w && (E += s)) : x === "center" ? E += (f + dt(n.sizeTree, T)[1] - r + h) / 2 : E -= a, C !== void 0 && C !== 0 && (E += C);
		let ee = (t) => {
			y(), t ? (l("retrying to scroll to", { location: e }, G.DEBUG), A(p, e)) : (A(m, !0), l("list did not change, scroll successful", {}, G.DEBUG));
		};
		if (y(), S === "smooth") {
			let e = !1;
			v = k(t, (t) => {
				e ||= t;
			}), g = Pe(u, () => {
				ee(e);
			});
		} else g = Pe(I(t, rn(150)), ee);
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
}, O(Xt, K, Je), { singleton: !0 });
function rn(e) {
	return (t) => {
		let n = setTimeout(() => {
			t(!1);
		}, e);
		return (e) => {
			e && (t(!0), clearTimeout(n));
		};
	};
}
function an(e, t) {
	e === 0 ? t() : requestAnimationFrame(() => {
		an(e - 1, t);
	});
}
function on(e, t) {
	let n = t - 1;
	return typeof e == "number" ? e : e.index === "LAST" ? n : e.index;
}
var sn = H(([{ defaultItemSize: e, listRefresh: t, sizes: n }, { scrollTop: r }, { scrollTargetReached: i, scrollToIndex: a }, { didMount: o }]) => {
	let s = R(!0), c = R(0), l = R(!0);
	return M(I(o, L(c), P(([e, t]) => t !== 0), Le(!1)), s), M(I(o, L(c), P(([e, t]) => t !== 0), Le(!1)), l), k(I(U(t, o), L(s, n, e, l), P(([[, e], t, { sizeTree: n }, r, i]) => e && (!q(n) || Oe(r)) && !t && !i), L(c)), ([, e]) => {
		Pe(i, () => {
			A(l, !0);
		}), an(4, () => {
			Pe(r, () => {
				A(s, !0);
			}), A(a, e);
		});
	}), {
		initialItemFinalLocationReached: l,
		initialTopMostItemIndex: c,
		scrolledToInitialItem: s
	};
}, O(Xt, K, nn, $t), { singleton: !0 });
function cn(e, t) {
	return Math.abs(e - t) < 1.01;
}
var ln = "up", un = "down", dn = "none", fn = {
	atBottom: !1,
	notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
	state: {
		offsetBottom: 0,
		scrollHeight: 0,
		scrollTop: 0,
		viewportHeight: 0
	}
}, pn = 0, mn = H(([{ footerHeight: e, headerHeight: t, scrollBy: n, scrollContainerState: r, scrollTop: i, viewportHeight: a }]) => {
	let o = R(!1), s = R(!0), c = B(), l = B(), u = R(4), d = R(pn), f = z(I(Ge(I(W(i), ze(1), Le(!0)), I(W(i), ze(1), Le(!1), Fe(100))), N()), !1), p = z(I(Ge(I(n, Le(!0)), I(n, Le(!1), Fe(200))), N()), !1);
	M(I(U(W(i), W(d)), F(([e, t]) => e <= t), N()), s), M(I(s, Be(50)), l);
	let m = V(I(U(r, W(a), W(t), W(e), W(u)), Re((e, [{ scrollHeight: t, scrollTop: n }, r, i, a, o]) => {
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
	}, fn), N((e, t) => e !== void 0 && e.atBottom === t.atBottom))), h = z(I(r, Re((e, { scrollHeight: t, scrollTop: n, viewportHeight: r }) => {
		if (!cn(e.scrollHeight, t)) {
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
	M(I(m, F((e) => e.atBottom)), o), M(I(o, Be(50)), c);
	let g = R(un);
	M(I(r, F(({ scrollTop: e }) => e), N(), Re((e, t) => j(p) ? {
		direction: e.direction,
		prevScrollTop: t
	} : {
		direction: t < e.prevScrollTop ? ln : un,
		prevScrollTop: t
	}, {
		direction: un,
		prevScrollTop: 0
	}), F((e) => e.direction)), g), M(I(r, Be(50), Le(dn)), g);
	let _ = R(0);
	return M(I(f, P((e) => !e), Le(0)), _), M(I(i, Be(100), L(f), P(([e, t]) => t), Re(([e, t], [n]) => [t, n], [0, 0]), F(([e, t]) => t - e)), _), {
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
}, O(K)), hn = "top", gn = "bottom", _n = "none";
function vn(e, t, n) {
	return typeof e == "number" ? n === ln && t === hn || n === un && t === gn ? e : 0 : n === ln ? t === hn ? e.main : e.reverse : t === gn ? e.main : e.reverse;
}
function yn(e, t) {
	return typeof e == "number" ? e : e[t] ?? 0;
}
var bn = H(([{ deviation: e, fixedHeaderHeight: t, headerHeight: n, scrollTop: r, viewportHeight: i }]) => {
	let a = B(), o = R(0), s = R(0), c = R(0);
	return {
		increaseViewportBy: s,
		listBoundary: a,
		overscan: c,
		topListHeight: o,
		visibleRange: z(I(U(W(r), W(i), W(n), W(a, Dt), W(c), W(o), W(t), W(e), W(s)), F(([e, t, n, [r, i], a, o, s, c, l]) => {
			let u = e - c, d = o + s, f = Math.max(n - u, 0), p = _n, m = yn(l, hn), h = yn(l, gn);
			return r -= c, r += n + s, i += n + s, i -= c, r > e + d - m && (p = ln), i < e - f + t + h && (p = un), p === _n ? null : [Math.max(u - n - vn(a, hn, p) - m, 0), u - f - s + t + vn(a, gn, p) + h];
		}), P((e) => e !== null), N(Dt)), [0, 0])
	};
}, O(K), { singleton: !0 });
function xn(e, t, n) {
	if (Nt(t)) {
		let r = Bt(e, t);
		return [{
			index: dt(t.groupOffsetTree, r)[0],
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
var Sn = {
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
function Cn(e, t, n, r, i, a) {
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
		items: Tn(e, i, a),
		offsetBottom: m,
		offsetTop: l,
		top: p,
		topItems: Tn(t, i, a),
		topListHeight: t.reduce((e, t) => t.size + e, 0),
		totalCount: n
	};
}
function wn(e, t, n, r, i, a) {
	let o = 0;
	if (n.groupIndices.length > 0) for (let t of n.groupIndices) {
		if (t - o >= e) break;
		o++;
	}
	let s = e + o, c = on(t, s);
	return Cn(Array.from({ length: s }).map((e, t) => ({
		data: a[t + c],
		index: t + c,
		offset: 0,
		size: 0
	})), [], s, i, n, r);
}
function Tn(e, t, n) {
	if (e.length === 0) return [];
	if (!Nt(t)) return e.map((e) => ({
		...e,
		index: e.index + n,
		originalIndex: e.index
	}));
	let r = e[0].index, i = e[e.length - 1].index, a = [], o = pt(t.groupOffsetTree, r, i), s, c = 0;
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
function En(e, t) {
	return e === void 0 ? 0 : typeof e == "number" ? e : e[t] ?? 0;
}
var Dn = H(([{ data: e, firstItemIndex: t, gap: n, sizes: r, totalCount: i }, a, { listBoundary: o, topListHeight: s, visibleRange: c }, { initialTopMostItemIndex: l, scrolledToInitialItem: u }, { topListHeight: d }, f, { didMount: p }, { recalcInProgress: m }]) => {
	let h = R([]), g = R(0), _ = B(), v = R(0);
	M(a.topItemsIndexes, h);
	let y = z(I(U(p, m, W(c, Dt), W(i), W(r), W(l), u, W(h), W(t), W(n), W(v), e), P(([e, t, , n, , , , , , , , r]) => {
		let i = r !== void 0 && r.length !== n;
		return e && !t && !i;
	}), F(([, , [e, t], n, r, i, a, o, s, c, l, u]) => {
		let d = r, { offsetTree: f, sizeTree: p } = d, m = j(g);
		if (n === 0) return {
			...Sn,
			totalCount: n
		};
		if (e === 0 && t === 0) return m === 0 ? {
			...Sn,
			totalCount: n
		} : wn(m, i, r, s, c, u || []);
		if (q(p)) return m > 0 ? null : Cn(xn(on(i, n), d, u), [], n, c, d, s);
		let h = [];
		if (o.length > 0) {
			let e = o[0], t = o[o.length - 1], n = 0;
			for (let r of pt(p, e, t)) {
				let i = r.value, a = Math.max(r.start, e), o = Math.min(r.end, t);
				for (let e = a; e <= o; e++) h.push({
					data: u?.[e],
					index: e,
					offset: n,
					size: i
				}), n += i;
			}
		}
		if (!a) return Cn([], h, n, c, d, s);
		let _ = o.length > 0 ? o[o.length - 1] + 1 : 0, v = Ht(f, e, t, _);
		if (v.length === 0) return null;
		let y = n - 1, b = je([], (n) => {
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
		}), x = En(l, hn), S = En(l, gn);
		if (b.length > 0 && (x > 0 || S > 0)) {
			let e = b[0], t = b[b.length - 1];
			if (x > 0 && e.index > _) {
				let t = Math.min(x, e.index - _), n = [], r = e.offset;
				for (let i = e.index - 1; i >= e.index - t; i--) {
					let t = pt(p, i, i)[0]?.value ?? e.size;
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
					let e = pt(p, r, r)[0]?.value ?? t.size;
					b.push({
						data: u?.[r],
						index: r,
						offset: n,
						size: e
					}), n += e + c;
				}
			}
		}
		return Cn(b, h, n, c, d, s);
	}), P((e) => e !== null), N()), Sn);
	M(I(e, P(Oe), F((e) => e?.length)), i), M(I(y, F((e) => e.topListHeight)), d), M(d, s), M(I(y, F((e) => [e.top, e.bottom])), o), M(I(y, F((e) => e.items)), _);
	let b = V(I(y, P(({ items: e }) => e.length > 0), L(i, e), P(([{ items: e }, t]) => e[e.length - 1].originalIndex === t - 1), F(([, e, t]) => [e - 1, t]), N(Dt), F(([e]) => e))), x = V(I(y, Be(200), P(({ items: e, topItems: t }) => e.length > 0 && e[0].originalIndex === t.length), F(({ items: e }) => e[0].index), N()));
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
		}), N(Et))),
		startReached: x,
		topItemsIndexes: h,
		...f
	};
}, O(Xt, Qt, bn, sn, nn, mn, $t, Ot), { singleton: !0 }), On = H(([{ fixedFooterHeight: e, fixedHeaderHeight: t, footerHeight: n, headerHeight: r }, { listState: i }]) => {
	let a = B(), o = z(I(U(n, e, r, t, i), F(([e, t, n, r, i]) => e + t + n + r + i.offsetBottom + i.bottom)), 0);
	return M(W(o), a), {
		totalListHeight: o,
		totalListHeightChanged: a
	};
}, O(K, Dn), { singleton: !0 }), kn = H(([{ viewportHeight: e }, { totalListHeight: t }]) => {
	let n = R(!1);
	return {
		alignToBottom: n,
		paddingTopAddition: z(I(U(n, e, t), P(([e]) => e), F(([, e, t]) => Math.max(0, e - t)), Be(0), N()), 0)
	};
}, O(K, On), { singleton: !0 }), An = H(() => ({ context: R(null) })), jn = ({ itemBottom: e, itemTop: t, locationParams: { align: n, behavior: r, ...i }, viewportBottom: a, viewportTop: o }) => t < o ? {
	...i,
	align: n ?? "start",
	...r === void 0 ? {} : { behavior: r }
} : e > a ? {
	...i,
	align: n ?? "end",
	...r === void 0 ? {} : { behavior: r }
} : null, Mn = H(([{ gap: e, sizes: t, totalCount: n }, { fixedFooterHeight: r, fixedHeaderHeight: i, headerHeight: a, scrollingInProgress: o, scrollTop: s, viewportHeight: c }, { scrollToIndex: l }]) => {
	let u = B();
	return M(I(u, L(t, c, n, a, i, r, s), L(e), F(([[e, t, n, r, i, a, s, c], l]) => {
		let { calculateViewLocation: u = jn, done: d, ...f } = e, p = Vt(e, t, r - 1), m = zt(p, t.offsetTree, l) + i + a, h = m + dt(t.sizeTree, p)[1], g = c + a, _ = u({
			itemBottom: h,
			itemTop: m,
			locationParams: f,
			viewportBottom: c + n - s,
			viewportTop: g
		});
		return _ === null ? d?.() : d && Pe(I(o, P((e) => !e), ze(j(o) ? 1 : 2)), d), _;
	}), P((e) => e !== null)), l), { scrollIntoView: u };
}, O(Xt, K, nn, Dn, Je), { singleton: !0 });
function Nn(e) {
	return e === !1 ? !1 : e === "smooth" ? "smooth" : "auto";
}
var Pn = (e, t) => typeof e == "function" ? Nn(e(t)) : t && Nn(e), Fn = H(([{ listRefresh: e, totalCount: t, fixedItemSize: n, data: r }, { atBottomState: i, isAtBottom: a }, { scrollToIndex: o }, { scrolledToInitialItem: s }, { didMount: c, propsReady: l }, { log: u }, { scrollingInProgress: d }, { context: f }, { scrollIntoView: p }]) => {
	let m = R(!1), h = B(), g = null;
	function _(e) {
		A(o, {
			align: "end",
			behavior: e,
			index: "LAST"
		});
	}
	k(I(U(I(W(t), ze(1)), c), L(W(m), a, s, d), F(([[e, t], n, r, i, a]) => {
		let o = t && i, s = "auto";
		return o && (s = Pn(n, r || a), o &&= s !== !1), {
			followOutputBehavior: s,
			shouldFollow: o,
			totalCount: e
		};
	}), P(({ shouldFollow: e }) => e)), ({ followOutputBehavior: t, totalCount: r }) => {
		g !== null && (g(), g = null), j(n) === void 0 ? g = Pe(e, () => {
			j(u)("following output to ", { totalCount: r }, G.DEBUG), _(t), g = null;
		}) : requestAnimationFrame(() => {
			j(u)("following output to ", { totalCount: r }, G.DEBUG), _(t);
		});
	});
	function v(e) {
		let t = Pe(i, (t) => {
			e && !t.atBottom && t.notAtBottomBecause === "SIZE_INCREASED" && g === null && (j(u)("scrolling to bottom due to increased size", {}, G.DEBUG), _("auto"));
		});
		setTimeout(t, 100);
	}
	k(I(U(W(m), t, l), P(([e, , t]) => e !== !1 && t), Re(({ value: e }, [, t]) => ({
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
	return M(Ge(I(W(r), F((e) => e?.length ?? 0)), I(W(t))), b), k(I(U(I(b, ze(1)), c), L(W(y), s, d, f), F(([[e, t], n, r, i, a]) => t && r && n?.({
		context: a,
		totalCount: e,
		scrollingInProgress: i
	})), P((e) => !!e), Be(0)), (t) => {
		g !== null && (g(), g = null), j(n) === void 0 ? g = Pe(e, () => {
			j(u)("scrolling into view", {}), A(p, t), g = null;
		}) : requestAnimationFrame(() => {
			j(u)("scrolling into view", {}), A(p, t);
		});
	}), {
		autoscrollToBottom: h,
		followOutput: m,
		scrollIntoViewOnChange: y
	};
}, O(Xt, mn, nn, sn, $t, Je, K, An, Mn)), In = H(([{ data: e, firstItemIndex: t, gap: n, sizes: r }, { initialTopMostItemIndex: i }, { initialItemCount: a, listState: o }, { didMount: s }]) => (M(I(s, L(a), P(([, e]) => e !== 0), L(i, r, t, n, e), F(([[, e], t, n, r, i, a = []]) => wn(e, t, n, r, i, a))), o), {}), O(Xt, sn, Dn, $t), { singleton: !0 }), Ln = H(([{ didMount: e }, { scrollTo: t }, { listState: n }]) => {
	let r = R(0);
	return k(I(e, L(r), P(([, e]) => e !== 0), F(([, e]) => ({ top: e }))), (e) => {
		Pe(I(n, ze(1), P((e) => e.items.length > 1)), () => {
			requestAnimationFrame(() => {
				A(t, e);
			});
		});
	}), { initialScrollTop: r };
}, O($t, K, Dn), { singleton: !0 }), Rn = H(([{ scrollVelocity: e }]) => {
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
}, O(mn), { singleton: !0 }), zn = H(([{ scrollContainerState: e, scrollTo: t }]) => {
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
}, O(K)), Bn = H(([{ sizeRanges: e, sizes: t }, { headerHeight: n, scrollTop: r }, { initialTopMostItemIndex: i }, { didMount: a }, { useWindowScroll: o, windowScrollContainerState: s, windowViewportRect: c }]) => {
	let l = B(), u = R(void 0), d = R(null), f = R(null);
	return M(s, d), M(c, f), k(I(l, L(t, r, o, d, f, n)), ([e, t, n, r, i, a, o]) => {
		let s = Wt(t.sizeTree);
		r && i !== null && a !== null && (n = i.scrollTop - a.offsetTop), n -= o, e({
			ranges: s,
			scrollTop: n
		});
	}), M(I(u, P(Oe), F(Vn)), i), M(I(a, L(u), P(([, e]) => e !== void 0), N(), F(([, e]) => e.ranges)), e), {
		getState: l,
		restoreStateFrom: u
	};
}, O(Xt, K, sn, $t, zn));
function Vn(e) {
	return {
		align: "start",
		index: 0,
		offset: e.scrollTop
	};
}
var Hn = H(([{ topItemsIndexes: e }]) => {
	let t = R(0);
	return M(I(t, P((e) => e >= 0), F((e) => Array.from({ length: e }).map((e, t) => t))), e), { topItemCount: t };
}, O(Dn));
function Un(e) {
	let t = !1, n;
	return (() => (t || (t = !0, n = e()), n));
}
var Wn = Un(() => /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent)), Gn = H(([{ data: e, defaultItemSize: t, firstItemIndex: n, fixedItemSize: r, fixedGroupSize: i, gap: a, groupIndices: o, heightEstimates: s, itemSize: c, sizeRanges: l, sizes: u, statefulTotalCount: d, totalCount: f, trackItemSizes: p }, { initialItemFinalLocationReached: m, initialTopMostItemIndex: h, scrolledToInitialItem: g }, _, v, y, b, { scrollToIndex: x }, S, { topItemCount: C }, { groupCounts: w }, T]) => {
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
}, O(Xt, sn, K, Bn, Fn, Dn, nn, H(([{ deviation: e, scrollBy: t, scrollingInProgress: n, scrollTop: r }, { isAtBottom: i, isScrolling: a, lastJumpDueToItemResize: o, scrollDirection: s }, { listState: c }, { beforeUnshiftWith: l, gap: u, shiftWithOffset: d, sizes: f }, { log: p }, { recalcInProgress: m }]) => {
	let h = V(I(c, L(o), Re(([, e, t, n], [{ bottom: r, items: i, offsetBottom: a, totalCount: o }, s]) => {
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
	]), P(([e]) => e !== 0), L(r, s, n, i, p, m), P(([, e, t, n, , , r]) => !r && !n && e !== 0 && t === ln), F(([[e], , , , , t]) => (t("Upward scrolling compensation", { amount: e }, G.DEBUG), e))));
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
		r && Wn() ? A(e, n - t) : g(-t);
	}), k(I(U(z(a, !1), e, m), P(([e, t, n]) => !e && !n && t !== 0), F(([e, t]) => t), Be(1)), g), M(I(d, F((e) => ({ top: -e }))), t), k(I(l, L(f, u), F(([e, { groupIndices: t, lastSize: n, sizeTree: r }, i]) => {
		function a(e) {
			return e * (n + i);
		}
		if (t.length === 0) return a(e);
		let o = 0, s = ut(r, 0), c = 0, l = 0;
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
}, O(K, mn, Dn, Xt, Je, Ot)), Hn, Qt, H(([e, t, n, r, i, a, o, s, c, l, u]) => ({
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
}), O(bn, In, $t, Rn, On, Ln, kn, zn, Mn, Je, An))));
function Kn(e, t) {
	let n = {}, r = {}, i = 0, a = e.length;
	for (; i < a;) r[e[i]] = 1, i += 1;
	for (let e in t) Object.hasOwn(r, e) || (n[e] = t[e]);
	return n;
}
var qn = typeof document < "u" ? e.useLayoutEffect : e.useEffect;
function Jn(t, n, r) {
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
		return s.reduce((t, r) => (t[r] = He(e[n.events[r]]), t), {});
	}
	return {
		Component: e.forwardRef(function(n, o) {
			let { children: p, ...m } = n, [h] = e.useState(() => je(We(t), (e) => {
				l(e, m);
			})), [g] = e.useState(Ee(f, h));
			qn(() => {
				for (let e of s) e in m && k(g[e], m[e]);
				return () => {
					Object.values(g).map(Ne);
				};
			}, [
				m,
				g,
				h
			]), qn(() => {
				l(h, m);
			}), e.useImperativeHandle(o, Ce(u(h)));
			let _ = r;
			return /* @__PURE__ */ d(c.Provider, {
				value: h,
				children: r === void 0 ? p : /* @__PURE__ */ d(_, {
					...Kn([
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
			qn(() => k(r, n), [n, r]);
		},
		useEmitterValue: parseInt(e.version) >= 18 ? (t) => {
			let n = e.useContext(c)[t], r = e.useCallback((e) => k(n, e), [n]);
			return e.useSyncExternalStore(r, () => j(n), () => j(n));
		} : (t) => {
			let n = e.useContext(c)[t], [r, i] = e.useState(Ee(j, n));
			return qn(() => k(n, (e) => {
				e !== r && i(Ce(e));
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
var Yn = e.createContext(void 0), Xn = e.createContext(void 0), Zn = "-webkit-sticky", Qn = "sticky", $n = Un(() => {
	if (typeof document > "u") return Qn;
	let e = document.createElement("div");
	return e.style.position = Zn, e.style.position === Zn ? Zn : Qn;
}), er = typeof document < "u" ? e.useLayoutEffect : e.useEffect;
function tr(e) {
	return "self" in e;
}
function nr(e) {
	return "body" in e;
}
function rr(t, n, r, i = Ae, a, o) {
	let s = e.useRef(null), c = e.useRef(null), l = e.useRef(null), u = e.useCallback((e) => {
		let r, i, a, s = e.target;
		if (nr(s) || tr(s)) {
			let e = tr(s) ? s : s.defaultView;
			a = o === !0 ? et(e, e.scrollX) : e.scrollY, r = o === !0 ? e.document.documentElement.scrollWidth : e.document.documentElement.scrollHeight, i = o === !0 ? e.innerWidth : e.innerHeight;
		} else a = o === !0 ? et(s, s.scrollLeft) : s.scrollTop, r = o === !0 ? s.scrollWidth : s.scrollHeight, i = o === !0 ? s.offsetWidth : s.offsetHeight;
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
		return Qe(e), i(a || s.current), u({
			suppressFlushSync: !0,
			target: e
		}), e.addEventListener("scroll", u, { passive: !0 }), () => {
			Qe(e), i(null), e.removeEventListener("scroll", u);
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
		tr(r) ? (u = Math.max(Mt(r.document.documentElement, o === !0 ? "width" : "height"), o === !0 ? r.document.documentElement.scrollWidth : r.document.documentElement.scrollHeight), a = o === !0 ? r.innerWidth : r.innerHeight, d = o === !0 ? et(r, r.scrollX) : r.scrollY) : (u = r[o === !0 ? "scrollWidth" : "scrollHeight"], a = Mt(r, o === !0 ? "width" : "height"), d = o === !0 ? et(r, r.scrollLeft) : r.scrollTop);
		let f = u - a;
		if (e.top === void 0) {
			r.scrollTo(e);
			return;
		}
		let p = Math.ceil(Math.max(Math.min(f, e.top), 0));
		if (e.top = p, cn(a, u) || p === d) {
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
			left: tt(r, p)
		}), r.scrollTo(e);
	}
	function f(e) {
		o === !0 && (e = {
			...e.behavior === void 0 ? {} : { behavior: e.behavior },
			...e.top === void 0 ? {} : { left: tt(s.current, e.top) }
		}), s.current.scrollBy(e);
	}
	return {
		scrollByCallback: f,
		scrollerRef: s,
		scrollToCallback: d
	};
}
function ir(e) {
	return e;
}
var ar = /* @__PURE__ */ H(([e, t]) => ({
	...e,
	...t
}), O(Gn, /* @__PURE__ */ H(() => {
	let e = R((e) => `Item ${e}`), t = R((e) => `Group ${e}`), n = R({}), r = R(ir), i = R("div"), a = R(Ae), o = (e, t = null) => z(I(n, F((t) => t[e]), N()), t);
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
}))), or = ({ height: e }) => /* @__PURE__ */ d("div", { style: { height: e } }), sr = {
	overflowAnchor: "none",
	position: $n(),
	zIndex: 1
}, cr = { overflowAnchor: "none" }, lr = {
	...cr,
	display: "inline-block",
	height: "100%"
}, ur = /* @__PURE__ */ e.memo(function({ showTopList: t = !1 }) {
	let r = Z("listState"), i = Er("sizeRanges"), a = Z("useWindowScroll"), o = Z("customScrollParent"), s = Er("windowScrollContainerState"), c = Er("scrollContainerState"), l = o || a ? s : c, u = Z("itemContent"), f = Z("context"), p = Z("groupContent"), m = Z("trackItemSizes"), h = Z("itemSize"), g = Z("log"), _ = Er("gap"), v = Z("horizontalDirection"), { callbackRef: y } = it(i, h, m, t ? Ae : l, g, _, o, v, Z("skipAnimationFrameInResizeObserver")), [b, x] = e.useState(0);
	Tr("deviation", (e) => {
		b !== e && x(e);
	});
	let S = Z("EmptyPlaceholder"), C = Z("ScrollSeekPlaceholder") ?? or, w = Z("ListComponent"), T = Z("ItemComponent"), E = Z("GroupComponent"), ee = Z("computeItemKey"), te = Z("isSeeking"), ne = Z("groupIndices").length > 0, re = Z("alignToBottom"), D = Z("initialItemFinalLocationReached"), ie = t ? {} : {
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
				style: sr
			}, p(e.index, f)) : /* @__PURE__ */ n(T, {
				...X(T, f),
				...gr(T, e.data),
				"data-index": t,
				"data-item-group-index": e.groupIndex,
				"data-item-index": e.index,
				"data-known-size": e.size,
				key: i,
				style: v ? lr : cr
			}, ne ? u(e.index, e.groupIndex, e.data, f) : u(e.index, e.data, f));
		})
	});
}), dr = {
	height: "100%",
	outline: "none",
	overflowY: "auto",
	position: "relative",
	WebkitOverflowScrolling: "touch"
}, fr = {
	outline: "none",
	overflowX: "auto",
	position: "relative"
}, pr = (e) => ({
	height: "100%",
	position: "absolute",
	top: 0,
	width: "100%",
	...e ? {
		display: "flex",
		flexDirection: "column"
	} : void 0
}), mr = (e, t, n = 0) => ({
	...pr(e),
	position: t ? "relative" : "absolute",
	top: t ? -n : 0
}), hr = {
	position: $n(),
	top: 0,
	width: "100%",
	zIndex: 1
};
function X(e, t) {
	if (typeof e != "string") return { context: t };
}
function gr(e, t) {
	return { item: typeof e == "string" ? void 0 : t };
}
var _r = /* @__PURE__ */ e.memo(function() {
	let t = Z("HeaderComponent"), n = Er("headerHeight"), r = Z("HeaderFooterTag"), i = nt(e.useMemo(() => (e) => {
		n(Mt(e, "height"));
	}, [n]), !0, Z("skipAnimationFrameInResizeObserver")), a = Z("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...X(t, a) })
	});
}), vr = /* @__PURE__ */ e.memo(function() {
	let t = Z("FooterComponent"), n = Er("footerHeight"), r = Z("HeaderFooterTag"), i = nt(e.useMemo(() => (e) => {
		n(Mt(e, "height"));
	}, [n]), !0, Z("skipAnimationFrameInResizeObserver")), a = Z("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...X(t, a) })
	});
});
function yr({ useEmitter: t, useEmitterValue: n, usePublisher: r }) {
	return e.memo(function({ children: e, style: i, context: a, ...o }) {
		let s = r("scrollContainerState"), c = n("ScrollerComponent"), l = r("smoothScrollTargetReached"), u = n("scrollerRef"), f = n("horizontalDirection") || !1, { scrollByCallback: p, scrollerRef: m, scrollToCallback: h } = rr(s, l, c, u, void 0, f);
		return t("scrollTo", h), t("scrollBy", p), /* @__PURE__ */ d(c, {
			"data-testid": "virtuoso-scroller",
			"data-virtuoso-scroller": !0,
			ref: m,
			style: {
				...f ? fr : dr,
				...i
			},
			tabIndex: 0,
			...o,
			...X(c, a),
			children: e
		});
	});
}
function br({ useEmitter: t, useEmitterValue: n, usePublisher: r }) {
	return e.memo(function({ children: i, style: a, context: o, ...s }) {
		let c = r("windowScrollContainerState"), l = n("ScrollerComponent"), u = r("smoothScrollTargetReached"), f = n("totalListHeight"), p = n("deviation"), m = n("customScrollParent"), h = e.useRef(null), { scrollByCallback: g, scrollerRef: _, scrollToCallback: v } = rr(c, u, l, n("scrollerRef"), m);
		return er(() => (_.current = m || h.current?.ownerDocument.defaultView, () => {
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
var xr = ({ children: t }) => {
	let n = e.useContext(Yn), r = Er("viewportHeight"), i = Er("fixedItemHeight"), a = Z("alignToBottom"), o = Z("horizontalDirection"), s = nt(e.useMemo(() => Te(r, (e) => Mt(e, o ? "width" : "height")), [r, o]), !0, Z("skipAnimationFrameInResizeObserver"));
	return e.useEffect(() => {
		n && (r(n.viewportHeight), i(n.itemHeight));
	}, [
		n,
		r,
		i
	]), /* @__PURE__ */ d("div", {
		"data-viewport-type": "element",
		ref: s,
		style: pr(a),
		children: t
	});
}, Sr = ({ children: t }) => {
	let n = e.useContext(Yn), r = Er("windowViewportRect"), i = Er("fixedItemHeight"), a = Z("customScrollParent"), o = Z("useWindowScroll"), s = Z("topListHeight"), c = st(r, a, Z("skipAnimationFrameInResizeObserver")), l = Z("alignToBottom");
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
		style: mr(l, o, s),
		children: t
	});
}, Cr = ({ children: e }) => {
	let t = Z("TopItemListComponent") ?? "div", n = Z("headerHeight");
	return /* @__PURE__ */ d(t, {
		style: {
			...hr,
			marginTop: `${n}px`
		},
		...X(t, Z("context")),
		children: e
	});
}, { Component: wr, useEmitter: Tr, useEmitterValue: Z, usePublisher: Er } = /* @__PURE__ */ Jn(ar, {
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
	return /* @__PURE__ */ f(r || t ? Or : Dr, {
		...e,
		context: i,
		children: [n && /* @__PURE__ */ d(Cr, { children: /* @__PURE__ */ d(ur, { showTopList: !0 }) }), /* @__PURE__ */ f(r || t ? Sr : xr, { children: [
			/* @__PURE__ */ d(_r, {}),
			/* @__PURE__ */ d(ur, {}),
			/* @__PURE__ */ d(vr, {})
		] })]
	});
})), Dr = /* @__PURE__ */ yr({
	useEmitter: Tr,
	useEmitterValue: Z,
	usePublisher: Er
}), Or = /* @__PURE__ */ br({
	useEmitter: Tr,
	useEmitterValue: Z,
	usePublisher: Er
}), kr = /* @__PURE__ */ H(([e, t]) => ({
	...e,
	...t
}), O(Gn, /* @__PURE__ */ H(() => {
	let e = R((e) => /* @__PURE__ */ f("td", { children: ["Item $", e] })), t = R(null), n = R((e) => /* @__PURE__ */ f("td", {
		colSpan: 1e3,
		children: ["Group ", e]
	})), r = R(null), i = R(null), a = R({}), o = R(ir), s = R(Ae), c = (e, t = null) => z(I(a, F((t) => t[e]), N()), t);
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
}))), Ar = ({ height: e }) => /* @__PURE__ */ d("tr", { children: /* @__PURE__ */ d("td", { style: { height: e } }) }), jr = ({ height: e }) => /* @__PURE__ */ d("tr", { children: /* @__PURE__ */ d("td", { style: {
	border: 0,
	height: e,
	padding: 0
} }) }), Mr = { overflowAnchor: "none" }, Nr = {
	position: $n(),
	zIndex: 2,
	overflowAnchor: "none"
}, Pr = /* @__PURE__ */ e.memo(function({ showTopList: e = !1 }) {
	let t = Q("listState"), r = Q("computeItemKey"), i = Q("firstItemIndex"), a = Q("context"), o = Q("isSeeking"), s = Q("fixedHeaderHeight"), c = Q("groupIndices").length > 0, l = Q("itemContent"), u = Q("groupContent"), d = Q("ScrollSeekPlaceholder") ?? Ar, f = Q("GroupComponent"), p = Q("TableRowComponent"), m = (e ? t.topItems : []).reduce((e, t, n) => (n === 0 ? e.push(t.size) : e.push(e[n - 1] + t.size), e), []);
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
				...Nr,
				top: s
			}
		}, u(t.index, a)) : /* @__PURE__ */ n(p, {
			...X(p, a),
			...gr(p, t.data),
			"data-index": h,
			"data-item-index": t.index,
			"data-known-size": t.size,
			"data-item-group-index": t.groupIndex,
			key: g,
			style: e ? {
				...Nr,
				top: s + _
			} : Mr
		}, c ? l(t.index, t.groupIndex, t.data, a) : l(t.index, t.data, a));
	});
}), Fr = /* @__PURE__ */ e.memo(function() {
	let t = Q("listState"), n = Q("topItemsIndexes").length > 0, r = Br("sizeRanges"), i = Q("useWindowScroll"), a = Q("customScrollParent"), o = Br("windowScrollContainerState"), s = Br("scrollContainerState"), c = a || i ? o : s, l = Q("trackItemSizes"), { callbackRef: u, ref: p } = it(r, Q("itemSize"), l, c, Q("log"), void 0, a, !1, Q("skipAnimationFrameInResizeObserver")), [m, h] = e.useState(0);
	zr("deviation", (e) => {
		m !== e && (p.current.style.marginTop = `${e}px`, h(e));
	});
	let g = Q("EmptyPlaceholder"), _ = Q("FillerRow") ?? jr, v = Q("TableBodyComponent"), y = Q("paddingTopAddition"), b = Q("statefulTotalCount"), x = Q("context");
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
			n && /* @__PURE__ */ d(Pr, { showTopList: !0 }),
			/* @__PURE__ */ d(Pr, {}),
			E
		]
	});
}), Ir = ({ children: t }) => {
	let n = e.useContext(Yn), r = Br("viewportHeight"), i = Br("fixedItemHeight"), a = nt(e.useMemo(() => Te(r, (e) => Mt(e, "height")), [r]), !0, Q("skipAnimationFrameInResizeObserver"));
	return e.useEffect(() => {
		n && (r(n.viewportHeight), i(n.itemHeight));
	}, [
		n,
		r,
		i
	]), /* @__PURE__ */ d("div", {
		"data-viewport-type": "element",
		ref: a,
		style: pr(!1),
		children: t
	});
}, Lr = ({ children: t }) => {
	let n = e.useContext(Yn), r = Br("windowViewportRect"), i = Br("fixedItemHeight"), a = Q("customScrollParent"), o = Q("useWindowScroll"), s = st(r, a, Q("skipAnimationFrameInResizeObserver"));
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
		style: mr(!1, o),
		children: t
	});
}, { Component: Rr, useEmitter: zr, useEmitterValue: Q, usePublisher: Br } = /* @__PURE__ */ Jn(kr, {
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
	let n = Q("useWindowScroll"), r = Q("customScrollParent"), i = Br("fixedHeaderHeight"), a = Br("fixedFooterHeight"), o = Q("fixedHeaderContent"), s = Q("fixedFooterContent"), c = Q("context"), l = nt(e.useMemo(() => Te(i, (e) => Mt(e, "height")), [i]), !0, Q("skipAnimationFrameInResizeObserver")), u = nt(e.useMemo(() => Te(a, (e) => Mt(e, "height")), [a]), !0, Q("skipAnimationFrameInResizeObserver")), p = r || n ? Hr : Vr, m = r || n ? Lr : Ir, h = Q("TableComponent"), g = Q("TableHeadComponent"), _ = Q("TableFooterComponent"), v = o ? /* @__PURE__ */ d(g, {
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
				/* @__PURE__ */ d(Fr, {}, "TableBody"),
				y
			]
		}) })
	});
})), Vr = /* @__PURE__ */ yr({
	useEmitter: zr,
	useEmitterValue: Q,
	usePublisher: Br
}), Hr = /* @__PURE__ */ br({
	useEmitter: zr,
	useEmitterValue: Q,
	usePublisher: Br
}), Ur = Rr, Wr = {
	bottom: 0,
	itemHeight: 0,
	items: [],
	itemWidth: 0,
	offsetBottom: 0,
	offsetTop: 0,
	top: 0
}, Gr = {
	bottom: 0,
	itemHeight: 0,
	items: [{ index: 0 }],
	itemWidth: 0,
	offsetBottom: 0,
	offsetTop: 0,
	top: 0
}, { ceil: Kr, floor: qr, max: Jr, min: Yr, round: Xr } = Math;
function Zr(e, t, n) {
	return Array.from({ length: t - e + 1 }).map((t, r) => ({
		data: n === null ? null : n[r + e],
		index: r + e
	}));
}
function Qr(e) {
	return {
		...Gr,
		items: e
	};
}
function $r(e, t) {
	return e !== void 0 && e.width === t.width && e.height === t.height;
}
function ei(e, t) {
	return e !== void 0 && e.column === t.column && e.row === t.row;
}
var ti = /* @__PURE__ */ H(([{ increaseViewportBy: e, listBoundary: t, overscan: n, visibleRange: r }, { footerHeight: i, headerHeight: a, scrollBy: o, scrollContainerState: s, scrollTo: c, scrollTop: l, smoothScrollTargetReached: u, viewportHeight: d }, f, p, { didMount: m, propsReady: h }, { customScrollParent: g, useWindowScroll: _, windowScrollContainerState: v, windowScrollTo: y, windowViewportRect: b }, x]) => {
	let S = R(0), C = R(0), w = R(Wr), T = R({
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
		A(le, !0), an(1, () => {
			A(ee, e);
		}), Pe(I(l), () => {
			A(t, [0, 0]), A(ce, !0);
		});
	}), M(I(ae, P((e) => e != null && e.scrollTop > 0), Le(0)), C), k(I(m, L(ae), P(([, e]) => e != null)), ([, e]) => {
		e && (A(T, e.viewport), A(E, e.item), A(D, e.gap), e.scrollTop > 0 && (A(oe, !0), Pe(I(l, ze(1)), (e) => {
			A(oe, !1);
		}), A(c, { top: e.scrollTop })));
	}), M(I(T, F(({ height: e }) => e)), d), M(I(U(W(T, $r), W(E, $r), W(D, (e, t) => e !== void 0 && e.column === t.column && e.row === t.row), W(l)), F(([e, t, n, r]) => ({
		gap: n,
		item: t,
		scrollTop: r,
		viewport: e
	}))), ie), M(I(U(W(S), r, W(D, ei), W(E, $r), W(T, $r), W(re), W(C), W(oe), W(ce), W(se)), P(([, , , , , , , e]) => !e), F(([e, [t, n], r, i, a, o, s, , c, l]) => {
		let { column: u, row: d } = r, { height: f, width: p } = i, { width: m } = a;
		if (s === 0 && (e === 0 || m === 0)) return Wr;
		if (p === 0) {
			let t = on(l, e);
			return Qr(Zr(t, t + Math.max(s - 1, 0), o));
		}
		let h = ni(m, p, u), g, _;
		c ? t === 0 && n === 0 && s > 0 ? (g = 0, _ = s - 1) : (g = h * qr((t + d) / (f + d)), _ = h * Kr((n + d) / (f + d)) - 1, _ = Yr(e - 1, Jr(_, h - 1)), g = Yr(_, Jr(0, g))) : (g = 0, _ = -1);
		let v = Zr(g, _, o), { bottom: y, top: b } = ri(a, r, i, v), x = Kr(e / h);
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
		let { bottom: i, top: a } = ri(e, r, t, n);
		return [a, i];
	}), N(Dt)), t);
	let de = R(!1);
	M(I(l, L(de), F(([e, t]) => t || e !== 0)), de);
	let fe = V(I(U(w, S), P(([{ items: e }]) => e.length > 0), L(de), P(([[e, t], n]) => {
		let r = e.items[e.items.length - 1].index === t - 1;
		return (n || e.bottom > 0 && e.itemHeight > 0 && e.offsetBottom === 0 && e.items.length === t) && r;
	}), F(([[, e]]) => e - 1), N())), pe = V(I(W(w), P(({ items: e }) => e.length > 0 && e[0].index === 0), Le(0), N())), me = V(I(W(w), L(oe), P(([{ items: e }, t]) => e.length > 0 && !t), F(([{ items: e }]) => ({
		endIndex: e[e.length - 1].index,
		startIndex: e[0].index
	})), N(Et), Be(0)));
	M(me, p.scrollSeekRangeChanged), M(I(ee, L(T, E, S, D), F(([e, t, n, r, i]) => {
		let a = tn(e), { align: o, behavior: s, offset: c } = a, l = a.index;
		l === "LAST" && (l = r - 1), l = Jr(0, l, Yr(r - 1, l));
		let u = ii(t, i, n, l);
		return o === "end" ? u = Xr(u - t.height + n.height) : o === "center" && (u = Xr(u - t.height / 2 + n.height / 2)), c !== void 0 && c !== 0 && (u += c), {
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
}, O(bn, K, mn, Rn, $t, zn, Je));
function ni(e, t, n) {
	return Jr(1, qr((e + n) / (qr(t) + n)));
}
function ri(e, t, n, r) {
	let { height: i } = n;
	if (i === void 0 || r.length === 0) return {
		bottom: 0,
		top: 0
	};
	let a = ii(e, t, n, r[0].index);
	return {
		bottom: ii(e, t, n, r[r.length - 1].index) + i,
		top: a
	};
}
function ii(e, t, n, r) {
	let i = qr(r / ni(e.width, n.width, t.column)), a = i * n.height + Jr(0, i - 1) * t.row;
	return a > 0 ? a + t.row : a;
}
var ai = /* @__PURE__ */ H(([e, t]) => ({
	...e,
	...t
}), O(ti, /* @__PURE__ */ H(() => {
	let e = R((e) => `Item ${e}`), t = R({}), n = R(null), r = R("virtuoso-grid-item"), i = R("virtuoso-grid-list"), a = R(ir), o = R("div"), s = R(Ae), c = (e, n = null) => z(I(t, F((t) => t[e]), N()), n), l = R(!1), u = R(!1);
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
}))), oi = /* @__PURE__ */ e.memo(function() {
	let t = $("gridState"), r = $("listClassName"), i = $("itemClassName"), a = $("itemContent"), o = $("computeItemKey"), s = $("isSeeking"), c = pi("scrollHeight"), l = $("ItemComponent"), u = $("ListComponent"), f = $("ScrollSeekPlaceholder"), p = $("context"), m = pi("itemDimensions"), h = pi("gap"), g = $("log"), _ = $("stateRestoreInProgress"), v = pi("reportReadyState"), y = nt(e.useMemo(() => (e) => {
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
			column: gi("column-gap", getComputedStyle(e).columnGap, g),
			row: gi("row-gap", getComputedStyle(e).rowGap, g)
		});
	}, [
		c,
		m,
		h,
		g
	]), !0, !1);
	return er(() => {
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
}), si = e.memo(function() {
	let t = $("HeaderComponent"), n = pi("headerHeight"), r = $("headerFooterTag"), i = nt(e.useMemo(() => (e) => {
		n(Mt(e, "height"));
	}, [n]), !0, !1), a = $("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...X(t, a) })
	});
}), ci = e.memo(function() {
	let t = $("FooterComponent"), n = pi("footerHeight"), r = $("headerFooterTag"), i = nt(e.useMemo(() => (e) => {
		n(Mt(e, "height"));
	}, [n]), !0, !1), a = $("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...X(t, a) })
	});
}), li = ({ children: t }) => {
	let n = e.useContext(Xn), r = pi("itemDimensions"), i = pi("viewportDimensions"), a = nt(e.useMemo(() => (e) => {
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
		style: pr(!1),
		children: t
	});
}, ui = ({ children: t }) => {
	let n = e.useContext(Xn), r = pi("windowViewportRect"), i = pi("itemDimensions"), a = $("customScrollParent"), o = $("useWindowScroll"), s = st(r, a, !1);
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
		style: mr(!1, o),
		children: t
	});
}, { Component: di, useEmitter: fi, useEmitterValue: $, usePublisher: pi } = /* @__PURE__ */ Jn(ai, {
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
	let t = $("useWindowScroll"), n = $("customScrollParent"), r = n || t ? hi : mi, i = n || t ? ui : li, a = $("context");
	return /* @__PURE__ */ d(r, {
		...e,
		...X(r, a),
		children: /* @__PURE__ */ f(i, { children: [
			/* @__PURE__ */ d(si, {}),
			/* @__PURE__ */ d(oi, {}),
			/* @__PURE__ */ d(ci, {})
		] })
	});
})), mi = /* @__PURE__ */ yr({
	useEmitter: fi,
	useEmitterValue: $,
	usePublisher: pi
}), hi = /* @__PURE__ */ br({
	useEmitter: fi,
	useEmitterValue: $,
	usePublisher: pi
});
function gi(e, t, n) {
	return t !== "normal" && t?.endsWith("px") !== !0 && n(`${e} was not resolved to pixel value correctly`, t, G.WARN), t === "normal" ? 0 : parseInt(t ?? "0", 10);
}
//#endregion
//#region src/virtual/size-utils.ts
var _i = (e) => {
	switch (e) {
		case "sm": return 33;
		case "xs": return 24;
		default: return 41;
	}
};
//#endregion
//#region src/virtual/FixedHeaderContent.tsx
function vi({ onChangeSort: e }) {
	let [t] = w(), [n] = D();
	return /* @__PURE__ */ d("tr", { children: t.map((t, r) => /* @__PURE__ */ d(oe, {
		field: t,
		sorted: n?.field === t.field,
		ascending: n?.ascending,
		className: h(typeof t.className == "function" ? { [`text-${t.align}`]: !!t.align } : t.className),
		onClick: e
	}, r)) });
}
//#endregion
//#region src/virtual/ItemContent.tsx
function yi({ row: e, renderRow: t }) {
	let [n] = w();
	return t ? t(e) : /* @__PURE__ */ d(b, {
		fields: n,
		row: e
	});
}
//#endregion
//#region src/virtual/VirtualTableContainer.tsx
var bi = l.div`
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
`;
//#endregion
//#region src/virtual/ContainedVirtualTable.tsx
function xi({ rowHeight: e, headerHeight: t, maxHeight: n, className: r, size: i, data: o, keyField: s, rowClassName: l, renderRow: u, onSelectRow: f, selected: p, tfoot: m, onChangeSort: g, containerProps: y, ...b }) {
	let x = ve(), S = e ?? _i(i), C = t ?? _i(i), [w, T] = c(n ?? x), [E, ee] = c(w);
	a(() => {
		T(n ?? x);
	}, [n, x]);
	let te = (e) => {
		let t = e + C;
		ee(Math.min(t, w));
	}, ne = h("table", r, { [`table-${i}`]: !!i }), re = {
		Table: ({ children: e, style: t }) => /* @__PURE__ */ d(_, {
			style: t,
			className: ne,
			...b,
			children: e
		}),
		TableRow: ({ children: e, item: t, ...n }) => {
			let r = String(typeof s == "function" ? s(t) : t[s]), i = typeof p == "function" ? p(t) : r === p;
			return /* @__PURE__ */ d(v, {
				row: t,
				...n,
				onClick: f,
				rowClassName: l,
				selected: i,
				children: e
			});
		},
		TableFoot: () => m || null
	}, D = () => /* @__PURE__ */ d(vi, { onChangeSort: g });
	return /* @__PURE__ */ d(bi, {
		...y,
		style: {
			...y?.style,
			height: E
		},
		children: /* @__PURE__ */ d(Ur, {
			data: o,
			components: re,
			totalListHeightChanged: te,
			fixedItemHeight: S,
			fixedHeaderContent: D,
			itemContent: (e, t) => /* @__PURE__ */ d(yi, {
				row: t,
				renderRow: u
			}, e)
		})
	});
}
//#endregion
//#region src/virtual/VirtualTable.tsx
function Si({ data: e, fields: t, keyField: n, currentSort: r, onChangeSort: i, ...a }) {
	return /* @__PURE__ */ f(S, {
		initialFields: t,
		children: [/* @__PURE__ */ d(ue, { nextSort: r }), /* @__PURE__ */ d(xi, {
			onChangeSort: i,
			data: e,
			keyField: n,
			...a
		})]
	});
}
//#endregion
export { E as ContainedDataTable, te as ContainedDataTableRow, le as ContainedSortableTable, xi as ContainedVirtualTable, ee as DataTable, y as DataTableCell, he as DataTableCols, x as DataTableContext, S as DataTableProvider, ne as DataTableRow, b as DataTableRowCellSet, re as DataTableTBody, C as DataTableTH, v as DataTableTR, pe as RowsPerPage, de as SortableTable, se as SortableTableHead, oe as SortableTableTH, _ as Table, me as TablePagination, Si as VirtualTable, ge as useField, _e as useTableContext, w as useTableFields, D as useTableSort };

//# sourceMappingURL=index.es.js.map