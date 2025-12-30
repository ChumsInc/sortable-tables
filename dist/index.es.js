import { jsx as l, jsxs as f } from "react/jsx-runtime";
import { createContext as I, useState as k, useCallback as v, useMemo as J, useContext as g, createElement as L, useEffect as W, useId as q } from "react";
import w from "@emotion/styled";
const y = I(null);
function S({
  children: t,
  initialFields: a = [],
  initialSort: n = null
}) {
  const [e, s] = k(a), [r, o] = k(n), c = v(
    (m) => {
      s(m);
    },
    []
  ), i = v(
    (m) => {
      o(m);
    },
    []
  ), u = v((m, p) => {
    const N = e.map((T) => T.id === m ? { ...T, ...p } : T);
    s(N);
  }, [e]), d = v((m) => e.find((p) => p.id === m), [e]), b = J(
    () => ({
      fields: e,
      setFields: c,
      sort: r,
      setSort: i,
      getField: d,
      updateField: u
    }),
    [e, c, r, i, u, d]
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
const H = w.table`
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
function E({
  sticky: t,
  responsive: a,
  children: n,
  className: e,
  ref: s,
  ...r
}) {
  if (a) {
    const o = h(e, {
      "table-responsive": a === !0,
      [`table-responsive-${a}`]: a !== !0
    });
    return /* @__PURE__ */ l("div", { className: o, children: /* @__PURE__ */ l(H, { ref: s, ...r, children: n }) });
  }
  return /* @__PURE__ */ l(H, { className: e, sticky: t, ref: s, ...r, children: n });
}
function C({
  field: t,
  className: a,
  children: n,
  ...e
}) {
  if (t.visible === !1)
    return null;
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
function P({ ...t }) {
  const [a] = x();
  return /* @__PURE__ */ l("thead", { ...t, children: /* @__PURE__ */ l("tr", { children: a.map((n, e) => /* @__PURE__ */ l(
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
P.displayName = "DataTableHead";
function j({
  className: t,
  size: a,
  responsive: n,
  sticky: e,
  data: s,
  keyField: r,
  rowClassName: o,
  renderRow: c,
  onSelectRow: i,
  selected: u,
  tableHeadProps: d,
  children: b,
  tfoot: m,
  ...p
}) {
  const N = h("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ f(E, { sticky: e, responsive: n, className: N, ...p, children: [
    /* @__PURE__ */ l($, {}),
    /* @__PURE__ */ l(P, { ...d }),
    !!s.length && /* @__PURE__ */ l(
      D,
      {
        data: s,
        keyField: r,
        rowClassName: o,
        renderRow: c,
        onSelectRow: i,
        selected: u
      }
    ),
    b,
    m
  ] });
}
j.displayName = "DataTable";
function K({
  fields: t,
  ...a
}) {
  return /* @__PURE__ */ l(S, { initialFields: t, children: /* @__PURE__ */ l(j, { ...a }) });
}
K.displayName = "StandaloneDataTable";
function R({ field: t, row: a, className: n, as: e, ...s }) {
  if (t.visible === !1)
    return null;
  const r = h(
    { [`text-${t.align}`]: !!t.align },
    n,
    typeof t.className == "function" ? t.className(a) : t.className
  );
  return L(
    e ?? t.as ?? "td",
    {
      className: r,
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
  onClick: r,
  ...o
}) {
  const [c] = x(), i = (d) => {
    r?.(e, d);
  }, u = typeof a == "function" ? a(e) : a;
  return e ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: h({ "table-active": n }, t, u),
      onClick: i,
      ...o,
      children: c.map((d, b) => /* @__PURE__ */ l(R, { field: d, row: e }, String(d?.id ?? b)))
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
  selected: r = "",
  children: o,
  ...c
}) {
  return /* @__PURE__ */ f("tbody", { ...c, children: [
    t.map((i) => {
      const u = String(typeof a == "function" ? a(i) : i[a]), d = typeof r == "function" ? r(i) : u === r;
      return e ? e(i) : /* @__PURE__ */ l(
        M,
        {
          onClick: s,
          rowClassName: n,
          row: i,
          selected: d
        },
        u
      );
    }),
    o
  ] });
}
D.displayName = "DataTableTBody";
const O = (t) => {
  if (!t)
    return "flex-start";
  switch (t) {
    case "end":
      return "flex-end";
    default:
      return "center";
  }
}, Q = w.div`
    display: flex;
    width: 100%;
    flex-direction: ${(t) => t.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(t) => O(t.align)};

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
  if (t.visible === !1)
    return null;
  if (!t.sortable)
    return /* @__PURE__ */ l(C, { field: t, className: e });
  const { className: r, ...o } = t.thProps ?? {}, c = h(
    e,
    r,
    { [`text-${t.align}`]: !!t.align }
  ), i = () => {
    s({ field: t.field, ascending: a ? !n : !0 });
  }, u = {
    "bi-arrow-down": n,
    "bi-arrow-up": !n
  };
  return /* @__PURE__ */ l("th", { ...o, className: h("sortable", c), scope: "col", onClick: i, children: /* @__PURE__ */ f(Q, { sorted: a, align: t.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: t.title }),
    /* @__PURE__ */ l("div", { className: h("me-1 sort-icon", u) })
  ] }) });
}
_.displayName = "SortableTableTH";
function A() {
  const t = g(y);
  if (!t)
    throw new Error("useTableSort must be used within a DataTableProvider");
  return [
    t.sort,
    t.setSort
  ];
}
function B({
  onChangeSort: t
}) {
  const [a] = x(), [n] = A();
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: a.map((e, s) => /* @__PURE__ */ l(
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
B.displayName = "SortableTableHead";
function V({
  className: t,
  size: a,
  responsive: n,
  sticky: e,
  data: s,
  keyField: r,
  rowClassName: o,
  renderRow: c,
  onSelectRow: i,
  selected: u,
  tableHeadProps: d,
  children: b,
  tfoot: m,
  onChangeSort: p,
  ...N
}) {
  const T = h("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ f(E, { className: T, responsive: n, sticky: e, ...N, children: [
    /* @__PURE__ */ l($, {}),
    /* @__PURE__ */ l(B, { onChangeSort: p, ...d }),
    !!s.length && /* @__PURE__ */ l(
      D,
      {
        data: s,
        keyField: r,
        rowClassName: o,
        renderRow: c,
        onSelectRow: i,
        selected: u
      }
    ),
    b,
    m
  ] });
}
V.displayName = "SortableTable";
function U({ nextSort: t }) {
  const [, a] = A();
  return W(() => {
    a(t);
  }, [t, a]), null;
}
function X({
  fields: t,
  currentSort: a,
  ...n
}) {
  return /* @__PURE__ */ f(S, { initialFields: t, initialSort: a, children: [
    /* @__PURE__ */ l(U, { nextSort: a }),
    /* @__PURE__ */ l(V, { ...n })
  ] });
}
X.displayName = "StandaloneSortableTable";
const Y = [10, 25, 50, 100, 250, 500, 1e3];
function G({
  value: t,
  pageValues: a = Y,
  size: n,
  label: e,
  className: s,
  onChange: r,
  ...o
}) {
  const c = q(), i = (b) => r(Number(b.target.value)), u = s ?? h("form-select", { [`form-select-${n}`]: !!n }), d = h("input-group", {
    [`input-group-${n}`]: !!n
  });
  return /* @__PURE__ */ f("div", { className: d, children: [
    /* @__PURE__ */ l("label", { className: "input-group-text", htmlFor: c, children: e ?? "Rows" }),
    /* @__PURE__ */ l(
      "select",
      {
        className: u,
        id: c,
        value: t,
        onChange: i,
        ...o,
        children: a.map((b) => /* @__PURE__ */ l("option", { value: b, children: b }, b))
      }
    )
  ] }, t);
}
G.displayName = "RowsPerPage";
function Z({
  page: t,
  rowsPerPage: a,
  onChangePage: n,
  count: e,
  size: s,
  showFirst: r,
  showLast: o,
  className: c,
  rowsPerPageProps: i,
  ...u
}) {
  const d = e === 0 ? 0 : t * a + 1, b = Math.min(t * a + a, e), m = a === 0 ? 0 : Math.floor((e - 1) / a), p = h("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ f("div", { className: h("row g-3 justify-content-end", c), ...u, children: [
    !!i && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(G, { ...i, value: a, size: s }) }),
    /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ f("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ f("div", { className: "col-auto", children: [
        d,
        "-",
        b,
        " of ",
        e
      ] }),
      r && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
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
          disabled: t >= m,
          onClick: () => n(t + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      o && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: t >= m,
          onClick: () => n(m),
          "aria-label": "Last page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
Z.displayname = "TablePagination";
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
function et(t) {
  const a = g(y);
  if (!a)
    throw new Error("useField must be used within a DataTableProvider");
  return [
    a.fields.find((n) => n.id === t) ?? null,
    a.updateField
  ];
}
function nt() {
  const t = g(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return t;
}
export {
  K as DataTable,
  $ as DataTableCols,
  y as DataTableContext,
  S as DataTableProvider,
  M as DataTableRow,
  D as DataTableTBody,
  C as DataTableTH,
  j as DataTableWithContext,
  G as RowsPerPage,
  V as SortableTable,
  B as SortableTableHead,
  _ as SortableTableTH,
  X as StandaloneSortableTable,
  Z as TablePagination,
  et as useField,
  nt as useTableContext,
  x as useTableFields,
  A as useTableSort
};
//# sourceMappingURL=index.es.js.map
