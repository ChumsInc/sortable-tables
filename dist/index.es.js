import { jsx as l, jsxs as p } from "react/jsx-runtime";
import { createContext as G, useState as k, useCallback as v, useMemo as I, useContext as g, createElement as J, useId as L } from "react";
import H from "@emotion/styled";
const y = G(null);
function S({
  children: t,
  initialFields: a = [],
  initialSort: n = null
}) {
  const [e, s] = k(a), [i, c] = k(n), u = v(
    (m) => {
      s(m);
    },
    []
  ), r = v(
    (m) => {
      c(m);
    },
    []
  ), d = v((m, f) => {
    const N = e.map((T) => T.id === m ? { ...T, ...f } : T);
    s(N);
  }, [e]), o = v((m) => e.find((f) => f.id === m), [e]), b = I(
    () => ({
      fields: e,
      setFields: u,
      sort: i,
      setSort: r,
      getField: o,
      updateField: d
    }),
    [e, u, i, r, d, o]
  );
  return /* @__PURE__ */ l(y.Provider, { value: b, children: t });
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
function h() {
  for (var t, a, n = 0, e = "", s = arguments.length; n < s; n++) (t = arguments[n]) && (a = F(t)) && (e && (e += " "), e += a);
  return e;
}
const w = H.table`
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
  ...i
}) {
  if (a) {
    const c = h(e, {
      "table-responsive": a === !0,
      [`table-responsive-${a}`]: a !== !0
    });
    return /* @__PURE__ */ l("div", { className: c, children: /* @__PURE__ */ l(w, { ref: s, ...i, children: n }) });
  }
  return /* @__PURE__ */ l(w, { className: e, sticky: t, ref: s, ...i, children: n });
}
function C({
  field: t,
  className: a,
  children: n,
  ...e
}) {
  const s = h({ [`text-${t.align}`]: !!t.align }, a);
  return /* @__PURE__ */ l("th", { className: s, scope: "col", ...e, children: n ?? t.title });
}
C.displayName = "DataTableTH";
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
  return /* @__PURE__ */ l("thead", { ...t, children: /* @__PURE__ */ l("tr", { children: a.filter((n) => n.visible !== !1).map((n, e) => /* @__PURE__ */ l(
    C,
    {
      ...n.thProps,
      field: n,
      className: h(
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
  keyField: i,
  rowClassName: c,
  renderRow: u,
  onSelectRow: r,
  selected: d,
  tableHeadProps: o,
  children: b,
  tfoot: m,
  ...f
}) {
  const N = h("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ p(P, { sticky: e, responsive: n, className: N, ...f, children: [
    /* @__PURE__ */ l($, {}),
    /* @__PURE__ */ l(j, { ...o }),
    !!s.length && /* @__PURE__ */ l(
      D,
      {
        data: s,
        keyField: i,
        rowClassName: c,
        renderRow: u,
        onSelectRow: r,
        selected: d
      }
    ),
    b,
    m
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
  const i = h(
    { [`text-${t.align}`]: !!t.align },
    n,
    typeof t.className == "function" ? t.className(a) : t.className
  );
  return J(
    e ?? t.as ?? "td",
    {
      className: i,
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
  onClick: i,
  ...c
}) {
  const [u] = x(), r = (o) => {
    i?.(e, o);
  }, d = typeof a == "function" ? a(e) : a;
  return e ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: h({ "table-active": n }, t, d),
      onClick: r,
      ...c,
      children: u.filter((o) => o.visible !== !1).map((o, b) => /* @__PURE__ */ l(R, { field: o, row: e }, String(o?.id ?? b)))
    }
  ) : null;
}
M.displayName = "DataTableRow";
function D({
  data: t,
  keyField: a,
  rowClassName: n,
  renderRow: e,
  onSelectRow: s,
  selected: i = "",
  children: c,
  ...u
}) {
  return /* @__PURE__ */ p("tbody", { ...u, children: [
    t.map((r) => {
      const d = String(typeof a == "function" ? a(r) : r[a]), o = typeof i == "function" ? i(r) : d === i;
      return e ? e(r) : /* @__PURE__ */ l(
        M,
        {
          onClick: s,
          rowClassName: n,
          row: r,
          selected: o
        },
        d
      );
    }),
    c
  ] });
}
D.displayName = "DataTableTBody";
const q = (t) => {
  if (!t)
    return "flex-start";
  switch (t) {
    case "end":
      return "flex-end";
    default:
      return "center";
  }
}, K = H.div`
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
    return /* @__PURE__ */ l(C, { field: t, className: e });
  const { className: i, ...c } = t.thProps ?? {}, u = h(
    e,
    i,
    { [`text-${t.align}`]: !!t.align }
  ), r = () => {
    s({ field: t.field, ascending: a ? !n : !0 });
  }, d = {
    "bi-arrow-down": n,
    "bi-arrow-up": !n
  };
  return /* @__PURE__ */ l("th", { ...c, className: h("sortable", u), scope: "col", onClick: r, children: /* @__PURE__ */ p(K, { sorted: a, align: t.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: t.title }),
    /* @__PURE__ */ l("div", { className: h("me-1 sort-icon", d) })
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
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: a.filter((e) => e.visible !== !1).map((e, s) => /* @__PURE__ */ l(
    _,
    {
      field: e,
      sorted: n?.field === e.field,
      ascending: n?.ascending,
      className: h(
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
  keyField: i,
  rowClassName: c,
  renderRow: u,
  onSelectRow: r,
  selected: d,
  tableHeadProps: o,
  children: b,
  tfoot: m,
  onChangeSort: f,
  ...N
}) {
  const T = h("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ p(P, { className: T, responsive: n, sticky: e, ...N, children: [
    /* @__PURE__ */ l($, {}),
    /* @__PURE__ */ l(A, { onChangeSort: f, ...o }),
    !!s.length && /* @__PURE__ */ l(
      D,
      {
        data: s,
        keyField: i,
        rowClassName: c,
        renderRow: u,
        onSelectRow: r,
        selected: d
      }
    ),
    b,
    m
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
  onChange: i,
  ...c
}) {
  const u = L(), r = (b) => i(Number(b.target.value)), d = s ?? h("form-select", { [`form-select-${n}`]: !!n }), o = h("input-group", {
    [`input-group-${n}`]: !!n
  });
  return /* @__PURE__ */ p("div", { className: o, children: [
    /* @__PURE__ */ l("label", { className: "input-group-text", htmlFor: u, children: e ?? "Rows" }),
    /* @__PURE__ */ l(
      "select",
      {
        className: d,
        id: u,
        value: t,
        onChange: r,
        ...c,
        children: a.map((b) => /* @__PURE__ */ l("option", { value: b, children: b }, b))
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
  showFirst: i,
  showLast: c,
  className: u,
  rowsPerPageProps: r,
  ...d
}) {
  const o = e === 0 ? 0 : t * a + 1, b = Math.min(t * a + a, e), m = a === 0 ? 0 : Math.floor((e - 1) / a), f = h("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ p("div", { className: h("row g-3 justify-content-end", u), ...d, children: [
    !!r && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(V, { ...r, value: a, size: s }) }),
    /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ p("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ p("div", { className: "col-auto", children: [
        o,
        "-",
        b,
        " of ",
        e
      ] }),
      i && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t === 0,
          onClick: () => n(0),
          "aria-label": "First page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t === 0,
          onClick: () => n(t - 1),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t >= m,
          onClick: () => n(t + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      c && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t >= m,
          onClick: () => n(m),
          "aria-label": "Last page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
X.displayname = "TablePagination";
function $() {
  const [t] = x();
  return /* @__PURE__ */ l("colgroup", { children: t.filter((a) => a.visible !== !1).map((a, n) => /* @__PURE__ */ l(
    "col",
    {
      className: a.colClassName,
      span: a.colSpan ?? 1
    },
    n
  )) });
}
$.displayName = "DataTableCols";
function tt(t) {
  const a = g(y);
  if (!a)
    throw new Error("useField must be used within a DataTableProvider");
  return [
    a.fields.find((n) => n.id === t) ?? null,
    a.updateField
  ];
}
function at() {
  const t = g(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return t;
}
export {
  W as DataTable,
  $ as DataTableCols,
  y as DataTableContext,
  S as DataTableProvider,
  M as DataTableRow,
  D as DataTableTBody,
  C as DataTableTH,
  E as DataTableWithContext,
  V as RowsPerPage,
  B as SortableTable,
  A as SortableTableHead,
  _ as SortableTableTH,
  Q as StandaloneSortableTable,
  X as TablePagination,
  tt as useField,
  at as useTableContext,
  x as useTableFields,
  O as useTableSort
};
//# sourceMappingURL=index.es.js.map
