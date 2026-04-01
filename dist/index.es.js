import { jsx as l, Fragment as J, jsxs as h } from "react/jsx-runtime";
import { createElement as L, createContext as q, useState as R, useCallback as g, useMemo as K, useContext as C, useEffect as O, useId as Q } from "react";
import F from "@emotion/styled";
function E(t) {
  var e, n, a = "";
  if (typeof t == "string" || typeof t == "number") a += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (n = E(t[e])) && (a && (a += " "), a += n);
  } else for (n in t) t[n] && (a && (a += " "), a += n);
  return a;
}
function b() {
  for (var t, e, n = 0, a = "", s = arguments.length; n < s; n++) (t = arguments[n]) && (e = E(t)) && (a && (a += " "), a += e);
  return a;
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
  responsive: e,
  children: n,
  className: a,
  ref: s,
  ...r
}) {
  if (e) {
    const o = b(a, {
      "table-responsive": e === !0,
      [`table-responsive-${e}`]: e !== !0
    });
    return /* @__PURE__ */ l("div", { className: o, children: /* @__PURE__ */ l(w, { ref: s, ...r, children: n }) });
  }
  return /* @__PURE__ */ l(w, { className: a, sticky: t, ref: s, ...r, children: n });
}
function j({
  className: t,
  rowClassName: e,
  selected: n,
  row: a,
  trRef: s,
  onClick: r,
  children: o,
  ...c
}) {
  const i = (d) => {
    r?.(a, d);
  }, u = typeof e == "function" ? e(a) : e;
  return a ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: b({ "table-active": n }, t, u),
      onClick: i,
      ...c,
      children: o
    }
  ) : null;
}
j.displayName = "DataTableTR";
function x({ field: t, row: e, className: n, as: a, ...s }) {
  if (t.visible === !1)
    return null;
  const r = b(
    { [`text-${t.align}`]: !!t.align },
    n,
    typeof t.className == "function" ? t.className(e) : t.className
  );
  return L(
    a ?? t.as ?? "td",
    {
      className: r,
      scope: (a ?? t.as) === "th" ? "row" : void 0,
      colSpan: t.colSpan,
      ...t.cellProps,
      ...s
    },
    e[t.field] === void 0 && !t.render ? null : typeof t.render == "function" ? t.render(e) : e[t.field]
  );
}
x.displayName = "DataTableCell";
function U({ fields: t, row: e }) {
  return /* @__PURE__ */ l(J, { children: t.map((n, a) => /* @__PURE__ */ l(x, { field: n, row: e }, String(n?.id ?? a))) });
}
const y = q(null);
function S({
  children: t,
  initialFields: e = [],
  initialSort: n = null
}) {
  const [a, s] = R(e), [r, o] = R(n), c = g(
    (p) => {
      s(p);
    },
    []
  ), i = g(
    (p) => {
      o(p);
    },
    []
  ), u = g((p, f) => {
    const N = a.map((T) => T.id === p ? { ...T, ...f } : T);
    s(N);
  }, [a]), d = g((p) => a.find((f) => f.id === p), [a]), m = K(
    () => ({
      fields: a,
      setFields: c,
      sort: r,
      setSort: i,
      getField: d,
      updateField: u
    }),
    [a, c, r, i, u, d]
  );
  return /* @__PURE__ */ l(y.Provider, { value: m, children: t });
}
S.displayName = "DataTableProvider";
function D({
  field: t,
  className: e,
  children: n,
  ...a
}) {
  if (t.visible === !1)
    return null;
  const s = b({ [`text-${t.align}`]: !!t.align }, e);
  return /* @__PURE__ */ l("th", { className: s, scope: "col", ...a, children: n ?? t.title });
}
D.displayName = "DataTableTH";
function v() {
  const t = C(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return [
    t.fields,
    t.setFields
  ];
}
function _({ ...t }) {
  const [e] = v();
  return /* @__PURE__ */ l("thead", { ...t, children: /* @__PURE__ */ l("tr", { children: e.map((n, a) => /* @__PURE__ */ l(
    D,
    {
      ...n.thProps,
      field: n,
      className: b(
        typeof n.className == "function" ? { [`text-${n.align}`]: !!n.align } : n.className
      )
    },
    String(n.id ?? a)
  )) }) });
}
_.displayName = "DataTableHead";
function M({
  className: t,
  size: e,
  responsive: n,
  sticky: a,
  data: s,
  keyField: r,
  rowClassName: o,
  renderRow: c,
  onSelectRow: i,
  selected: u,
  tableHeadProps: d,
  children: m,
  tfoot: p,
  ...f
}) {
  const N = b("table", t, {
    [`table-${e}`]: !!e
  });
  return /* @__PURE__ */ h(P, { sticky: a, responsive: n, className: N, ...f, children: [
    /* @__PURE__ */ l(H, {}),
    /* @__PURE__ */ l(_, { ...d }),
    !!s.length && /* @__PURE__ */ l(
      k,
      {
        data: s,
        keyField: r,
        rowClassName: o,
        renderRow: c,
        onSelectRow: i,
        selected: u
      }
    ),
    m,
    p
  ] });
}
M.displayName = "ContainedDataTable";
function X({
  fields: t,
  ...e
}) {
  return /* @__PURE__ */ l(S, { initialFields: t, children: /* @__PURE__ */ l(M, { ...e }) });
}
X.displayName = "DataTable";
function A({
  className: t,
  rowClassName: e,
  selected: n,
  row: a,
  trRef: s,
  onClick: r,
  ...o
}) {
  const [c] = v(), i = (d) => {
    r?.(a, d);
  }, u = typeof e == "function" ? e(a) : e;
  return a ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: b({ "table-active": n }, t, u),
      onClick: i,
      ...o,
      children: c.map((d, m) => /* @__PURE__ */ l(x, { field: d, row: a }, String(d?.id ?? m)))
    }
  ) : null;
}
A.displayName = "ContainedDataTableRow";
function Y({
  fields: t,
  className: e,
  rowClassName: n,
  selected: a,
  row: s,
  trRef: r,
  onClick: o,
  ...c
}) {
  return /* @__PURE__ */ l(
    j,
    {
      className: e,
      rowClassName: n,
      row: s,
      selected: a,
      trRef: r,
      onClick: o,
      ...c,
      children: /* @__PURE__ */ l(U, { fields: t, row: s })
    }
  );
}
Y.displayName = "DataTableRow";
function k({
  data: t,
  keyField: e,
  rowClassName: n,
  renderRow: a,
  onSelectRow: s,
  selected: r = "",
  children: o,
  ...c
}) {
  return /* @__PURE__ */ h("tbody", { ...c, children: [
    t.map((i) => {
      const u = String(typeof e == "function" ? e(i) : i[e]), d = typeof r == "function" ? r(i) : u === r;
      return a ? a(i) : /* @__PURE__ */ l(
        A,
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
k.displayName = "DataTableTBody";
function $() {
  const t = C(y);
  if (!t)
    throw new Error("useTableSort must be used within a DataTableProvider");
  return [
    t.sort,
    t.setSort
  ];
}
const Z = (t) => t ? t === "end" ? "flex-end" : "center" : "flex-start", z = F.div`
    display: flex;
    width: 100%;
    flex-direction: ${(t) => t.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(t) => Z(t.align)};

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
function B({
  field: t,
  sorted: e,
  ascending: n,
  className: a,
  onClick: s
}) {
  if (t.visible === !1)
    return null;
  if (!t.sortable)
    return /* @__PURE__ */ l(D, { field: t, className: a });
  const { className: r, ...o } = t.thProps ?? {}, c = b(
    a,
    r,
    { [`text-${t.align}`]: !!t.align }
  ), i = () => {
    s({ field: t.field, ascending: e ? !n : !0 });
  }, u = {
    "bi-arrow-down": n,
    "bi-arrow-up": !n
  };
  return /* @__PURE__ */ l("th", { ...o, className: b("sortable", c), scope: "col", onClick: i, children: /* @__PURE__ */ h(z, { sorted: e, align: t.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: t.title }),
    /* @__PURE__ */ l("div", { className: b("me-1 sort-icon", u) })
  ] }) });
}
B.displayName = "SortableTableTH";
function V({
  onChangeSort: t
}) {
  const [e] = v(), [n] = $();
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: e.map((a, s) => /* @__PURE__ */ l(
    B,
    {
      field: a,
      sorted: n?.field === a.field,
      ascending: n?.ascending,
      className: b(
        typeof a.className == "function" ? { [`text-${a.align}`]: !!a.align } : a.className
      ),
      onClick: t
    },
    s
  )) }) });
}
V.displayName = "SortableTableHead";
function W({
  onChangeSort: t
}) {
  const [e] = v(), [n] = $();
  return /* @__PURE__ */ l(V, { fields: e, currentSort: n, onChangeSort: t });
}
W.displayName = "SortableTableHeadWrapper";
function G({
  className: t,
  size: e,
  responsive: n,
  sticky: a,
  data: s,
  keyField: r,
  rowClassName: o,
  renderRow: c,
  onSelectRow: i,
  selected: u,
  tableHeadProps: d,
  children: m,
  tfoot: p,
  onChangeSort: f,
  ...N
}) {
  const T = b("table", t, {
    [`table-${e}`]: !!e
  });
  return /* @__PURE__ */ h(P, { className: T, responsive: n, sticky: a, ...N, children: [
    /* @__PURE__ */ l(H, {}),
    /* @__PURE__ */ l(W, { onChangeSort: f, ...d }),
    !!s.length && /* @__PURE__ */ l(
      k,
      {
        data: s,
        keyField: r,
        rowClassName: o,
        renderRow: c,
        onSelectRow: i,
        selected: u
      }
    ),
    m,
    p
  ] });
}
G.displayName = "ContainedSortableTable";
function tt({ nextSort: t }) {
  const [, e] = $();
  return O(() => {
    console.log("setNextSort", t), e(t);
  }, [t, e]), null;
}
function et({
  fields: t,
  currentSort: e,
  ...n
}) {
  return /* @__PURE__ */ h(S, { initialFields: t, initialSort: e, children: [
    /* @__PURE__ */ l(tt, { nextSort: e }),
    /* @__PURE__ */ l(G, { ...n })
  ] });
}
et.displayName = "SortableTable";
const at = [10, 25, 50, 100, 250, 500, 1e3];
function I({
  value: t,
  pageValues: e = at,
  size: n,
  label: a,
  className: s,
  onChange: r,
  ...o
}) {
  const c = Q(), i = (m) => r(Number(m.target.value)), u = s ?? b("form-select", { [`form-select-${n}`]: !!n }), d = b("input-group", {
    [`input-group-${n}`]: !!n
  });
  return /* @__PURE__ */ h("div", { className: d, children: [
    /* @__PURE__ */ l("label", { className: "input-group-text", htmlFor: c, children: a ?? "Rows" }),
    /* @__PURE__ */ l(
      "select",
      {
        className: u,
        id: c,
        value: t,
        onChange: i,
        ...o,
        children: e.map((m) => /* @__PURE__ */ l("option", { value: m, children: m }, m))
      }
    )
  ] }, t);
}
I.displayName = "RowsPerPage";
function nt({
  page: t,
  rowsPerPage: e,
  onChangePage: n,
  count: a,
  size: s,
  showFirst: r,
  showLast: o,
  className: c,
  rowsPerPageProps: i,
  ...u
}) {
  const d = a === 0 ? 0 : t * e + 1, m = Math.min(t * e + e, a), p = e === 0 ? 0 : Math.floor((a - 1) / e), f = b("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ h("div", { className: b("row g-3 justify-content-end", c), ...u, children: [
    !!i && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(I, { ...i, value: e, size: s }) }),
    /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ h("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ h("div", { className: "col-auto", children: [
        d,
        "-",
        m,
        " of ",
        a
      ] }),
      r && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
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
          disabled: t >= p,
          onClick: () => n(t + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      o && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t >= p,
          onClick: () => n(p),
          "aria-label": "Last page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
nt.displayname = "TablePagination";
function H() {
  const [t] = v();
  return /* @__PURE__ */ l("colgroup", { children: t.filter((e) => e.visible !== !1).map((e, n) => /* @__PURE__ */ l(
    "col",
    {
      className: e.colClassName,
      span: e.colSpan ?? 1
    },
    n
  )) });
}
H.displayName = "DataTableCols";
function it(t) {
  const e = C(y);
  if (!e)
    throw new Error("useField must be used within a DataTableProvider");
  return [
    e.fields.find((n) => n.id === t) ?? null,
    e.updateField
  ];
}
function ot() {
  const t = C(y);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return t;
}
export {
  M as ContainedDataTable,
  A as ContainedDataTableRow,
  G as ContainedSortableTable,
  X as DataTable,
  x as DataTableCell,
  H as DataTableCols,
  y as DataTableContext,
  S as DataTableProvider,
  Y as DataTableRow,
  U as DataTableRowCellSet,
  k as DataTableTBody,
  D as DataTableTH,
  j as DataTableTR,
  I as RowsPerPage,
  et as SortableTable,
  V as SortableTableHead,
  B as SortableTableTH,
  P as Table,
  nt as TablePagination,
  it as useField,
  ot as useTableContext,
  v as useTableFields,
  $ as useTableSort
};
//# sourceMappingURL=index.es.js.map
