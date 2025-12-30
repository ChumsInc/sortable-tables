import { jsx as l, jsxs as f } from "react/jsx-runtime";
import { createContext as I, useState as H, useCallback as g, useMemo as J, useContext as S, createElement as L, useEffect as q, useId as K } from "react";
import F from "@emotion/styled";
const y = I(null);
function x({
  children: t,
  initialFields: a = [],
  initialSort: e = null
}) {
  const [n, s] = H(a), [r, i] = H(e), c = g(
    (m) => {
      s(m);
    },
    []
  ), o = g(
    (m) => {
      i(m);
    },
    []
  ), u = g((m, h) => {
    const N = n.map((T) => T.id === m ? { ...T, ...h } : T);
    s(N);
  }, [n]), d = g((m) => n.find((h) => h.id === m), [n]), b = J(
    () => ({
      fields: n,
      setFields: c,
      sort: r,
      setSort: o,
      getField: d,
      updateField: u
    }),
    [n, c, r, o, u, d]
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
function p() {
  for (var t, a, e = 0, n = "", s = arguments.length; e < s; e++) (t = arguments[e]) && (a = E(t)) && (n && (n += " "), n += a);
  return n;
}
const w = F.table`
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
    const i = p(n, {
      "table-responsive": a === !0,
      [`table-responsive-${a}`]: a !== !0
    });
    return /* @__PURE__ */ l("div", { className: i, children: /* @__PURE__ */ l(w, { ref: s, ...r, children: e }) });
  }
  return /* @__PURE__ */ l(w, { className: n, sticky: t, ref: s, ...r, children: e });
}
function C({
  field: t,
  className: a,
  children: e,
  ...n
}) {
  if (t.visible === !1)
    return null;
  const s = p({ [`text-${t.align}`]: !!t.align }, a);
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
      className: p(
        typeof e.className == "function" ? { [`text-${e.align}`]: !!e.align } : e.className
      )
    },
    String(e.id ?? n)
  )) }) });
}
j.displayName = "DataTableHead";
function R({
  className: t,
  size: a,
  responsive: e,
  sticky: n,
  data: s,
  keyField: r,
  rowClassName: i,
  renderRow: c,
  onSelectRow: o,
  selected: u,
  tableHeadProps: d,
  children: b,
  tfoot: m,
  ...h
}) {
  const N = p("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ f(P, { sticky: n, responsive: e, className: N, ...h, children: [
    /* @__PURE__ */ l(k, {}),
    /* @__PURE__ */ l(j, { ...d }),
    !!s.length && /* @__PURE__ */ l(
      D,
      {
        data: s,
        keyField: r,
        rowClassName: i,
        renderRow: c,
        onSelectRow: o,
        selected: u
      }
    ),
    b,
    m
  ] });
}
R.displayName = "DataTable";
function O({
  fields: t,
  ...a
}) {
  return /* @__PURE__ */ l(x, { initialFields: t, children: /* @__PURE__ */ l(R, { ...a }) });
}
O.displayName = "StandaloneDataTable";
function M({ field: t, row: a, className: e, as: n, ...s }) {
  if (t.visible === !1)
    return null;
  const r = p(
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
M.displayName = "DataTableCell";
function W({
  className: t,
  rowClassName: a,
  selected: e,
  row: n,
  trRef: s,
  onClick: r,
  ...i
}) {
  const [c] = v(), o = (d) => {
    r?.(n, d);
  }, u = typeof a == "function" ? a(n) : a;
  return n ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: p({ "table-active": e }, t, u),
      onClick: o,
      ...i,
      children: c.map((d, b) => /* @__PURE__ */ l(M, { field: d, row: n }, String(d?.id ?? b)))
    }
  ) : null;
}
W.displayName = "DataTableRow";
function D({
  data: t,
  keyField: a,
  rowClassName: e,
  renderRow: n,
  onSelectRow: s,
  selected: r = "",
  children: i,
  ...c
}) {
  return /* @__PURE__ */ f("tbody", { ...c, children: [
    t.map((o) => {
      const u = String(typeof a == "function" ? a(o) : o[a]), d = typeof r == "function" ? r(o) : u === r;
      return n ? n(o) : /* @__PURE__ */ l(
        W,
        {
          onClick: s,
          rowClassName: e,
          row: o,
          selected: d
        },
        u
      );
    }),
    i
  ] });
}
D.displayName = "DataTableTBody";
function $() {
  const t = S(y);
  if (!t)
    throw new Error("useTableSort must be used within a DataTableProvider");
  return [
    t.sort,
    t.setSort
  ];
}
const Q = (t) => {
  if (!t)
    return "flex-start";
  switch (t) {
    case "end":
      return "flex-end";
    default:
      return "center";
  }
}, U = F.div`
    display: flex;
    width: 100%;
    flex-direction: ${(t) => t.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(t) => Q(t.align)};

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
  ascending: e,
  className: n,
  onClick: s
}) {
  if (t.visible === !1)
    return null;
  if (!t.sortable)
    return /* @__PURE__ */ l(C, { field: t, className: n });
  const { className: r, ...i } = t.thProps ?? {}, c = p(
    n,
    r,
    { [`text-${t.align}`]: !!t.align }
  ), o = () => {
    s({ field: t.field, ascending: a ? !e : !0 });
  }, u = {
    "bi-arrow-down": e,
    "bi-arrow-up": !e
  };
  return /* @__PURE__ */ l("th", { ...i, className: p("sortable", c), scope: "col", onClick: o, children: /* @__PURE__ */ f(U, { sorted: a, align: t.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: t.title }),
    /* @__PURE__ */ l("div", { className: p("me-1 sort-icon", u) })
  ] }) });
}
_.displayName = "SortableTableTH";
function A({
  onChangeSort: t
}) {
  const [a] = v(), [e] = $();
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: a.map((n, s) => /* @__PURE__ */ l(
    _,
    {
      field: n,
      sorted: e?.field === n.field,
      ascending: e?.ascending,
      className: p(
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
  rowClassName: i,
  renderRow: c,
  onSelectRow: o,
  selected: u,
  tableHeadProps: d,
  children: b,
  tfoot: m,
  onChangeSort: h,
  ...N
}) {
  const T = p("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ f(P, { className: T, responsive: e, sticky: n, ...N, children: [
    /* @__PURE__ */ l(k, {}),
    /* @__PURE__ */ l(B, { onChangeSort: h, ...d }),
    !!s.length && /* @__PURE__ */ l(
      D,
      {
        data: s,
        keyField: r,
        rowClassName: i,
        renderRow: c,
        onSelectRow: o,
        selected: u
      }
    ),
    b,
    m
  ] });
}
V.displayName = "SortableTable";
function X({ nextSort: t }) {
  const [, a] = $();
  return q(() => {
    console.log("setNextSort", t), a(t);
  }, [t, a]), /* @__PURE__ */ l("div", { className: "text-danger", children: "Sort Helper..." });
}
function Y({
  fields: t,
  currentSort: a,
  ...e
}) {
  return /* @__PURE__ */ f(x, { initialFields: t, initialSort: a, children: [
    /* @__PURE__ */ l(X, { nextSort: a }),
    /* @__PURE__ */ l(V, { ...e })
  ] });
}
Y.displayName = "StandaloneSortableTable";
const Z = [10, 25, 50, 100, 250, 500, 1e3];
function G({
  value: t,
  pageValues: a = Z,
  size: e,
  label: n,
  className: s,
  onChange: r,
  ...i
}) {
  const c = K(), o = (b) => r(Number(b.target.value)), u = s ?? p("form-select", { [`form-select-${e}`]: !!e }), d = p("input-group", {
    [`input-group-${e}`]: !!e
  });
  return /* @__PURE__ */ f("div", { className: d, children: [
    /* @__PURE__ */ l("label", { className: "input-group-text", htmlFor: c, children: n ?? "Rows" }),
    /* @__PURE__ */ l(
      "select",
      {
        className: u,
        id: c,
        value: t,
        onChange: o,
        ...i,
        children: a.map((b) => /* @__PURE__ */ l("option", { value: b, children: b }, b))
      }
    )
  ] }, t);
}
G.displayName = "RowsPerPage";
function z({
  page: t,
  rowsPerPage: a,
  onChangePage: e,
  count: n,
  size: s,
  showFirst: r,
  showLast: i,
  className: c,
  rowsPerPageProps: o,
  ...u
}) {
  const d = n === 0 ? 0 : t * a + 1, b = Math.min(t * a + a, n), m = a === 0 ? 0 : Math.floor((n - 1) / a), h = p("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ f("div", { className: p("row g-3 justify-content-end", c), ...u, children: [
    !!o && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(G, { ...o, value: a, size: s }) }),
    /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ f("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ f("div", { className: "col-auto", children: [
        d,
        "-",
        b,
        " of ",
        n
      ] }),
      r && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: h,
          disabled: t === 0,
          onClick: () => e(0),
          "aria-label": "First page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: h,
          disabled: t === 0,
          onClick: () => e(t - 1),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: h,
          disabled: t >= m,
          onClick: () => e(t + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      i && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: h,
          disabled: t >= m,
          onClick: () => e(m),
          "aria-label": "Last page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
z.displayname = "TablePagination";
function k() {
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
k.displayName = "DataTableCols";
function nt(t) {
  const a = S(y);
  if (!a)
    throw new Error("useField must be used within a DataTableProvider");
  return [
    a.fields.find((e) => e.id === t) ?? null,
    a.updateField
  ];
}
function lt() {
  const t = S(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return t;
}
export {
  O as DataTable,
  k as DataTableCols,
  y as DataTableContext,
  x as DataTableProvider,
  W as DataTableRow,
  D as DataTableTBody,
  C as DataTableTH,
  R as DataTableWithContext,
  G as RowsPerPage,
  V as SortableTable,
  A as SortableTableHead,
  _ as SortableTableTH,
  Y as StandaloneSortableTable,
  z as TablePagination,
  nt as useField,
  lt as useTableContext,
  v as useTableFields,
  $ as useTableSort
};
//# sourceMappingURL=index.es.js.map
