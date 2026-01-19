import { jsx as l, jsxs as h } from "react/jsx-runtime";
import { createContext as I, useState as w, useCallback as g, useMemo as J, useContext as C, createElement as L, useEffect as q, useId as K } from "react";
import R from "@emotion/styled";
const T = I(null);
function x({
  children: t,
  initialFields: e = [],
  initialSort: a = null
}) {
  const [n, s] = w(e), [r, c] = w(a), u = g(
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
    const N = n.map((y) => y.id === p ? { ...y, ...f } : y);
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
  return /* @__PURE__ */ l(T.Provider, { value: b, children: t });
}
x.displayName = "DataTableProvider";
function E(t) {
  var e, a, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (a = E(t[e])) && (n && (n += " "), n += a);
  } else for (a in t) t[a] && (n && (n += " "), n += a);
  return n;
}
function m() {
  for (var t, e, a = 0, n = "", s = arguments.length; a < s; a++) (t = arguments[a]) && (e = E(t)) && (n && (n += " "), n += e);
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
  responsive: e,
  children: a,
  className: n,
  ref: s,
  ...r
}) {
  if (e) {
    const c = m(n, {
      "table-responsive": e === !0,
      [`table-responsive-${e}`]: e !== !0
    });
    return /* @__PURE__ */ l("div", { className: c, children: /* @__PURE__ */ l(F, { ref: s, ...r, children: a }) });
  }
  return /* @__PURE__ */ l(F, { className: n, sticky: t, ref: s, ...r, children: a });
}
function S({
  field: t,
  className: e,
  children: a,
  ...n
}) {
  if (t.visible === !1)
    return null;
  const s = m({ [`text-${t.align}`]: !!t.align }, e);
  return /* @__PURE__ */ l("th", { className: s, scope: "col", ...n, children: a ?? t.title });
}
S.displayName = "DataTableTH";
function v() {
  const t = C(T);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return [
    t.fields,
    t.setFields
  ];
}
function j({ ...t }) {
  const [e] = v();
  return /* @__PURE__ */ l("thead", { ...t, children: /* @__PURE__ */ l("tr", { children: e.map((a, n) => /* @__PURE__ */ l(
    S,
    {
      ...a.thProps,
      field: a,
      className: m(
        typeof a.className == "function" ? { [`text-${a.align}`]: !!a.align } : a.className
      )
    },
    String(a.id ?? n)
  )) }) });
}
j.displayName = "DataTableHead";
function _({
  className: t,
  size: e,
  responsive: a,
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
    [`table-${e}`]: !!e
  });
  return /* @__PURE__ */ h(P, { sticky: n, responsive: a, className: N, ...f, children: [
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
_.displayName = "ContainedDataTable";
function O({
  fields: t,
  ...e
}) {
  return /* @__PURE__ */ l(x, { initialFields: t, children: /* @__PURE__ */ l(_, { ...e }) });
}
O.displayName = "DataTable";
function D({ field: t, row: e, className: a, as: n, ...s }) {
  if (t.visible === !1)
    return null;
  const r = m(
    { [`text-${t.align}`]: !!t.align },
    a,
    typeof t.className == "function" ? t.className(e) : t.className
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
    e[t.field] === void 0 && !t.render ? null : typeof t.render == "function" ? t.render(e) : e[t.field]
  );
}
D.displayName = "DataTableCell";
function M({
  className: t,
  rowClassName: e,
  selected: a,
  row: n,
  trRef: s,
  onClick: r,
  ...c
}) {
  const [u] = v(), i = (o) => {
    r?.(n, o);
  }, d = typeof e == "function" ? e(n) : e;
  return n ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: m({ "table-active": a }, t, d),
      onClick: i,
      ...c,
      children: u.map((o, b) => /* @__PURE__ */ l(D, { field: o, row: n }, String(o?.id ?? b)))
    }
  ) : null;
}
M.displayName = "ContainedDataTableRow";
function Q({
  fields: t,
  className: e,
  rowClassName: a,
  selected: n,
  row: s,
  trRef: r,
  onClick: c,
  ...u
}) {
  const i = (o) => {
    c?.(s, o);
  }, d = typeof a == "function" ? a(s) : a;
  return s ? /* @__PURE__ */ l(
    "tr",
    {
      ref: r,
      className: m({ "table-active": n }, e, d),
      onClick: i,
      ...u,
      children: t.map((o, b) => /* @__PURE__ */ l(D, { field: o, row: s }, String(o?.id ?? b)))
    }
  ) : null;
}
Q.displayName = "DataTableRow";
function k({
  data: t,
  keyField: e,
  rowClassName: a,
  renderRow: n,
  onSelectRow: s,
  selected: r = "",
  children: c,
  ...u
}) {
  return /* @__PURE__ */ h("tbody", { ...u, children: [
    t.map((i) => {
      const d = String(typeof e == "function" ? e(i) : i[e]), o = typeof r == "function" ? r(i) : d === r;
      return n ? n(i) : /* @__PURE__ */ l(
        M,
        {
          onClick: s,
          rowClassName: a,
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
  const t = C(T);
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
function A({
  field: t,
  sorted: e,
  ascending: a,
  className: n,
  onClick: s
}) {
  if (t.visible === !1)
    return null;
  if (!t.sortable)
    return /* @__PURE__ */ l(S, { field: t, className: n });
  const { className: r, ...c } = t.thProps ?? {}, u = m(
    n,
    r,
    { [`text-${t.align}`]: !!t.align }
  ), i = () => {
    s({ field: t.field, ascending: e ? !a : !0 });
  }, d = {
    "bi-arrow-down": a,
    "bi-arrow-up": !a
  };
  return /* @__PURE__ */ l("th", { ...c, className: m("sortable", u), scope: "col", onClick: i, children: /* @__PURE__ */ h(X, { sorted: e, align: t.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: t.title }),
    /* @__PURE__ */ l("div", { className: m("me-1 sort-icon", d) })
  ] }) });
}
A.displayName = "SortableTableTH";
function B({
  onChangeSort: t
}) {
  const [e] = v(), [a] = $();
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: e.map((n, s) => /* @__PURE__ */ l(
    A,
    {
      field: n,
      sorted: a?.field === n.field,
      ascending: a?.ascending,
      className: m(
        typeof n.className == "function" ? { [`text-${n.align}`]: !!n.align } : n.className
      ),
      onClick: t
    },
    s
  )) }) });
}
B.displayName = "SortableTableHead";
function V({
  onChangeSort: t
}) {
  const [e] = v(), [a] = $();
  return /* @__PURE__ */ l(B, { fields: e, currentSort: a, onChangeSort: t });
}
V.displayName = "SortableTableHeadWrapper";
function W({
  className: t,
  size: e,
  responsive: a,
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
  const y = m("table", t, {
    [`table-${e}`]: !!e
  });
  return /* @__PURE__ */ h(P, { className: y, responsive: a, sticky: n, ...N, children: [
    /* @__PURE__ */ l(H, {}),
    /* @__PURE__ */ l(V, { onChangeSort: f, ...o }),
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
W.displayName = "ContainedSortableTable";
function Y({ nextSort: t }) {
  const [, e] = $();
  return q(() => {
    console.log("setNextSort", t), e(t);
  }, [t, e]), null;
}
function Z({
  fields: t,
  currentSort: e,
  ...a
}) {
  return /* @__PURE__ */ h(x, { initialFields: t, initialSort: e, children: [
    /* @__PURE__ */ l(Y, { nextSort: e }),
    /* @__PURE__ */ l(W, { ...a })
  ] });
}
Z.displayName = "SortableTable";
const z = [10, 25, 50, 100, 250, 500, 1e3];
function G({
  value: t,
  pageValues: e = z,
  size: a,
  label: n,
  className: s,
  onChange: r,
  ...c
}) {
  const u = K(), i = (b) => r(Number(b.target.value)), d = s ?? m("form-select", { [`form-select-${a}`]: !!a }), o = m("input-group", {
    [`input-group-${a}`]: !!a
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
        children: e.map((b) => /* @__PURE__ */ l("option", { value: b, children: b }, b))
      }
    )
  ] }, t);
}
G.displayName = "RowsPerPage";
function tt({
  page: t,
  rowsPerPage: e,
  onChangePage: a,
  count: n,
  size: s,
  showFirst: r,
  showLast: c,
  className: u,
  rowsPerPageProps: i,
  ...d
}) {
  const o = n === 0 ? 0 : t * e + 1, b = Math.min(t * e + e, n), p = e === 0 ? 0 : Math.floor((n - 1) / e), f = m("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ h("div", { className: m("row g-3 justify-content-end", u), ...d, children: [
    !!i && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(G, { ...i, value: e, size: s }) }),
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
          onClick: () => a(0),
          "aria-label": "First page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t === 0,
          onClick: () => a(t - 1),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t >= p,
          onClick: () => a(t + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      c && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: f,
          disabled: t >= p,
          onClick: () => a(p),
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
  return /* @__PURE__ */ l("colgroup", { children: t.filter((e) => e.visible !== !1).map((e, a) => /* @__PURE__ */ l(
    "col",
    {
      className: e.colClassName,
      span: e.colSpan ?? 1
    },
    a
  )) });
}
H.displayName = "DataTableCols";
function lt(t) {
  const e = C(T);
  if (!e)
    throw new Error("useField must be used within a DataTableProvider");
  return [
    e.fields.find((a) => a.id === t) ?? null,
    e.updateField
  ];
}
function st() {
  const t = C(T);
  if (!t)
    throw new Error("useTableContext must be used within a DataTableProvider");
  return t;
}
export {
  _ as ContainedDataTable,
  M as ContainedDataTableRow,
  W as ContainedSortableTable,
  O as DataTable,
  H as DataTableCols,
  T as DataTableContext,
  x as DataTableProvider,
  Q as DataTableRow,
  k as DataTableTBody,
  S as DataTableTH,
  G as RowsPerPage,
  Z as SortableTable,
  B as SortableTableHead,
  A as SortableTableTH,
  tt as TablePagination,
  lt as useField,
  st as useTableContext,
  v as useTableFields,
  $ as useTableSort
};
//# sourceMappingURL=index.es.js.map
