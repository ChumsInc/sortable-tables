import e, { createContext as t, createElement as n, useCallback as r, useContext as i, useEffect as a, useId as o, useMemo as s, useState as c } from "react";
import l from "@emotion/styled";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
import p from "react-dom";
//#region node_modules/clsx/dist/clsx.mjs
function m(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = m(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
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
	if (t) {
		let e = h(r, {
			"table-responsive": t === !0,
			[`table-responsive-${t}`]: t !== !0
		});
		return /* @__PURE__ */ d("div", {
			className: e,
			children: /* @__PURE__ */ d(g, {
				ref: i,
				...a,
				children: n
			})
		});
	}
	return /* @__PURE__ */ d(g, {
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
		let n = i.map((n) => n.id === e ? {
			...n,
			...t
		} : n);
		a(n);
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
	if (e.visible === !1) return null;
	let i = h({ [`text-${e.align}`]: !!e.align }, t);
	return /* @__PURE__ */ d("th", {
		className: i,
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
	let v = h("table", e, { [`table-${t}`]: !!t });
	return /* @__PURE__ */ f(_, {
		sticky: r,
		responsive: n,
		className: v,
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
        padding-left: 0.25rem;
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
			ascending: !t || !n
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
			}), /* @__PURE__ */ d("div", { className: h("sort-icon", l) })]
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
	let y = h("table", e, { [`table-${t}`]: !!t });
	return /* @__PURE__ */ f(_, {
		className: y,
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
	let c = o(), l = (e) => a(Number(e.target.value)), u = i ?? h("form-select", { [`form-select-${n}`]: !!n }), p = h("input-group", { [`input-group-${n}`]: !!n });
	return /* @__PURE__ */ f("div", {
		className: p,
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
	let t = Array.from({ length: e.length }), n = 0, r = null, i = 2 ** e.length - 1;
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
				e.splice(0);
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
var Ue = { singleton: !0 };
function H(e, t = [], n = Ue) {
	let { singleton: r } = n;
	return {
		constructor: e,
		dependencies: t,
		id: We(),
		singleton: r
	};
}
var We = () => /* @__PURE__ */ Symbol("id");
function Ge(e) {
	let t = /* @__PURE__ */ new Map(), n = ({ constructor: e, dependencies: r, id: i, singleton: a }) => {
		if (a && t.has(i)) return t.get(i);
		let o = e(r.map((e) => n(e)));
		return a && t.set(i, o), o;
	};
	return n(e);
}
function U(...e) {
	let t = B(), n = Array.from({ length: e.length }), r = 0, i = 2 ** e.length - 1;
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
function Ke(...e) {
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
}, qe = {
	[G.DEBUG]: "debug",
	[G.ERROR]: "error",
	[G.INFO]: "log",
	[G.WARN]: "warn"
}, Je = () => typeof globalThis > "u" ? window : globalThis, Ye = H(() => {
	let e = R(G.ERROR);
	return {
		log: R((t, n, r = G.INFO) => {
			r >= (Je().VIRTUOSO_LOG_LEVEL ?? j(e)) && console[qe[r]]("%creact-virtuoso: %c%s %o", "color: #0253b3; font-weight: bold", "color: initial", t, n);
		}),
		logLevel: e
	};
}, [], { singleton: !0 });
function Xe(e) {
	return "self" in e ? e.document.documentElement : e;
}
function Ze(e) {
	let t = Xe(e);
	return t.ownerDocument.defaultView.getComputedStyle(t).direction === "rtl";
}
function Qe(e, t) {
	return Ze(e) ? -t : t;
}
function $e(e, t) {
	return Ze(e) ? -t : t;
}
function et(e, t, n) {
	return tt(e, t, n).callbackRef;
}
function tt(t, n, r) {
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
function nt(t, n, r, i, a, o, s, c, l) {
	return tt(e.useCallback((e) => {
		let r = rt(e.children, n, c ? "offsetWidth" : "offsetHeight", a), l = e.parentElement;
		for (; l.dataset.virtuosoScroller === void 0;) l = l.parentElement;
		let u = l.lastElementChild?.dataset.viewportType === "window", d;
		u && (d = l.ownerDocument.defaultView);
		let f = s ? c ? s.scrollWidth : s.scrollHeight : u ? c ? d.document.documentElement.scrollWidth : d.document.documentElement.scrollHeight : c ? l.scrollWidth : l.scrollHeight, p = s ? c ? s.offsetWidth : s.offsetHeight : u ? c ? d.innerWidth : d.innerHeight : c ? l.offsetWidth : l.offsetHeight, m = s ? c ? Qe(s, s.scrollLeft) : s.scrollTop : u ? c ? Qe(d, d.scrollX || d.document.documentElement.scrollLeft) : d.scrollY || d.document.documentElement.scrollTop : c ? Qe(l, l.scrollLeft) : l.scrollTop;
		i({
			scrollHeight: f,
			scrollTop: Math.max(m, 0),
			viewportHeight: p
		}), o?.(c ? it("column-gap", getComputedStyle(e).columnGap, a) : it("row-gap", getComputedStyle(e).rowGap, a)), r !== null && t(r);
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
function rt(e, t, n, r) {
	let i = e.length;
	if (i === 0) return null;
	let a = [];
	for (let o = 0; o < i; o++) {
		let i = e.item(o);
		if (i.dataset.index === void 0) continue;
		let s = parseInt(i.dataset.index, 10), c = parseFloat(i.dataset.knownSize), l = t(i, n);
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
function it(e, t, n) {
	return t !== "normal" && t?.endsWith("px") !== !0 && n(`${e} was not resolved to pixel value correctly`, t, G.WARN), t === "normal" ? 0 : parseInt(t ?? "0", 10);
}
var at = typeof document > "u" ? e.useEffect : e.useLayoutEffect;
function ot(t, n, r) {
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
	}, [t, n]), { callbackRef: o, ref: s } = tt(a, !0, r), c = e.useCallback(() => {
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
	let e = B(), t = B(), n = R(0), r = B(), i = B(), a = R(0), o = B(), s = B(), c = R(0), l = R(0), u = R(0), d = R(0), f = B(), p = B(), m = R(!1), h = R(!1), g = R(!1);
	return M(I(e, F(({ scrollTop: e }) => e)), t), M(I(e, F(({ scrollHeight: e }) => e)), s), M(t, a), {
		deviation: n,
		deviationCommitted: r,
		fixedFooterHeight: u,
		fixedHeaderHeight: l,
		footerHeight: d,
		headerHeight: c,
		horizontalDirection: h,
		scrollBy: p,
		scrollContainerState: e,
		scrollHeight: s,
		scrollingInProgress: m,
		scrollTo: f,
		scrollTop: t,
		skipAnimationFrameInResizeObserver: g,
		smoothScrollTargetReached: i,
		statefulScrollTop: a,
		viewportHeight: o
	};
}, [], { singleton: !0 }), st = { lvl: 0 };
function ct(e, t) {
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
		end: 1 / 0,
		start: r,
		value: i
	}), a;
}
function q(e) {
	return e === st;
}
function lt(e, t) {
	if (!q(e)) return t === e.k ? e.v : t < e.k ? lt(e.l, t) : lt(e.r, t);
}
function ut(e, t, n = "k") {
	if (q(e)) return [-1 / 0, void 0];
	if (Number(e[n]) === t) return [e.k, e.v];
	if (Number(e[n]) < t) {
		let r = ut(e.r, t, n);
		return r[0] === -1 / 0 ? [e.k, e.v] : r;
	}
	return ut(e.l, t, n);
}
function dt(e, t, n) {
	return q(e) ? xt(t, n, 1) : t === e.k ? J(e, {
		k: t,
		v: n
	}) : t < e.k ? St(J(e, { l: dt(e.l, t, n) })) : St(J(e, { r: dt(e.r, t, n) }));
}
function ft() {
	return st;
}
function pt(e, t, n) {
	if (q(e)) return [];
	let r = ut(e, t)[0];
	return Tt(gt(e, r, n));
}
function mt(e, t) {
	if (q(e)) return st;
	let { k: n, l: r, r: i } = e;
	if (t === n) {
		if (q(r)) return i;
		if (q(i)) return r;
		let [t, n] = bt(r);
		return _t(J(e, {
			k: t,
			l: vt(r),
			v: n
		}));
	}
	return _t(t < n ? J(e, { l: mt(r, t) }) : J(e, { r: mt(i, t) }));
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
		if (yt(t)) return Ct(J(e, { lvl: n - 1 }));
		if (!q(t) && !q(t.r)) return J(t.r, {
			l: J(t, { r: t.r.l }),
			lvl: n,
			r: J(e, {
				l: t.r.r,
				lvl: n - 1
			})
		});
		throw Error("Unexpected empty nodes");
	}
	if (yt(e)) return wt(J(e, { lvl: n - 1 }));
	if (!q(r) && !q(r.l)) {
		let t = r.l, i = yt(t) ? r.lvl - 1 : r.lvl;
		return J(t, {
			l: J(e, {
				lvl: n - 1,
				r: t.l
			}),
			lvl: t.lvl + 1,
			r: wt(J(r, {
				l: t.r,
				lvl: i
			}))
		});
	}
	throw Error("Unexpected empty nodes");
}
function J(e, t) {
	return xt(t.k === void 0 ? e.k : t.k, t.v === void 0 ? e.v : t.v, t.lvl === void 0 ? e.lvl : t.lvl, t.l === void 0 ? e.l : t.l, t.r === void 0 ? e.r : t.r);
}
function vt(e) {
	return q(e.r) ? e.l : _t(J(e, { r: vt(e.r) }));
}
function yt(e) {
	return q(e) || e.lvl > e.r.lvl;
}
function bt(e) {
	return q(e.r) ? [e.k, e.v] : bt(e.r);
}
function xt(e, t, n, r = st, i = st) {
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
	return !q(t) && t.lvl === e.lvl ? J(t, { r: J(e, { l: t.r }) }) : e;
}
function wt(e) {
	let { lvl: t, r: n } = e;
	return !q(n) && !q(n.r) && n.lvl === t && n.r.lvl === t ? J(n, {
		l: J(e, { r: n.l }),
		lvl: t + 1
	}) : e;
}
function Tt(e) {
	return ct(e, ({ k: e, v: t }) => ({
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
	let n = q(e) ? 0 : 1 / 0;
	for (let r of t) {
		let { endIndex: t, size: i, startIndex: a } = r;
		if (n = Math.min(n, a), q(e)) {
			e = dt(e, 0, i);
			continue;
		}
		let o = pt(e, a - 1, t + 1);
		if (o.some(Jt(r))) continue;
		let s = !1, c = !1;
		for (let { end: n, start: r, value: a } of o) s ? (t >= r || i === a) && (e = mt(e, r)) : (c = a !== i, s = !0), n > t && t >= r && a !== i && (e = dt(e, t + 1, a));
		c && (e = dt(e, a, i));
	}
	return [e, n];
}
function Lt(e) {
	return e.groupIndex !== void 0;
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
	return r = Math.max(0, Math.min(n, r)), r;
}
function Ht(e, t, n, r = 0) {
	return r > 0 && (t = Math.max(t, kt(e, r, Pt).offset)), ct(jt(e, t, n, Rt), qt);
}
function Ut(e, [t, n, r, i]) {
	t.length > 0 && r("received item sizes", t, G.DEBUG);
	let a = e.sizeTree, o = a, s = 0;
	if (n.length > 0 && q(a) && t.length === 2) {
		let e = t[0].size, r = t[1].size;
		o = n.reduce((t, n) => dt(dt(t, n, e), n + 1, r), o);
	} else [o, s] = It(o, t);
	if (o === a) return e;
	let { lastIndex: c, lastOffset: l, lastSize: u, offsetTree: d } = Kt(e.offsetTree, s, o, i);
	return {
		groupIndices: n,
		groupOffsetTree: n.reduce((e, t) => dt(e, t, zt(t, d, i)), ft()),
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
			endIndex: i === void 0 ? 1 / 0 : i.k - 1,
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
	if (t === 0) i = [];
	else {
		c = At(i, t - 1, Pt), s = i[c].offset;
		let e = ut(n, t - 1);
		a = e[0], o = e[1], i.length && i[c].size === ut(n, t)[1] && --c, i = i.slice(0, c + 1);
	}
	for (let { start: e, value: c } of pt(n, t, 1 / 0)) {
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
	return (e) => e.start === r && (e.end === t || e.end === 1 / 0) && e.value === n;
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
		let r = e.reduce((e, r, i) => dt(e, r, zt(r, t.offsetTree, n) || i), ft());
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
			let n = lt(t.sizeTree, 0), a = 0, o = 0;
			for (; a < e;) {
				let e = t.groupIndices[o], s = t.groupIndices.length === o + 1 ? 1 / 0 : t.groupIndices[o + 1] - e - 1;
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
			if (r = ht(t.sizeTree).reduce((t, { k: n, v: r }) => dt(t, Math.max(0, n + e), r), r), a !== -e) {
				let n = lt(t.sizeTree, s);
				r = dt(r, 0, n);
				let i = ut(t.sizeTree, -e + 1)[1];
				r = dt(r, 1, i);
			}
			return {
				...t,
				sizeTree: r,
				...Kt(t.offsetTree, 0, r, n)
			};
		}
		let r = ht(t.sizeTree).reduce((t, { k: n, v: r }) => dt(t, Math.max(0, n + e), r), ft());
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
}, O(Ye, Ot), { singleton: !0 });
function Zt(e) {
	return e.reduce((e, t) => (e.groupIndices.push(e.totalCount), e.totalCount += t + 1, e), {
		groupIndices: [],
		totalCount: 0
	});
}
var Qt = H(([{ groupIndices: e, sizes: t, totalCount: n }, { headerHeight: r, scrollTop: i }]) => {
	let a = B(), o = B(), s = V(I(a, F(Zt)));
	return M(I(s, F((e) => e.totalCount)), n), M(I(s, F((e) => e.groupIndices)), e), M(I(U(i, t, r), P(([e, t]) => Nt(t)), F(([e, t, n]) => ut(t.groupOffsetTree, Math.max(e - n, 0), "v")[0]), N(), F((e) => [e])), o), {
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
}, O(Ye), { singleton: !0 }), en = typeof document < "u" && "scrollBehavior" in document.documentElement.style;
function tn(e) {
	let t = typeof e == "number" ? { index: e } : { ...e };
	return t.align ||= "start", (!t.behavior || !en) && (t.behavior = "auto"), t.offset === void 0 && (t.offset = 0), t;
}
var nn = H(([{ gap: e, listRefresh: t, sizes: n, totalCount: r }, { fixedFooterHeight: i, fixedHeaderHeight: a, footerHeight: o, headerHeight: s, scrollingInProgress: c, scrollTo: l, smoothScrollTargetReached: u, viewportHeight: d }, { log: f }]) => {
	let p = B(), m = B(), h = R(0), g = null, _ = null, v = null;
	function y() {
		g !== null && (g(), g = null), v !== null && (v(), v = null), _ &&= (clearTimeout(_), null), A(c, !1);
	}
	return M(I(p, L(n, d, r, h, s, o, f), L(e, a, i), F(([[e, n, r, i, a, o, s, l], d, f, h]) => {
		let b = tn(e), { align: x, behavior: S, offset: C } = b, w = i - 1, T = Vt(b, n, w), E = zt(T, n.offsetTree, d) + o;
		x === "end" ? (E += f + ut(n.sizeTree, T)[1] - r + h, T === w && (E += s)) : x === "center" ? E += (f + ut(n.sizeTree, T)[1] - r + h) / 2 : E -= a, C !== void 0 && C !== 0 && (E += C);
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
}, O(Xt, K, Ye), { singleton: !0 });
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
	if (e === void 0) return 0;
	let n = t - 1, r = typeof e == "number" ? e : e.index === "LAST" ? n : e.index;
	return Math.max(0, Math.min(r, n));
}
function sn(e) {
	return e === void 0 ? !0 : typeof e == "number" ? e === 0 : e.index === 0 && (e.align === void 0 || e.align === "start") && (e.offset === void 0 || e.offset === 0);
}
var cn = H(([{ defaultItemSize: e, listRefresh: t, sizes: n }, { scrollTop: r }, { scrollTargetReached: i, scrollToIndex: a }, { didMount: o }]) => {
	let s = R(!0), c = R(0), l = R(!0);
	return M(I(o, L(c), P(([e, t]) => !sn(t)), Le(!1)), s), M(I(o, L(c), P(([e, t]) => !sn(t)), Le(!1)), l), k(I(U(t, o), L(s, n, e, l), P(([[, e], t, { sizeTree: n }, r, i]) => e && (!q(n) || Oe(r)) && !t && !i), L(c)), ([, e]) => {
		if (e === void 0) {
			A(s, !0), A(l, !0);
			return;
		}
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
function ln(e, t) {
	return Math.abs(e - t) < 1.01;
}
var un = "up", dn = "down", fn = "none", pn = {
	atBottom: !1,
	notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
	state: {
		offsetBottom: 0,
		scrollHeight: 0,
		scrollTop: 0,
		viewportHeight: 0
	}
}, mn = 0, hn = H(([{ footerHeight: e, headerHeight: t, scrollBy: n, scrollContainerState: r, scrollTop: i, viewportHeight: a }]) => {
	let o = R(!1), s = R(!0), c = B(), l = B(), u = R(4), d = R(mn), f = z(I(Ke(I(W(i), ze(1), Le(!0)), I(W(i), ze(1), Le(!1), Fe(100))), N()), !1), p = z(I(Ke(I(n, Le(!0)), I(n, Le(!1), Fe(200))), N()), !1);
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
	}, pn), N((e, t) => e !== void 0 && e.atBottom === t.atBottom))), h = z(I(r, Re((e, { scrollHeight: t, scrollTop: n, viewportHeight: r }) => {
		if (!ln(e.scrollHeight, t)) {
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
	let g = R(dn);
	M(I(r, F(({ scrollTop: e }) => e), N(), Re((e, t) => j(p) ? {
		direction: e.direction,
		prevScrollTop: t
	} : {
		direction: t < e.prevScrollTop ? un : dn,
		prevScrollTop: t
	}, {
		direction: dn,
		prevScrollTop: 0
	}), F((e) => e.direction)), g), M(I(r, Be(50), Le(fn)), g);
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
}, O(K)), gn = "top", _n = "bottom", vn = "none";
function yn(e, t, n) {
	return typeof e == "number" ? n === un && t === gn || n === dn && t === _n ? e : 0 : n === un ? t === gn ? e.main : e.reverse : t === _n ? e.main : e.reverse;
}
function bn(e, t) {
	return typeof e == "number" ? e : e[t] ?? 0;
}
var xn = H(([{ deviation: e, fixedHeaderHeight: t, headerHeight: n, scrollTop: r, viewportHeight: i }]) => {
	let a = B(), o = R(0), s = R(0), c = R(0);
	return {
		increaseViewportBy: s,
		listBoundary: a,
		overscan: c,
		topListHeight: o,
		visibleRange: z(I(U(W(r), W(i), W(n), W(a, Dt), W(c), W(o), W(t), W(e), W(s)), F(([e, t, n, [r, i], a, o, s, c, l]) => {
			let u = e - c, d = o + s, f = Math.max(n - u, 0), p = vn, m = bn(l, gn), h = bn(l, _n);
			return r -= c, r += n + s, i += n + s, i -= c, r > e + d - m && (p = un), i < e - f + t + h && (p = dn), p === vn ? null : [Math.max(u - n - yn(a, gn, p) - m, 0), u - f - s + t + yn(a, _n, p) + h];
		}), P((e) => e !== null), N(Dt)), [0, 0])
	};
}, O(K), { singleton: !0 });
function Sn(e, t, n) {
	if (Nt(t)) {
		let r = Bt(e, t);
		return [{
			index: ut(t.groupOffsetTree, r)[0],
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
var Cn = {
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
function wn(e, t, n, r, i, a) {
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
		items: En(e, i, a),
		offsetBottom: m,
		offsetTop: l,
		top: p,
		topItems: En(t, i, a),
		topListHeight: t.reduce((e, t) => t.size + e, 0),
		totalCount: n
	};
}
function Tn(e, t, n, r, i, a) {
	let o = 0;
	if (n.groupIndices.length > 0) for (let t of n.groupIndices) {
		if (t - o >= e) break;
		o++;
	}
	let s = e + o, c = a !== void 0, l = a?.length ?? 0, u = on(t, c ? l : s), d = c ? Math.max(0, Math.min(s, l - u)) : s;
	return wn(Array.from({ length: d }).map((e, t) => ({
		data: a?.[t + u],
		index: t + u,
		offset: 0,
		size: 0
	})), [], d, i, n, r);
}
function En(e, t, n) {
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
function Dn(e, t) {
	return e === void 0 ? 0 : typeof e == "number" ? e : e[t] ?? 0;
}
var On = H(([{ data: e, firstItemIndex: t, gap: n, sizes: r, totalCount: i }, a, { listBoundary: o, topListHeight: s, visibleRange: c }, { initialTopMostItemIndex: l, scrolledToInitialItem: u }, { topListHeight: d }, f, { didMount: p }, { recalcInProgress: m }]) => {
	let h = R([]), g = R(0), _ = B(), v = R(0);
	M(a.topItemsIndexes, h);
	let y = z(I(U(p, m, W(c, Dt), W(i), W(r), W(l), u, W(h), W(t), W(n), W(v), e, W(g)), P(([e, t, , n, , , , , , , , r]) => {
		let i = r !== void 0 && r.length !== n;
		return e && !t && !i;
	}), F(([, , [e, t], n, r, i, a, o, s, c, l, u, d]) => {
		let f = r, { offsetTree: p, sizeTree: m } = f;
		if (n === 0) return {
			...Cn,
			totalCount: n
		};
		if (e === 0 && t === 0) return d === 0 ? {
			...Cn,
			totalCount: n
		} : Tn(d, i, r, s, c, u);
		if (q(m)) return d > 0 ? null : wn(Sn(on(i, n), f, u), [], n, c, f, s);
		let h = [];
		if (o.length > 0) {
			let e = o[0], t = o[o.length - 1], n = 0;
			for (let r of pt(m, e, t)) {
				let i = r.value, a = Math.max(r.start, e), o = Math.min(r.end, t);
				for (let e = a; e <= o; e++) h.push({
					data: u?.[e],
					index: e,
					offset: n,
					size: i
				}), n += i;
			}
		}
		if (!a) return wn([], h, n, c, f, s);
		let g = o.length > 0 ? o[o.length - 1] + 1 : 0, _ = Ht(p, e, t, g);
		if (_.length === 0) return null;
		let v = n - 1, y = je([], (n) => {
			for (let r of _) {
				let i = r.value, a = i.offset, o = r.start, s = i.size;
				if (i.offset < e) {
					o += Math.floor((e - i.offset + c) / (s + c));
					let t = o - r.start;
					a += t * s + t * c;
				}
				o < g && (a += (g - o) * s, o = g);
				let l = Math.min(r.end, v);
				for (let e = o; e <= l && !(a >= t); e++) n.push({
					data: u?.[e],
					index: e,
					offset: a,
					size: s
				}), a += s + c;
			}
		}), b = Dn(l, gn), x = Dn(l, _n);
		if (y.length > 0 && (b > 0 || x > 0)) {
			let e = y[0], t = y[y.length - 1];
			if (b > 0 && e.index > g) {
				let t = Math.min(b, e.index - g), n = [], r = e.offset;
				for (let i = e.index - 1; i >= e.index - t; i--) {
					let t = pt(m, i, i)[0]?.value ?? e.size;
					r -= t + c, n.unshift({
						data: u?.[i],
						index: i,
						offset: r,
						size: t
					});
				}
				y.unshift(...n);
			}
			if (x > 0 && t.index < v) {
				let e = Math.min(x, v - t.index), n = t.offset + t.size + c;
				for (let r = t.index + 1; r <= t.index + e; r++) {
					let e = pt(m, r, r)[0]?.value ?? t.size;
					y.push({
						data: u?.[r],
						index: r,
						offset: n,
						size: e
					}), n += e + c;
				}
			}
		}
		return wn(y, h, n, c, f, s);
	}), P((e) => e !== null), N()), Cn);
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
}, O(Xt, Qt, xn, cn, nn, hn, $t, Ot), { singleton: !0 }), kn = H(([{ fixedFooterHeight: e, fixedHeaderHeight: t, footerHeight: n, headerHeight: r }, { listState: i }]) => {
	let a = B(), o = z(I(U(n, e, r, t, i), F(([e, t, n, r, i]) => e + t + n + r + i.offsetBottom + i.bottom)), 0);
	return M(W(o), a), {
		totalListHeight: o,
		totalListHeightChanged: a
	};
}, O(K, On), { singleton: !0 }), An = H(([{ viewportHeight: e }, { totalListHeight: t }]) => {
	let n = R(!1);
	return {
		alignToBottom: n,
		paddingTopAddition: z(I(U(n, e, t), P(([e]) => e), F(([, e, t]) => Math.max(0, e - t)), Be(0), N()), 0)
	};
}, O(K, kn), { singleton: !0 }), jn = H(() => ({ context: R(null) })), Mn = ({ itemBottom: e, itemTop: t, locationParams: { align: n, behavior: r, ...i }, viewportBottom: a, viewportTop: o }) => t < o ? {
	...i,
	align: n ?? "start",
	...r === void 0 ? {} : { behavior: r }
} : e > a ? {
	...i,
	align: n ?? "end",
	...r === void 0 ? {} : { behavior: r }
} : null, Nn = H(([{ gap: e, sizes: t, totalCount: n }, { fixedFooterHeight: r, fixedHeaderHeight: i, headerHeight: a, scrollingInProgress: o, scrollTop: s, viewportHeight: c }, { scrollToIndex: l }]) => {
	let u = B();
	return M(I(u, L(t, c, n, a, i, r, s), L(e), F(([[e, t, n, r, i, a, s, c], l]) => {
		let { calculateViewLocation: u = Mn, done: d, ...f } = e, p = Vt(e, t, r - 1), m = zt(p, t.offsetTree, l) + i + a, h = m + ut(t.sizeTree, p)[1], g = c + a, _ = u({
			itemBottom: h,
			itemTop: m,
			locationParams: f,
			viewportBottom: c + n - s,
			viewportTop: g
		});
		return _ === null ? d?.() : d && Pe(I(o, P((e) => !e), ze(j(o) ? 1 : 2)), d), _;
	}), P((e) => e !== null)), l), { scrollIntoView: u };
}, O(Xt, K, nn, On, Ye), { singleton: !0 });
function Pn(e) {
	return e === !1 ? !1 : e === "smooth" ? "smooth" : "auto";
}
var Fn = (e, t) => typeof e == "function" ? Pn(e(t)) : t && Pn(e), In = H(([{ listRefresh: e, totalCount: t, fixedItemSize: n, data: r }, { atBottomState: i, isAtBottom: a }, { scrollToIndex: o }, { scrolledToInitialItem: s }, { didMount: c, propsReady: l }, { log: u }, { scrollingInProgress: d }, { context: f }, { scrollIntoView: p }]) => {
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
		return o && (s = Fn(n, r || a), o &&= s !== !1), {
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
	return M(Ke(I(W(r), F((e) => e?.length ?? 0)), I(W(t))), b), k(I(U(I(b, ze(1)), c), L(W(y), s, d, f), F(([[e, t], n, r, i, a]) => t && r && n?.({
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
}, O(Xt, hn, nn, cn, $t, Ye, K, jn, Nn)), Ln = H(([{ data: e, firstItemIndex: t, gap: n, sizes: r }, { initialTopMostItemIndex: i }, { initialItemCount: a, listState: o }, { didMount: s }]) => (M(I(s, L(a), P(([, e]) => e !== 0), L(i, r, t, n, e), F(([[, e], t, n, r, i, a]) => Tn(e, t, n, r, i, a))), o), {}), O(Xt, cn, On, $t), { singleton: !0 }), Rn = H(([{ didMount: e }, { scrollTo: t }, { listState: n }]) => {
	let r = R(0);
	return k(I(e, L(r), P(([, e]) => e !== 0), F(([, e]) => ({ top: e }))), (e) => {
		Pe(I(n, ze(1), P((e) => e.items.length > 1)), () => {
			requestAnimationFrame(() => {
				A(t, e);
			});
		});
	}), { initialScrollTop: r };
}, O($t, K, On), { singleton: !0 }), zn = H(([{ scrollVelocity: e }]) => {
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
}, O(hn), { singleton: !0 }), Bn = H(([{ scrollContainerState: e, scrollTo: t }]) => {
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
}, O(K)), Vn = H(([{ sizeRanges: e, sizes: t }, { headerHeight: n, scrollTop: r }, { initialTopMostItemIndex: i }, { didMount: a }, { useWindowScroll: o, windowScrollContainerState: s, windowViewportRect: c }]) => {
	let l = B(), u = R(void 0), d = R(null), f = R(null);
	return M(s, d), M(c, f), k(I(l, L(t, r, o, d, f, n)), ([e, t, n, r, i, a, o]) => {
		let s = Wt(t.sizeTree);
		r && i !== null && a !== null && (n = i.scrollTop - a.offsetTop), n -= o, e({
			ranges: s,
			scrollTop: n
		});
	}), M(I(u, P(Oe), F(Hn)), i), M(I(a, L(u), P(([, e]) => e !== void 0), N(), F(([, e]) => e.ranges)), e), {
		getState: l,
		restoreStateFrom: u
	};
}, O(Xt, K, cn, $t, Bn));
function Hn(e) {
	return {
		align: "start",
		index: 0,
		offset: e.scrollTop
	};
}
var Un = H(([{ topItemsIndexes: e }]) => {
	let t = R(0);
	return M(I(t, P((e) => e >= 0), F((e) => Array.from({ length: e }).map((e, t) => t))), e), { topItemCount: t };
}, O(On));
function Wn(e) {
	let t = !1, n;
	return (() => (t || (t = !0, n = e()), n));
}
var Gn = Wn(() => /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent)), Kn = H(([{ data: e, defaultItemSize: t, firstItemIndex: n, fixedItemSize: r, fixedGroupSize: i, gap: a, groupIndices: o, heightEstimates: s, itemSize: c, sizeRanges: l, sizes: u, statefulTotalCount: d, totalCount: f, trackItemSizes: p }, { initialItemFinalLocationReached: m, initialTopMostItemIndex: h, scrolledToInitialItem: g }, _, v, y, b, { scrollToIndex: x }, S, { topItemCount: C }, { groupCounts: w }, T]) => {
	let { listState: E, minOverscanItemCount: ee, topItemsIndexes: te, rangeChanged: ne, ...re } = b;
	return M(ne, T.scrollSeekRangeChanged), M(I(U(T.windowViewportRect, _.headerHeight, _.fixedHeaderHeight), F(([e, t, n]) => Math.max(t + n + 1, e.visibleHeight))), _.viewportHeight), {
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
}, O(Xt, cn, K, Vn, In, On, nn, H(([{ deviation: e, deviationCommitted: t, scrollBy: n, scrollingInProgress: r, scrollTop: i }, { isAtBottom: a, isScrolling: o, lastJumpDueToItemResize: s, scrollDirection: c }, { listState: l }, { beforeUnshiftWith: u, gap: d, shiftWithOffset: f, sizes: p }, { log: m }, { recalcInProgress: h }]) => {
	let g = V(I(l, L(s), Re(([, e, t, n], [{ bottom: r, items: i, offsetBottom: a, totalCount: o }, s]) => {
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
	]), P(([e]) => e !== 0), L(i, c, r, a, m, h), P(([, e, t, n, , , r]) => !r && !n && e !== 0 && t === un), F(([[e], , , , , t]) => (t("Upward scrolling compensation", { amount: e }, G.DEBUG), e))));
	function _(t) {
		t > 0 ? (A(n, {
			behavior: "auto",
			top: -t
		}), A(e, 0)) : (A(e, 0), A(n, {
			behavior: "auto",
			top: -t
		}));
	}
	k(I(g, L(e, o)), ([t, n, r]) => {
		r && Gn() ? A(e, n - t) : _(-t);
	}), k(I(U(z(o, !1), e, h), P(([e, t, n]) => !e && !n && t !== 0), F(([e, t]) => t), Be(1)), _), M(I(f, F((e) => ({ top: -e }))), n);
	let v = null;
	function y() {
		if (v === null) return;
		let { offset: t } = v;
		v = null, A(n, { top: t }), requestAnimationFrame(() => {
			A(e, 0), A(h, !1);
		});
	}
	return k(t, (e) => {
		v === null || !v.acknowledgeable || e === v.offset && y();
	}), k(I(u, L(p, d), F(([e, { groupIndices: t, lastSize: n, sizeTree: r }, i]) => {
		function a(e) {
			return e * (n + i);
		}
		if (t.length === 0) return a(e);
		let o = 0, s = lt(r, 0), c = 0, l = 0;
		for (; c < e;) {
			c++, o += s;
			let n = t.length === l + 1 ? 1 / 0 : t[l + 1] - t[l] - 1;
			c + n > e && (o -= s, n = e - c + 1), c += n, o += a(n), l++;
		}
		return o;
	})), (t) => {
		v = {
			acknowledgeable: j(e) !== t,
			offset: t
		}, A(e, t), requestAnimationFrame(y);
	}), { deviation: e };
}, O(K, hn, On, Xt, Ye, Ot)), Un, Qt, H(([e, t, n, r, i, a, o, s, c, l, u]) => ({
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
}), O(xn, Ln, $t, zn, kn, Rn, An, Bn, Nn, Ye, jn))));
function qn(e, t) {
	let n = {}, r = {}, i = 0, a = e.length;
	for (; i < a;) r[e[i]] = 1, i += 1;
	for (let e in t) Object.hasOwn(r, e) || (n[e] = t[e]);
	return n;
}
var Jn = typeof document > "u" ? e.useEffect : e.useLayoutEffect;
function Yn(t, n, r) {
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
			let { children: p, ...m } = n, [h] = e.useState(() => je(Ge(t), (e) => {
				l(e, m);
			})), [g] = e.useState(Ee(f, h));
			Jn(() => {
				for (let e of s) e in m && k(g[e], m[e]);
				return () => {
					Object.values(g).map(Ne);
				};
			}, [
				m,
				g,
				h
			]), Jn(() => {
				l(h, m);
			}), e.useImperativeHandle(o, Ce(u(h)));
			let _ = r;
			return /* @__PURE__ */ d(c.Provider, {
				value: h,
				children: r === void 0 ? p : /* @__PURE__ */ d(_, {
					...qn([
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
			Jn(() => k(r, n), [n, r]);
		},
		useEmitterValue: parseInt(e.version, 10) >= 18 ? (t) => {
			let n = e.useContext(c)[t], r = e.useCallback((e) => k(n, e), [n]);
			return e.useSyncExternalStore(r, () => j(n), () => j(n));
		} : (t) => {
			let n = e.useContext(c)[t], [r, i] = e.useState(Ee(j, n));
			return Jn(() => k(n, (e) => {
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
var Xn = e.createContext(void 0), Zn = e.createContext(void 0), Qn = "-webkit-sticky", $n = "sticky", er = Wn(() => {
	if (typeof document > "u") return $n;
	let e = document.createElement("div");
	return e.style.position = Qn, e.style.position === Qn ? Qn : $n;
});
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
			a = o === !0 ? Qe(e, e.scrollX) : e.scrollY, r = o === !0 ? e.document.documentElement.scrollWidth : e.document.documentElement.scrollHeight, i = o === !0 ? e.innerWidth : e.innerHeight;
		} else a = o === !0 ? Qe(s, s.scrollLeft) : s.scrollTop, r = o === !0 ? s.scrollWidth : s.scrollHeight, i = o === !0 ? s.offsetWidth : s.offsetHeight;
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
		let e = a ?? s.current;
		return i(a ?? s.current), u({
			suppressFlushSync: !0,
			target: e
		}), e.addEventListener("scroll", u, { passive: !0 }), () => {
			i(null), e.removeEventListener("scroll", u);
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
		tr(r) ? (u = Math.max(Mt(r.document.documentElement, o === !0 ? "width" : "height"), o === !0 ? r.document.documentElement.scrollWidth : r.document.documentElement.scrollHeight), a = o === !0 ? r.innerWidth : r.innerHeight, d = o === !0 ? Qe(r, r.scrollX) : r.scrollY) : (u = r[o === !0 ? "scrollWidth" : "scrollHeight"], a = Mt(r, o === !0 ? "width" : "height"), d = o === !0 ? Qe(r, r.scrollLeft) : r.scrollTop);
		let f = u - a;
		if (e.top === void 0) {
			r.scrollTo(e);
			return;
		}
		let p = Math.ceil(Math.max(Math.min(f, e.top), 0));
		if (e.top = p, ln(a, u) || p === d) {
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
			left: $e(r, p)
		}), r.scrollTo(e);
	}
	return {
		scrollByCallback: e.useCallback((e) => {
			o === !0 && (e = {
				...e.behavior === void 0 ? {} : { behavior: e.behavior },
				...e.top === void 0 ? {} : { left: $e(s.current, e.top) }
			}), s.current.scrollBy(e);
		}, [o]),
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
}), O(Kn, /* @__PURE__ */ H(() => {
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
	position: er(),
	zIndex: 1
}, cr = { overflowAnchor: "none" }, lr = {
	...cr,
	display: "inline-block",
	height: "100%"
}, ur = /* @__PURE__ */ e.memo(function({ showTopList: t = !1 }) {
	let r = X("listState"), i = Z("sizeRanges"), a = X("useWindowScroll"), o = X("customScrollParent"), s = Z("windowScrollContainerState"), c = Z("scrollContainerState"), l = o || a ? s : c, u = X("itemContent"), f = X("context"), p = X("groupContent"), m = X("trackItemSizes"), h = X("itemSize"), g = X("log"), _ = Z("gap"), v = X("horizontalDirection"), { callbackRef: y } = nt(i, h, m, t ? Ae : l, g, _, o, v, X("skipAnimationFrameInResizeObserver")), [b, x] = e.useState(0);
	Tr("deviation", (e) => {
		b !== e && x(e);
	});
	let S = Z("deviationCommitted");
	at(() => {
		S(b);
	}, [b, S]);
	let C = X("EmptyPlaceholder"), w = X("ScrollSeekPlaceholder") ?? or, T = X("ListComponent"), E = X("ItemComponent"), ee = X("GroupComponent"), te = X("computeItemKey"), ne = X("isSeeking"), re = X("groupIndices").length > 0, D = X("alignToBottom"), ie = X("initialItemFinalLocationReached"), ae = t ? {} : {
		boxSizing: "border-box",
		...v ? {
			display: "inline-block",
			height: "100%",
			marginInlineStart: b === 0 ? D ? "auto" : 0 : b,
			paddingInlineEnd: r.offsetBottom,
			paddingInlineStart: r.offsetTop,
			whiteSpace: "nowrap"
		} : {
			marginTop: b === 0 ? D ? "auto" : 0 : b,
			paddingBottom: r.offsetBottom,
			paddingTop: r.offsetTop
		},
		...ie ? {} : { visibility: "hidden" }
	};
	return !t && r.totalCount === 0 && C != null ? /* @__PURE__ */ d(C, { ...Y(C, f) }) : /* @__PURE__ */ d(T, {
		...Y(T, f),
		"data-testid": t ? "virtuoso-top-item-list" : "virtuoso-item-list",
		ref: y,
		style: ae,
		children: (t ? r.topItems : r.items).map((e) => {
			let t = e.originalIndex, i = te(t + r.firstItemIndex, e.data, f);
			return ne ? /* @__PURE__ */ n(w, {
				...Y(w, f),
				height: e.size,
				index: e.index,
				key: i,
				type: e.type || "item",
				...e.type === "group" ? {} : { groupIndex: e.groupIndex }
			}) : e.type === "group" ? /* @__PURE__ */ n(ee, {
				...Y(ee, f),
				"data-index": t,
				"data-item-index": e.index,
				"data-known-size": e.size,
				key: i,
				style: sr
			}, p(e.index, f)) : /* @__PURE__ */ n(E, {
				...Y(E, f),
				...gr(E, e.data),
				"data-index": t,
				"data-item-group-index": e.groupIndex,
				"data-item-index": e.index,
				"data-known-size": e.size,
				key: i,
				style: v ? lr : cr
			}, re ? u(e.index, e.groupIndex, e.data, f) : u(e.index, e.data, f));
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
	position: er(),
	top: 0,
	width: "100%",
	zIndex: 1
};
function Y(e, t) {
	if (typeof e != "string") return { context: t };
}
function gr(e, t) {
	return { item: typeof e == "string" ? void 0 : t };
}
var _r = /* @__PURE__ */ e.memo(function() {
	let t = X("HeaderComponent"), n = Z("headerHeight"), r = X("HeaderFooterTag"), i = et(e.useMemo(() => (e) => {
		n(Mt(e, "height"));
	}, [n]), !0, X("skipAnimationFrameInResizeObserver")), a = X("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...Y(t, a) })
	});
}), vr = /* @__PURE__ */ e.memo(function() {
	let t = X("FooterComponent"), n = Z("footerHeight"), r = X("HeaderFooterTag"), i = et(e.useMemo(() => (e) => {
		n(Mt(e, "height"));
	}, [n]), !0, X("skipAnimationFrameInResizeObserver")), a = X("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...Y(t, a) })
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
			...Y(c, a),
			children: e
		});
	});
}
function br({ useEmitter: t, useEmitterValue: n, usePublisher: r }) {
	return e.memo(function({ children: i, style: a, context: o, ...s }) {
		let c = r("windowScrollContainerState"), l = n("ScrollerComponent"), u = r("smoothScrollTargetReached"), f = n("totalListHeight"), p = n("deviation"), m = n("customScrollParent"), h = e.useRef(null), { scrollByCallback: g, scrollerRef: _, scrollToCallback: v } = rr(c, u, l, n("scrollerRef"), m);
		return at(() => (_.current = m ?? h.current?.ownerDocument.defaultView, () => {
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
			...Y(l, o),
			children: i
		});
	});
}
var xr = ({ children: t }) => {
	let n = e.useContext(Xn), r = Z("viewportHeight"), i = Z("fixedItemHeight"), a = X("alignToBottom"), o = X("horizontalDirection"), s = et(e.useMemo(() => Te(r, (e) => Mt(e, o ? "width" : "height")), [r, o]), !0, X("skipAnimationFrameInResizeObserver"));
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
	let n = e.useContext(Xn), r = Z("windowViewportRect"), i = Z("fixedItemHeight"), a = X("customScrollParent"), o = X("useWindowScroll"), s = X("topListHeight"), c = ot(r, a, X("skipAnimationFrameInResizeObserver")), l = X("alignToBottom");
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
	let t = X("TopItemListComponent") ?? "div", n = X("headerHeight"), r = {
		...hr,
		marginTop: `${n}px`
	}, i = X("context");
	return /* @__PURE__ */ d(t, {
		style: r,
		...Y(t, i),
		children: e
	});
}, { Component: wr, useEmitter: Tr, useEmitterValue: X, usePublisher: Z } = /* @__PURE__ */ Yn(ar, {
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
	let t = X("useWindowScroll"), n = X("topItemsIndexes").length > 0, r = X("customScrollParent"), i = X("context");
	return /* @__PURE__ */ f(r || t ? Dr : Er, {
		...e,
		context: i,
		children: [n && /* @__PURE__ */ d(Cr, { children: /* @__PURE__ */ d(ur, { showTopList: !0 }) }), /* @__PURE__ */ f(r || t ? Sr : xr, { children: [
			/* @__PURE__ */ d(_r, {}),
			/* @__PURE__ */ d(ur, {}),
			/* @__PURE__ */ d(vr, {})
		] })]
	});
})), Er = /* @__PURE__ */ yr({
	useEmitter: Tr,
	useEmitterValue: X,
	usePublisher: Z
}), Dr = /* @__PURE__ */ br({
	useEmitter: Tr,
	useEmitterValue: X,
	usePublisher: Z
}), Or = /* @__PURE__ */ H(([e, t]) => ({
	...e,
	...t
}), O(Kn, /* @__PURE__ */ H(() => {
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
}))), kr = ({ height: e }) => /* @__PURE__ */ d("tr", { children: /* @__PURE__ */ d("td", { style: { height: e } }) }), Ar = ({ height: e }) => /* @__PURE__ */ d("tr", { children: /* @__PURE__ */ d("td", { style: {
	border: 0,
	height: e,
	padding: 0
} }) }), jr = { overflowAnchor: "none" }, Mr = {
	position: er(),
	zIndex: 2,
	overflowAnchor: "none"
}, Nr = /* @__PURE__ */ e.memo(function({ showTopList: e = !1 }) {
	let t = Q("listState"), r = Q("computeItemKey"), i = Q("firstItemIndex"), a = Q("context"), o = Q("isSeeking"), s = Q("fixedHeaderHeight"), c = Q("groupIndices").length > 0, l = Q("itemContent"), u = Q("groupContent"), d = Q("ScrollSeekPlaceholder") ?? kr, f = Q("GroupComponent"), p = Q("TableRowComponent"), m = (e ? t.topItems : []).reduce((e, t, n) => (n === 0 ? e.push(t.size) : e.push(e[n - 1] + t.size), e), []);
	return (e ? t.topItems : t.items).map((t) => {
		let h = t.originalIndex, g = r(h + i, t.data, a), _ = e ? h === 0 ? 0 : m[h - 1] : 0;
		return o ? /* @__PURE__ */ n(d, {
			...Y(d, a),
			height: t.size,
			index: t.index,
			key: g,
			type: t.type || "item"
		}) : t.type === "group" ? /* @__PURE__ */ n(f, {
			...Y(f, a),
			"data-index": h,
			"data-item-index": t.index,
			"data-known-size": t.size,
			key: g,
			style: {
				...Mr,
				top: s
			}
		}, u(t.index, a)) : /* @__PURE__ */ n(p, {
			...Y(p, a),
			...gr(p, t.data),
			"data-index": h,
			"data-item-index": t.index,
			"data-known-size": t.size,
			"data-item-group-index": t.groupIndex,
			key: g,
			style: e ? {
				...Mr,
				top: s + _
			} : jr
		}, c ? l(t.index, t.groupIndex, t.data, a) : l(t.index, t.data, a));
	});
}), Pr = /* @__PURE__ */ e.memo(function() {
	let t = Q("listState"), n = Q("topItemsIndexes").length > 0, r = zr("sizeRanges"), i = Q("useWindowScroll"), a = Q("customScrollParent"), o = zr("windowScrollContainerState"), s = zr("scrollContainerState"), c = a || i ? o : s, l = Q("trackItemSizes"), { callbackRef: u, ref: p } = nt(r, Q("itemSize"), l, c, Q("log"), void 0, a, !1, Q("skipAnimationFrameInResizeObserver")), [m, h] = e.useState(0);
	Rr("deviation", (e) => {
		m !== e && (p.current.style.marginTop = `${e}px`, h(e));
	});
	let g = zr("deviationCommitted");
	at(() => {
		g(m);
	}, [m, g]);
	let _ = Q("EmptyPlaceholder"), v = Q("FillerRow") ?? Ar, y = Q("TableBodyComponent"), b = Q("paddingTopAddition"), x = Q("statefulTotalCount"), S = Q("context");
	if (x === 0 && _ != null) return /* @__PURE__ */ d(_, { ...Y(_, S) });
	let C = (n ? t.topItems : []).reduce((e, t) => e + t.size, 0), w = t.offsetTop + b + m - C, T = t.offsetBottom, E = w > 0 ? /* @__PURE__ */ d(v, {
		context: S,
		height: w
	}, "padding-top") : null, ee = T > 0 ? /* @__PURE__ */ d(v, {
		context: S,
		height: T
	}, "padding-bottom") : null;
	return /* @__PURE__ */ f(y, {
		"data-testid": "virtuoso-item-list",
		ref: u,
		...Y(y, S),
		children: [
			E,
			n && /* @__PURE__ */ d(Nr, { showTopList: !0 }),
			/* @__PURE__ */ d(Nr, {}),
			ee
		]
	});
}), Fr = ({ children: t }) => {
	let n = e.useContext(Xn), r = zr("viewportHeight"), i = zr("fixedItemHeight"), a = et(e.useMemo(() => Te(r, (e) => Mt(e, "height")), [r]), !0, Q("skipAnimationFrameInResizeObserver"));
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
}, Ir = ({ children: t }) => {
	let n = e.useContext(Xn), r = zr("windowViewportRect"), i = zr("fixedItemHeight"), a = Q("customScrollParent"), o = Q("useWindowScroll"), s = ot(r, a, Q("skipAnimationFrameInResizeObserver"));
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
}, { Component: Lr, useEmitter: Rr, useEmitterValue: Q, usePublisher: zr } = /* @__PURE__ */ Yn(Or, {
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
		logLevel: "logLevel",
		skipAnimationFrameInResizeObserver: "skipAnimationFrameInResizeObserver"
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
	let n = Q("useWindowScroll"), r = Q("customScrollParent"), i = zr("fixedHeaderHeight"), a = zr("fixedFooterHeight"), o = Q("fixedHeaderContent"), s = Q("fixedFooterContent"), c = Q("context"), l = et(e.useMemo(() => Te(i, (e) => Mt(e, "height")), [i]), !0, Q("skipAnimationFrameInResizeObserver")), u = et(e.useMemo(() => Te(a, (e) => Mt(e, "height")), [a]), !0, Q("skipAnimationFrameInResizeObserver")), p = r || n ? Vr : Br, m = r || n ? Ir : Fr, h = Q("TableComponent"), g = Q("TableHeadComponent"), _ = Q("TableFooterComponent"), v = o ? /* @__PURE__ */ d(g, {
		ref: l,
		style: {
			position: "sticky",
			top: 0,
			zIndex: 2
		},
		...Y(g, c),
		children: o()
	}, "TableHead") : null, y = s ? /* @__PURE__ */ d(_, {
		ref: u,
		style: {
			bottom: 0,
			position: "sticky",
			zIndex: 1
		},
		...Y(_, c),
		children: s()
	}, "TableFoot") : null;
	return /* @__PURE__ */ d(p, {
		...t,
		...Y(p, c),
		children: /* @__PURE__ */ d(m, { children: /* @__PURE__ */ f(h, {
			style: {
				borderSpacing: 0,
				overflowAnchor: "none"
			},
			...Y(h, c),
			children: [
				v,
				/* @__PURE__ */ d(Pr, {}, "TableBody"),
				y
			]
		}) })
	});
})), Br = /* @__PURE__ */ yr({
	useEmitter: Rr,
	useEmitterValue: Q,
	usePublisher: zr
}), Vr = /* @__PURE__ */ br({
	useEmitter: Rr,
	useEmitterValue: Q,
	usePublisher: zr
}), Hr = Lr, Ur = {
	bottom: 0,
	itemHeight: 0,
	items: [],
	itemWidth: 0,
	offsetBottom: 0,
	offsetTop: 0,
	top: 0
}, Wr = {
	bottom: 0,
	itemHeight: 0,
	items: [{ index: 0 }],
	itemWidth: 0,
	offsetBottom: 0,
	offsetTop: 0,
	top: 0
}, { ceil: Gr, floor: Kr, max: qr, min: Jr, round: Yr } = Math;
function Xr(e, t, n) {
	return Array.from({ length: t - e + 1 }).map((t, r) => ({
		data: n === null ? null : n[r + e],
		index: r + e
	}));
}
function Zr(e) {
	return {
		...Wr,
		items: e
	};
}
function Qr(e, t) {
	return e !== void 0 && e.width === t.width && e.height === t.height;
}
function $r(e, t) {
	return e !== void 0 && e.column === t.column && e.row === t.row;
}
var ei = /* @__PURE__ */ H(([{ increaseViewportBy: e, listBoundary: t, overscan: n, visibleRange: r }, { footerHeight: i, headerHeight: a, scrollBy: o, scrollContainerState: s, scrollTo: c, scrollTop: l, smoothScrollTargetReached: u, viewportHeight: d }, f, p, { didMount: m, propsReady: h }, { customScrollParent: g, useWindowScroll: _, windowScrollContainerState: v, windowScrollTo: y, windowViewportRect: b }, x]) => {
	let S = R(0), C = R(0), w = R(Ur), T = R({
		height: 0,
		width: 0
	}), E = R({
		height: 0,
		width: 0
	}), ee = B(), te = B(), ne = R(0), re = R(null), D = R({
		column: 0,
		row: 0
	}), ie = B(), ae = B(), oe = R(!1), se = R(0), ce = R(!0), le = R(!1), ue = R(!1);
	k(I(m, L(se), P(([e, t]) => !sn(t))), () => {
		A(ce, !1);
	}), k(I(U(m, ce, E, T, se, le), P(([e, t, n, r, , i]) => e && !t && n.height !== 0 && r.height !== 0 && !i)), ([, , , , e]) => {
		if (e === void 0) {
			A(ce, !0);
			return;
		}
		A(le, !0), an(1, () => {
			A(ee, e);
		}), Pe(I(l), () => {
			A(t, [0, 0]), A(ce, !0);
		});
	}), M(I(ae, P((e) => e != null && e.scrollTop > 0), Le(0)), C), k(I(m, L(ae), P(([, e]) => e != null)), ([, e]) => {
		e && (A(T, e.viewport), A(E, e.item), A(D, e.gap), e.scrollTop > 0 && (A(oe, !0), Pe(I(l, ze(1)), (e) => {
			A(oe, !1);
		}), A(c, { top: e.scrollTop })));
	}), M(I(T, F(({ height: e }) => e)), d), M(I(U(W(T, Qr), W(E, Qr), W(D, (e, t) => e !== void 0 && e.column === t.column && e.row === t.row), W(l)), F(([e, t, n, r]) => ({
		gap: n,
		item: t,
		scrollTop: r,
		viewport: e
	}))), ie), M(I(U(W(S), r, W(D, $r), W(E, Qr), W(T, Qr), W(re), W(C), W(oe), W(ce), W(se)), P(([, , , , , , , e]) => !e), F(([e, [t, n], r, i, a, o, s, , c, l]) => {
		let { column: u, row: d } = r, { height: f, width: p } = i, { width: m } = a;
		if (s === 0 && (e === 0 || m === 0)) return Ur;
		if (p === 0) {
			let t = on(l, e);
			return Zr(Xr(t, t + Math.max(s - 1, 0), o));
		}
		let h = ti(m, p, u), g, _;
		c ? t === 0 && n === 0 && s > 0 ? (g = 0, _ = s - 1) : (g = h * Kr((t + d) / (f + d)), _ = h * Gr((n + d) / (f + d)) - 1, _ = Jr(e - 1, qr(_, h - 1)), g = Jr(_, qr(0, g))) : (g = 0, _ = -1);
		let v = Xr(g, _, o), { bottom: y, top: b } = ni(a, r, i, v), x = Gr(e / h);
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
		let { bottom: i, top: a } = ni(e, r, t, n);
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
		l === "LAST" && (l = r - 1), l = qr(0, l, Jr(r - 1, l));
		let u = ri(t, i, n, l);
		return o === "end" ? u = Yr(u - t.height + n.height) : o === "center" && (u = Yr(u - t.height / 2 + n.height / 2)), c !== void 0 && c !== 0 && (u += c), {
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
}, O(xn, K, hn, zn, $t, Bn, Ye));
function ti(e, t, n) {
	return qr(1, Kr((e + n) / (Kr(t) + n)));
}
function ni(e, t, n, r) {
	let { height: i } = n;
	if (i === void 0 || r.length === 0) return {
		bottom: 0,
		top: 0
	};
	let a = ri(e, t, n, r[0].index);
	return {
		bottom: ri(e, t, n, r[r.length - 1].index) + i,
		top: a
	};
}
function ri(e, t, n, r) {
	let i = Kr(r / ti(e.width, n.width, t.column)), a = i * n.height + qr(0, i - 1) * t.row;
	return a > 0 ? a + t.row : a;
}
var ii = /* @__PURE__ */ H(([e, t]) => ({
	...e,
	...t
}), O(ei, /* @__PURE__ */ H(() => {
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
}))), ai = /* @__PURE__ */ e.memo(function() {
	let t = $("gridState"), r = $("listClassName"), i = $("itemClassName"), a = $("itemContent"), o = $("computeItemKey"), s = $("isSeeking"), c = fi("scrollHeight"), l = $("ItemComponent"), u = $("ListComponent"), f = $("ScrollSeekPlaceholder"), p = $("context"), m = fi("itemDimensions"), h = fi("gap"), g = $("log"), _ = $("stateRestoreInProgress"), v = fi("reportReadyState"), y = et(e.useMemo(() => (e) => {
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
			column: hi("column-gap", getComputedStyle(e).columnGap, g),
			row: hi("row-gap", getComputedStyle(e).rowGap, g)
		});
	}, [
		c,
		m,
		h,
		g
	]), !0, !1);
	return at(() => {
		t.itemHeight > 0 && t.itemWidth > 0 && v(!0);
	}, [t]), _ ? null : /* @__PURE__ */ d(u, {
		className: r,
		ref: y,
		...Y(u, p),
		"data-testid": "virtuoso-item-list",
		style: {
			paddingBottom: t.offsetBottom,
			paddingTop: t.offsetTop
		},
		children: t.items.map((e) => {
			let r = o(e.index, e.data, p);
			return s ? /* @__PURE__ */ d(f, {
				...Y(f, p),
				height: t.itemHeight,
				index: e.index,
				width: t.itemWidth
			}, r) : /* @__PURE__ */ n(l, {
				...Y(l, p),
				className: i,
				"data-index": e.index,
				key: r
			}, a(e.index, e.data, p));
		})
	});
}), oi = e.memo(function() {
	let t = $("HeaderComponent"), n = fi("headerHeight"), r = $("headerFooterTag"), i = et(e.useMemo(() => (e) => {
		n(Mt(e, "height"));
	}, [n]), !0, !1), a = $("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...Y(t, a) })
	});
}), si = e.memo(function() {
	let t = $("FooterComponent"), n = fi("footerHeight"), r = $("headerFooterTag"), i = et(e.useMemo(() => (e) => {
		n(Mt(e, "height"));
	}, [n]), !0, !1), a = $("context");
	return t == null ? null : /* @__PURE__ */ d(r, {
		ref: i,
		children: /* @__PURE__ */ d(t, { ...Y(t, a) })
	});
}), ci = ({ children: t }) => {
	let n = e.useContext(Zn), r = fi("itemDimensions"), i = fi("viewportDimensions"), a = et(e.useMemo(() => (e) => {
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
}, li = ({ children: t }) => {
	let n = e.useContext(Zn), r = fi("windowViewportRect"), i = fi("itemDimensions"), a = $("customScrollParent"), o = $("useWindowScroll"), s = ot(r, a, !1);
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
}, { Component: ui, useEmitter: di, useEmitterValue: $, usePublisher: fi } = /* @__PURE__ */ Yn(ii, {
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
	let t = $("useWindowScroll"), n = $("customScrollParent"), r = n || t ? mi : pi, i = n || t ? li : ci, a = $("context");
	return /* @__PURE__ */ d(r, {
		...e,
		...Y(r, a),
		children: /* @__PURE__ */ f(i, { children: [
			/* @__PURE__ */ d(oi, {}),
			/* @__PURE__ */ d(ai, {}),
			/* @__PURE__ */ d(si, {})
		] })
	});
})), pi = /* @__PURE__ */ yr({
	useEmitter: di,
	useEmitterValue: $,
	usePublisher: fi
}), mi = /* @__PURE__ */ br({
	useEmitter: di,
	useEmitterValue: $,
	usePublisher: fi
});
function hi(e, t, n) {
	return t !== "normal" && t?.endsWith("px") !== !0 && n(`${e} was not resolved to pixel value correctly`, t, G.WARN), t === "normal" ? 0 : parseInt(t ?? "0", 10);
}
//#endregion
//#region src/virtual/size-utils.ts
var gi = (e) => {
	switch (e) {
		case "sm": return 33;
		case "xs": return 24;
		default: return 41;
	}
};
//#endregion
//#region src/virtual/FixedHeaderContent.tsx
function _i({ onChangeSort: e }) {
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
function vi({ row: e, renderRow: t }) {
	let [n] = w();
	return t ? t(e) : /* @__PURE__ */ d(b, {
		fields: n,
		row: e
	});
}
//#endregion
//#region src/virtual/VirtualTableContainer.tsx
var yi = l.div`
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
function bi({ rowHeight: e, headerHeight: t, maxHeight: n, className: r, size: i, data: o, keyField: s, rowClassName: l, renderRow: u, onSelectRow: f, selected: p, tfoot: m, onChangeSort: g, containerProps: y, ...b }) {
	let x = ve(), S = e ?? gi(i), C = t ?? gi(i), [w, T] = c(n ?? x), [E, ee] = c(w);
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
	}, D = () => /* @__PURE__ */ d(_i, { onChangeSort: g });
	return /* @__PURE__ */ d(yi, {
		...y,
		style: {
			...y?.style,
			height: E
		},
		children: /* @__PURE__ */ d(Hr, {
			data: o,
			components: re,
			totalListHeightChanged: te,
			fixedItemHeight: S,
			fixedHeaderContent: D,
			itemContent: (e, t) => /* @__PURE__ */ d(vi, {
				row: t,
				renderRow: u
			}, e)
		})
	});
}
//#endregion
//#region src/virtual/VirtualTable.tsx
function xi({ data: e, fields: t, keyField: n, currentSort: r, onChangeSort: i, ...a }) {
	return /* @__PURE__ */ f(S, {
		initialFields: t,
		children: [/* @__PURE__ */ d(ue, { nextSort: r }), /* @__PURE__ */ d(bi, {
			onChangeSort: i,
			data: e,
			keyField: n,
			...a
		})]
	});
}
//#endregion
export { E as ContainedDataTable, te as ContainedDataTableRow, le as ContainedSortableTable, bi as ContainedVirtualTable, ee as DataTable, y as DataTableCell, he as DataTableCols, x as DataTableContext, S as DataTableProvider, ne as DataTableRow, b as DataTableRowCellSet, re as DataTableTBody, C as DataTableTH, v as DataTableTR, pe as RowsPerPage, ue as SortHelper, de as SortableTable, se as SortableTableHead, oe as SortableTableTH, _ as Table, me as TablePagination, xi as VirtualTable, ge as useField, _e as useTableContext, w as useTableFields, D as useTableSort };

//# sourceMappingURL=index.es.js.map