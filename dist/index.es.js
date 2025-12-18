import { jsx as l, jsxs as N } from "react/jsx-runtime";
import { createContext as G, useState as w, useCallback as v, useMemo as I, useContext as g, createElement as J, useId as L } from "react";
import C from "@emotion/styled";
const y = G(null);
function S({
  children: t,
  initialFields: a = [],
  initialSort: n = null
}) {
  const [e, s] = w(a), [o, i] = w(n), c = v(
    (h) => {
      s(h);
    },
    []
  ), r = v(
    (h) => {
      i(h);
    },
    []
  ), u = v((h, p) => {
    const f = e.map((T) => T.id === h ? { ...T, ...p } : T);
    s(f);
  }, [e]), d = v((h) => e.find((p) => p.id === h), [e]), m = I(
    () => ({
      fields: e,
      setFields: c,
      sort: o,
      setSort: r,
      getField: d,
      updateField: u
    }),
    [e, c, o, r, u, d]
  );
  return /* @__PURE__ */ l(y.Provider, { value: m, children: t });
}
S.displayName = "DataTableProvider";
function F(t) {
  var a, n, e = "";
  if (typeof t == "string" || typeof t == "number") e += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (a = 0; a < s; a++) t[a] && (n = F(t[a])) && (e && (e += " "), e += n);
  } else for (n in t) t[n] && (e && (e += " "), e += n);
  return e;
}
function b() {
  for (var t, a, n = 0, e = "", s = arguments.length; n < s; n++) (t = arguments[n]) && (a = F(t)) && (e && (e += " "), e += a);
  return e;
}
const H = C.table`
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
  children: n,
  className: e,
  ref: s,
  ...o
}) {
  if (a) {
    const i = b(e, {
      "table-responsive": a === !0,
      [`table-responsive-${a}`]: a !== !0
    });
    return /* @__PURE__ */ l("div", { className: i, children: /* @__PURE__ */ l(H, { ref: s, ...o, children: n }) });
  }
  return /* @__PURE__ */ l(H, { className: e, sticky: t, ref: s, ...o, children: n });
}
function D({
  field: t,
  className: a,
  children: n,
  ...e
}) {
  const s = b({ [`text-${t.align}`]: !!t.align }, a);
  return /* @__PURE__ */ l("th", { className: s, scope: "col", ...e, children: n ?? t.title });
}
D.displayName = "DataTableTH";
function x() {
  const t = g(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return [
    t.fields,
    t.setFields
  ];
}
function j({ ...t }) {
  const [a] = x();
  return /* @__PURE__ */ l("thead", { ...t, children: /* @__PURE__ */ l("tr", { children: a.map((n, e) => /* @__PURE__ */ l(
    D,
    {
      ...n.thProps,
      field: n,
      className: b(
        typeof n.className == "function" ? { [`text-${n.align}`]: !!n.align } : n.className
      )
    },
    String(n.id ?? e)
  )) }) });
}
j.displayName = "DataTableHead";
function E({
  className: t,
  size: a,
  responsive: n,
  sticky: e,
  data: s,
  keyField: o,
  rowClassName: i,
  renderRow: c,
  onSelectRow: r,
  selected: u,
  tableHeadProps: d,
  children: m,
  tfoot: h,
  ...p
}) {
  const f = b("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ N(P, { sticky: e, responsive: n, className: f, ...p, children: [
    /* @__PURE__ */ l(k, {}),
    /* @__PURE__ */ l(j, { ...d }),
    !!s.length && /* @__PURE__ */ l(
      $,
      {
        data: s,
        keyField: o,
        rowClassName: i,
        renderRow: c,
        onSelectRow: r,
        selected: u
      }
    ),
    m,
    h
  ] });
}
E.displayName = "DataTable";
function W({
  fields: t,
  ...a
}) {
  return /* @__PURE__ */ l(S, { initialFields: t, children: /* @__PURE__ */ l(E, { ...a }) });
}
W.displayName = "StandaloneDataTable";
function R({ field: t, row: a, className: n, as: e, ...s }) {
  const o = b(
    { [`text-${t.align}`]: !!t.align },
    n,
    typeof t.className == "function" ? t.className(a) : t.className
  );
  return J(
    e ?? t.as ?? "td",
    {
      className: o,
      scope: (e ?? t.as) === "th" ? "row" : void 0,
      colSpan: t.colSpan,
      ...t.cellProps,
      ...s
    },
    a[t.field] === void 0 && !t.render ? null : typeof t.render == "function" ? t.render(a) : a[t.field]
  );
}
R.displayName = "DataTableCell";
function M({
  className: t,
  rowClassName: a,
  selected: n,
  row: e,
  trRef: s,
  onClick: o,
  ...i
}) {
  const [c] = x(), r = (d) => {
    o?.(e, d);
  }, u = typeof a == "function" ? a(e) : a;
  return e ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: b({ "table-active": n }, t, u),
      onClick: r,
      ...i,
      children: c.map((d, m) => /* @__PURE__ */ l(R, { field: d, row: e }, String(d?.id ?? m)))
    }
  ) : null;
}
M.displayName = "DataTableRow";
function $({
  data: t,
  keyField: a,
  rowClassName: n,
  renderRow: e,
  onSelectRow: s,
  selected: o = "",
  children: i,
  ...c
}) {
  return /* @__PURE__ */ N("tbody", { ...c, children: [
    t.map((r) => {
      const u = String(typeof a == "function" ? a(r) : r[a]), d = typeof o == "function" ? o(r) : u === o;
      return e ? e(r) : /* @__PURE__ */ l(
        M,
        {
          onClick: s,
          rowClassName: n,
          row: r,
          selected: d
        },
        u
      );
    }),
    i
  ] });
}
$.displayName = "DataTableTBody";
const q = (t) => {
  if (!t)
    return "flex-start";
  switch (t) {
    case "end":
      return "flex-end";
    default:
      return "center";
  }
}, K = C.div`
    display: flex;
    width: 100%;
    flex-direction: ${(t) => t.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(t) => q(t.align)};

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
function _({
  field: t,
  sorted: a,
  ascending: n,
  className: e,
  onClick: s
}) {
  if (!t.sortable)
    return /* @__PURE__ */ l(D, { field: t, className: e });
  const { className: o, ...i } = t.thProps ?? {}, c = b(
    e,
    o,
    { [`text-${t.align}`]: !!t.align }
  ), r = () => {
    s({ field: t.field, ascending: a ? !n : !0 });
  }, u = {
    "bi-arrow-down": n,
    "bi-arrow-up": !n
  };
  return /* @__PURE__ */ l("th", { ...i, className: b("sortable", c), scope: "col", onClick: r, children: /* @__PURE__ */ N(K, { sorted: a, align: t.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: t.title }),
    /* @__PURE__ */ l("div", { className: b("me-1 sort-icon", u) })
  ] }) });
}
_.displayName = "SortableTableTH";
function O() {
  const t = g(y);
  if (!t)
    throw new Error("useTableSort must be used within a DataTableProvider");
  return [
    t.sort,
    t.setSort
  ];
}
function A({
  onChangeSort: t
}) {
  const [a] = x(), [n] = O();
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: a.map((e, s) => /* @__PURE__ */ l(
    _,
    {
      field: e,
      sorted: n?.field === e.field,
      ascending: n?.ascending,
      className: b(
        typeof e.className == "function" ? { [`text-${e.align}`]: !!e.align } : e.className
      ),
      onClick: t
    },
    s
  )) }) });
}
A.displayName = "SortableTableHead";
function B({
  className: t,
  size: a,
  responsive: n,
  sticky: e,
  data: s,
  keyField: o,
  rowClassName: i,
  renderRow: c,
  onSelectRow: r,
  selected: u,
  tableHeadProps: d,
  children: m,
  tfoot: h,
  onChangeSort: p,
  ...f
}) {
  const T = b("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ N(P, { className: T, responsive: n, sticky: e, ...f, children: [
    /* @__PURE__ */ l(k, {}),
    /* @__PURE__ */ l(A, { onChangeSort: p, ...d }),
    !!s.length && /* @__PURE__ */ l(
      $,
      {
        data: s,
        keyField: o,
        rowClassName: i,
        renderRow: c,
        onSelectRow: r,
        selected: u
      }
    ),
    m,
    h
  ] });
}
B.displayName = "SortableTable";
function Q({
  fields: t,
  currentSort: a,
  ...n
}) {
  return /* @__PURE__ */ l(S, { initialFields: t, initialSort: a, children: /* @__PURE__ */ l(B, { ...n }) });
}
Q.displayName = "StandaloneSortableTable";
const U = [10, 25, 50, 100, 250, 500, 1e3];
function V({
  value: t,
  pageValues: a = U,
  size: n,
  label: e,
  className: s,
  onChange: o,
  ...i
}) {
  const c = L(), r = (m) => o(Number(m.target.value)), u = s ?? b("form-select", { [`form-select-${n}`]: !!n }), d = b("input-group", {
    [`input-group-${n}`]: !!n
  });
  return /* @__PURE__ */ N("div", { className: d, children: [
    /* @__PURE__ */ l("label", { className: "input-group-text", htmlFor: c, children: e ?? "Rows" }),
    /* @__PURE__ */ l(
      "select",
      {
        className: u,
        id: c,
        value: t,
        onChange: r,
        ...i,
        children: a.map((m) => /* @__PURE__ */ l("option", { value: m, children: m }, m))
      }
    )
  ] }, t);
}
V.displayName = "RowsPerPage";
function X({
  page: t,
  rowsPerPage: a,
  onChangePage: n,
  count: e,
  size: s,
  showFirst: o,
  showLast: i,
  className: c,
  rowsPerPageProps: r,
  ...u
}) {
  const d = e === 0 ? 0 : t * a + 1, m = Math.min(t * a + a, e), h = a === 0 ? 0 : Math.floor((e - 1) / a), p = b("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ N("div", { className: b("row g-3 justify-content-end", c), ...u, children: [
    !!r && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(V, { ...r, value: a, size: s }) }),
    /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ N("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ N("div", { className: "col-auto", children: [
        d,
        "-",
        m,
        " of ",
        e
      ] }),
      o && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: t === 0,
          onClick: () => n(0),
          "aria-label": "First page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: t === 0,
          onClick: () => n(t - 1),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: t >= h,
          onClick: () => n(t + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      i && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: t >= h,
          onClick: () => n(h),
          "aria-label": "Last page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
X.displayname = "TablePagination";
const Y = C.col`
    &.col-collapsed {
        visibility: collapse;
    }
`;
function k() {
  const [t] = x();
  return /* @__PURE__ */ l("colgroup", { children: t.map((a, n) => /* @__PURE__ */ l(
    Y,
    {
      className: b(a.colClassName, { "col-collapsed": a.collapse }),
      span: a.colSpan ?? 1
    },
    n
  )) });
}
k.displayName = "DataTableCols";
function at(t) {
  const a = g(y);
  if (!a)
    throw new Error("useField must be used within a DataTableProvider");
  return [
    a.fields.find((n) => n.id === t) ?? null,
    a.updateField
  ];
}
function et() {
  const t = g(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return t;
}
export {
  W as DataTable,
  k as DataTableCols,
  y as DataTableContext,
  S as DataTableProvider,
  M as DataTableRow,
  $ as DataTableTBody,
  D as DataTableTH,
  E as DataTableWithContext,
  V as RowsPerPage,
  B as SortableTable,
  A as SortableTableHead,
  _ as SortableTableTH,
  Q as StandaloneSortableTable,
  X as TablePagination,
  at as useField,
  et as useTableContext,
  x as useTableFields,
  O as useTableSort
};
//# sourceMappingURL=index.es.js.map
