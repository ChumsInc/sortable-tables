import { jsx as l, jsxs as h } from "react/jsx-runtime";
import { createContext as I, useState as w, useCallback as g, useMemo as J, useContext as S, createElement as L, useEffect as q, useId as K } from "react";
import R from "@emotion/styled";
const y = I(null);
function x({
  children: t,
  initialFields: a = [],
  initialSort: e = null
}) {
  const [n, s] = w(a), [r, c] = w(e), u = g(
    (p) => {
      s(p);
    },
    []
  ), i = g(
    (p) => {
      c(p);
    },
    []
  ), d = g((p, f) => {
    const N = n.map((T) => T.id === p ? { ...T, ...f } : T);
    s(N);
  }, [n]), o = g((p) => n.find((f) => f.id === p), [n]), b = J(
    () => ({
      fields: n,
      setFields: u,
      sort: r,
      setSort: i,
      getField: o,
      updateField: d
    }),
    [n, u, r, i, d, o]
  );
  return /* @__PURE__ */ l(y.Provider, { value: b, children: t });
}
x.displayName = "DataTableProvider";
function E(t) {
  var a, e, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (a = 0; a < s; a++) t[a] && (e = E(t[a])) && (n && (n += " "), n += e);
  } else for (e in t) t[e] && (n && (n += " "), n += e);
  return n;
}
function m() {
  for (var t, a, e = 0, n = "", s = arguments.length; e < s; e++) (t = arguments[e]) && (a = E(t)) && (n && (n += " "), n += a);
  return n;
}
const F = R.table`
    --table-sticky-top: ${(t) => t.sticky ? "0" : void 0};

    thead {
        tr:nth-of-type(1) td,
        tr:nth-of-type(1) th {
            top: var(--table-sticky-top, unset);
            position: ${(t) => t.sticky ? "sticky" : "unset"};
            z-index: ${(t) => t.sticky ? 10 : "unset"};
            background: ${(t) => t.sticky ? "linear-gradient(var(--bs-table-bg) 75%, rgba(var(--bs-secondary-bg-rgb), 0.9))" : "unset"};
        }
    }
`;
function P({
  sticky: t,
  responsive: a,
  children: e,
  className: n,
  ref: s,
  ...r
}) {
  if (a) {
    const c = m(n, {
      "table-responsive": a === !0,
      [`table-responsive-${a}`]: a !== !0
    });
    return /* @__PURE__ */ l("div", { className: c, children: /* @__PURE__ */ l(F, { ref: s, ...r, children: e }) });
  }
  return /* @__PURE__ */ l(F, { className: n, sticky: t, ref: s, ...r, children: e });
}
function C({
  field: t,
  className: a,
  children: e,
  ...n
}) {
  if (t.visible === !1)
    return null;
  const s = m({ [`text-${t.align}`]: !!t.align }, a);
  return /* @__PURE__ */ l("th", { className: s, scope: "col", ...n, children: e ?? t.title });
}
C.displayName = "DataTableTH";
function v() {
  const t = S(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return [
    t.fields,
    t.setFields
  ];
}
function j({ ...t }) {
  const [a] = v();
  return /* @__PURE__ */ l("thead", { ...t, children: /* @__PURE__ */ l("tr", { children: a.map((e, n) => /* @__PURE__ */ l(
    C,
    {
      ...e.thProps,
      field: e,
      className: m(
        typeof e.className == "function" ? { [`text-${e.align}`]: !!e.align } : e.className
      )
    },
    String(e.id ?? n)
  )) }) });
}
j.displayName = "DataTableHead";
function _({
  className: t,
  size: a,
  responsive: e,
  sticky: n,
  data: s,
  keyField: r,
  rowClassName: c,
  renderRow: u,
  onSelectRow: i,
  selected: d,
  tableHeadProps: o,
  children: b,
  tfoot: p,
  ...f
}) {
  const N = m("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ h(P, { sticky: n, responsive: e, className: N, ...f, children: [
    /* @__PURE__ */ l(H, {}),
    /* @__PURE__ */ l(j, { ...o }),
    !!s.length && /* @__PURE__ */ l(
      k,
      {
        data: s,
        keyField: r,
        rowClassName: c,
        renderRow: u,
        onSelectRow: i,
        selected: d
      }
    ),
    b,
    p
  ] });
}
_.displayName = "DataTable";
function O({
  fields: t,
  ...a
}) {
  return /* @__PURE__ */ l(x, { initialFields: t, children: /* @__PURE__ */ l(_, { ...a }) });
}
O.displayName = "StandaloneDataTable";
function D({ field: t, row: a, className: e, as: n, ...s }) {
  if (t.visible === !1)
    return null;
  const r = m(
    { [`text-${t.align}`]: !!t.align },
    e,
    typeof t.className == "function" ? t.className(a) : t.className
  );
  return L(
    n ?? t.as ?? "td",
    {
      className: r,
      scope: (n ?? t.as) === "th" ? "row" : void 0,
      colSpan: t.colSpan,
      ...t.cellProps,
      ...s
    },
    a[t.field] === void 0 && !t.render ? null : typeof t.render == "function" ? t.render(a) : a[t.field]
  );
}
D.displayName = "DataTableCell";
function M({
  className: t,
  rowClassName: a,
  selected: e,
  row: n,
  trRef: s,
  onClick: r,
  ...c
}) {
  const [u] = v(), i = (o) => {
    r?.(n, o);
  }, d = typeof a == "function" ? a(n) : a;
  return n ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: m({ "table-active": e }, t, d),
      onClick: i,
      ...c,
      children: u.map((o, b) => /* @__PURE__ */ l(D, { field: o, row: n }, String(o?.id ?? b)))
    }
  ) : null;
}
M.displayName = "DataTableRow";
function Q({
  fields: t,
  className: a,
  rowClassName: e,
  selected: n,
  row: s,
  trRef: r,
  onClick: c,
  ...u
}) {
  const i = (o) => {
    c?.(s, o);
  }, d = typeof e == "function" ? e(s) : e;
  return s ? /* @__PURE__ */ l(
    "tr",
    {
      ref: r,
      className: m({ "table-active": n }, a, d),
      onClick: i,
      ...u,
      children: t.map((o, b) => /* @__PURE__ */ l(D, { field: o, row: s }, String(o?.id ?? b)))
    }
  ) : null;
}
Q.displayName = "StandaloneDataTableRow";
function k({
  data: t,
  keyField: a,
  rowClassName: e,
  renderRow: n,
  onSelectRow: s,
  selected: r = "",
  children: c,
  ...u
}) {
  return /* @__PURE__ */ h("tbody", { ...u, children: [
    t.map((i) => {
      const d = String(typeof a == "function" ? a(i) : i[a]), o = typeof r == "function" ? r(i) : d === r;
      return n ? n(i) : /* @__PURE__ */ l(
        M,
        {
          onClick: s,
          rowClassName: e,
          row: i,
          selected: o
        },
        d
      );
    }),
    c
  ] });
}
k.displayName = "DataTableTBody";
function $() {
  const t = S(y);
  if (!t)
    throw new Error("useTableSort must be used within a DataTableProvider");
  return [
    t.sort,
    t.setSort
  ];
}
const U = (t) => t ? t === "end" ? "flex-end" : "center" : "flex-start", X = R.div`
    display: flex;
    width: 100%;
    flex-direction: ${(t) => t.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(t) => U(t.align)};

    .sort-icon {
        flex-grow: ${(t) => t.align === "end" ? "1" : "0"};
        opacity: ${(t) => t.sorted ? 1 : 0};
    }

    &:hover .sort-icon {
        color: ${(t) => t.sorted ? "unset" : "var(--bs-primary)"};
        opacity: 0.75;
        transition: opacity 0.2s;
    }
`;
function W({
  field: t,
  sorted: a,
  ascending: e,
  className: n,
  onClick: s
}) {
  if (t.visible === !1)
    return null;
  if (!t.sortable)
    return /* @__PURE__ */ l(C, { field: t, className: n });
  const { className: r, ...c } = t.thProps ?? {}, u = m(
    n,
    r,
    { [`text-${t.align}`]: !!t.align }
  ), i = () => {
    s({ field: t.field, ascending: a ? !e : !0 });
  }, d = {
    "bi-arrow-down": e,
    "bi-arrow-up": !e
  };
  return /* @__PURE__ */ l("th", { ...c, className: m("sortable", u), scope: "col", onClick: i, children: /* @__PURE__ */ h(X, { sorted: a, align: t.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: t.title }),
    /* @__PURE__ */ l("div", { className: m("me-1 sort-icon", d) })
  ] }) });
}
W.displayName = "SortableTableTH";
function A({
  onChangeSort: t
}) {
  const [a] = v(), [e] = $();
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: a.map((n, s) => /* @__PURE__ */ l(
    W,
    {
      field: n,
      sorted: e?.field === n.field,
      ascending: e?.ascending,
      className: m(
        typeof n.className == "function" ? { [`text-${n.align}`]: !!n.align } : n.className
      ),
      onClick: t
    },
    s
  )) }) });
}
A.displayName = "SortableTableHead";
function B({
  onChangeSort: t
}) {
  const [a] = v(), [e] = $();
  return /* @__PURE__ */ l(A, { fields: a, currentSort: e, onChangeSort: t });
}
B.displayName = "SortableTableHeadWrapper";
function V({
  className: t,
  size: a,
  responsive: e,
  sticky: n,
  data: s,
  keyField: r,
  rowClassName: c,
  renderRow: u,
  onSelectRow: i,
  selected: d,
  tableHeadProps: o,
  children: b,
  tfoot: p,
  onChangeSort: f,
  ...N
}) {
  const T = m("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ h(P, { className: T, responsive: e, sticky: n, ...N, children: [
    /* @__PURE__ */ l(H, {}),
    /* @__PURE__ */ l(B, { onChangeSort: f, ...o }),
    !!s.length && /* @__PURE__ */ l(
      k,
      {
        data: s,
        keyField: r,
        rowClassName: c,
        renderRow: u,
        onSelectRow: i,
        selected: d
      }
    ),
    b,
    p
  ] });
}
V.displayName = "SortableTable";
function Y({ nextSort: t }) {
  const [, a] = $();
  return q(() => {
    console.log("setNextSort", t), a(t);
  }, [t, a]), null;
}
function Z({
  fields: t,
  currentSort: a,
  ...e
}) {
  return /* @__PURE__ */ h(x, { initialFields: t, initialSort: a, children: [
    /* @__PURE__ */ l(Y, { nextSort: a }),
    /* @__PURE__ */ l(V, { ...e })
  ] });
}
Z.displayName = "StandaloneSortableTable";
const z = [10, 25, 50, 100, 250, 500, 1e3];
function G({
  value: t,
  pageValues: a = z,
  size: e,
  label: n,
  className: s,
  onChange: r,
  ...c
}) {
  const u = K(), i = (b) => r(Number(b.target.value)), d = s ?? m("form-select", { [`form-select-${e}`]: !!e }), o = m("input-group", {
    [`input-group-${e}`]: !!e
  });
  return /* @__PURE__ */ h("div", { className: o, children: [
    /* @__PURE__ */ l("label", { className: "input-group-text", htmlFor: u, children: n ?? "Rows" }),
    /* @__PURE__ */ l(
      "select",
      {
        className: d,
        id: u,
        value: t,
        onChange: i,
        ...c,
        children: a.map((b) => /* @__PURE__ */ l("option", { value: b, children: b }, b))
      }
    )
  ] }, t);
}
G.displayName = "RowsPerPage";
function tt({
  page: t,
  rowsPerPage: a,
  onChangePage: e,
  count: n,
  size: s,
  showFirst: r,
  showLast: c,
  className: u,
  rowsPerPageProps: i,
  ...d
}) {
  const o = n === 0 ? 0 : t * a + 1, b = Math.min(t * a + a, n), p = a === 0 ? 0 : Math.floor((n - 1) / a), f = m("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ h("div", { className: m("row g-3 justify-content-end", u), ...d, children: [
    !!i && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(G, { ...i, value: a, size: s }) }),
    /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ h("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ h("div", { className: "col-auto", children: [
        o,
        "-",
        b,
        " of ",
        n
      ] }),
      r && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t === 0,
          onClick: () => e(0),
          "aria-label": "First page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t === 0,
          onClick: () => e(t - 1),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t >= p,
          onClick: () => e(t + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      c && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t >= p,
          onClick: () => e(p),
          "aria-label": "Last page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
tt.displayname = "TablePagination";
function H() {
  const [t] = v();
  return /* @__PURE__ */ l("colgroup", { children: t.filter((a) => a.visible !== !1).map((a, e) => /* @__PURE__ */ l(
    "col",
    {
      className: a.colClassName,
      span: a.colSpan ?? 1
    },
    e
  )) });
}
H.displayName = "DataTableCols";
function lt(t) {
  const a = S(y);
  if (!a)
    throw new Error("useField must be used within a DataTableProvider");
  return [
    a.fields.find((e) => e.id === t) ?? null,
    a.updateField
  ];
}
function st() {
  const t = S(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return t;
}
export {
  O as DataTable,
  H as DataTableCols,
  y as DataTableContext,
  x as DataTableProvider,
  M as DataTableRow,
  k as DataTableTBody,
  C as DataTableTH,
  _ as DataTableWithContext,
  G as RowsPerPage,
  V as SortableTable,
  A as SortableTableHead,
  W as SortableTableTH,
  Q as StandaloneDataTableRow,
  Z as StandaloneSortableTable,
  tt as TablePagination,
  lt as useField,
  st as useTableContext,
  v as useTableFields,
  $ as useTableSort
};
//# sourceMappingURL=index.es.js.map
