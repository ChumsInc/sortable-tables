import { jsx as l, jsxs as p } from "react/jsx-runtime";
import A, { createContext as B, useState as V, useCallback as v, useMemo as W, useContext as g, createElement as G, useId as I } from "react";
import x from "@emotion/styled";
const N = B(null);
function S({ children: t, initialFields: a = [] }) {
  const [e, n] = V(a), s = v((o) => {
    n(o);
  }, []), c = v((o, u) => {
    const b = e.map((d) => d.id === o ? { ...d, ...u } : d);
    n(b);
  }, [e]), i = v((o) => e.find((u) => u.id === o), [e]), r = W(
    () => ({
      fields: e,
      setFields: s,
      updateField: c,
      getField: i
    }),
    [e, s, c, i]
  );
  return /* @__PURE__ */ l(N.Provider, { value: r, children: t });
}
function J() {
  const t = g(N);
  if (!t)
    throw new Error("useTableContext must be used within a FieldsProvider");
  return t;
}
function y() {
  return J().fields;
}
function nt(t) {
  const a = g(N);
  if (!a)
    throw new Error("useTableContext must be used within a FieldsProvider");
  return a.fields.find((n) => n.id === t) ?? null;
}
function lt() {
  return g(N) !== null;
}
function H(t) {
  var a, e, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (a = 0; a < s; a++) t[a] && (e = H(t[a])) && (n && (n += " "), n += e);
  } else for (e in t) t[e] && (n && (n += " "), n += e);
  return n;
}
function m() {
  for (var t, a, e = 0, n = "", s = arguments.length; e < s; e++) (t = arguments[e]) && (a = H(t)) && (n && (n += " "), n += a);
  return n;
}
const D = x.table`
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
`, F = A.forwardRef(
  function({
    sticky: a,
    responsive: e,
    children: n,
    className: s,
    ...c
  }, i) {
    if (e) {
      const r = m(s, {
        "table-responsive": e === !0,
        [`table-responsive-${e}`]: e !== !0
      });
      return /* @__PURE__ */ l("div", { className: r, children: /* @__PURE__ */ l(D, { ref: i, ...c, children: n }) });
    }
    return /* @__PURE__ */ l(D, { className: s, sticky: a, ref: i, ...c, children: n });
  }
);
function C({
  field: t,
  className: a,
  children: e,
  ...n
}) {
  const s = m({ [`text-${t.align}`]: !!t.align }, a);
  return /* @__PURE__ */ l("th", { className: s, scope: "col", ...n, children: e ?? t.title });
}
C.displayName = "DataTableTH";
function R({ ...t }) {
  const a = y();
  return /* @__PURE__ */ l("thead", { ...t, children: /* @__PURE__ */ l("tr", { children: a.map((e, n) => /* @__PURE__ */ l(
    C,
    {
      ...e.thProps,
      field: e,
      className: m(
        typeof e.className == "function" ? { [`text-${e.align}`]: !!e.align } : e.className
      )
    },
    e.id ?? n
  )) }) });
}
R.displayName = "DataTableHead";
function L({
  className: t,
  size: a,
  responsive: e,
  sticky: n,
  data: s,
  keyField: c,
  rowClassName: i,
  renderRow: r,
  onSelectRow: o,
  selected: u,
  tableHeadProps: b,
  children: d,
  tfoot: f,
  ...h
}) {
  const T = m("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ p(F, { sticky: n, responsive: e, className: T, ...h, children: [
    /* @__PURE__ */ l(k, {}),
    /* @__PURE__ */ l(R, { ...b }),
    !!s.length && /* @__PURE__ */ l(
      $,
      {
        data: s,
        keyField: c,
        rowClassName: i,
        renderRow: r,
        onSelectRow: o,
        selected: u
      }
    ),
    d,
    f
  ] });
}
function q({
  fields: t,
  ...a
}) {
  return /* @__PURE__ */ l(S, { initialFields: t, children: /* @__PURE__ */ l(L, { ...a }) });
}
q.displayName = "DataTable";
function K({ field: t, row: a, className: e, as: n, ...s }) {
  const c = m(
    { [`text-${t.align}`]: !!t.align },
    e,
    typeof t.className == "function" ? t.className(a) : t.className
  );
  return G(
    n ?? t.as ?? "td",
    {
      className: c,
      scope: (n ?? t.as) === "th" ? "row" : void 0,
      colSpan: t.colSpan,
      ...t.cellProps,
      ...s
    },
    a[t.field] === void 0 && !t.render ? null : typeof t.render == "function" ? t.render(a) : a[t.field]
  );
}
function w({
  className: t,
  rowClassName: a,
  selected: e,
  row: n,
  trRef: s,
  onClick: c,
  ...i
}) {
  const r = y(), o = (b) => {
    c?.(n, b);
  }, u = typeof a == "function" ? a(n) : a;
  return n ? /* @__PURE__ */ l(
    "tr",
    {
      ref: s,
      className: m({ "table-active": e }, t, u),
      onClick: o,
      ...i,
      children: r.map((b, d) => /* @__PURE__ */ l(K, { field: b, row: n }, b?.id ?? d))
    }
  ) : null;
}
w.displayName = "DataTableRow";
function $({
  data: t,
  keyField: a,
  rowClassName: e,
  renderRow: n,
  onSelectRow: s,
  selected: c = "",
  children: i,
  ...r
}) {
  return /* @__PURE__ */ p("tbody", { ...r, children: [
    t.map((o) => {
      const u = String(typeof a == "function" ? a(o) : o[a]), b = typeof c == "function" ? c(o) : u === c;
      return n ? n(o) : /* @__PURE__ */ l(
        w,
        {
          onClick: s,
          rowClassName: e,
          row: o,
          selected: b
        },
        u
      );
    }),
    i
  ] });
}
$.displayName = "DataTableTBody";
const O = (t) => {
  if (!t)
    return "flex-start";
  switch (t) {
    case "end":
      return "flex-end";
    default:
      return "center";
  }
}, Q = x.div`
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
function j({
  field: t,
  sorted: a,
  ascending: e,
  className: n,
  onClick: s
}) {
  if (!t.sortable)
    return /* @__PURE__ */ l(C, { field: t, className: n });
  const { className: c, ...i } = t.thProps ?? {}, r = m(
    n,
    c,
    { [`text-${t.align}`]: !!t.align }
  ), o = () => {
    s({ field: t.field, ascending: a ? !e : !0 });
  }, u = {
    "bi-arrow-down": e,
    "bi-arrow-up": !e
  };
  return /* @__PURE__ */ l("th", { ...i, className: m("sortable", r), scope: "col", onClick: o, children: /* @__PURE__ */ p(Q, { sorted: a, align: t.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: t.title }),
    /* @__PURE__ */ l("div", { className: m("me-1 sort-icon", u) })
  ] }) });
}
j.displayName = "SortableTableTH";
function E({
  currentSort: t,
  onChangeSort: a
}) {
  const e = y(), { field: n, ascending: s } = t;
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: e.map((c, i) => /* @__PURE__ */ l(
    j,
    {
      field: c,
      sorted: n === c.field,
      ascending: s,
      className: m(
        typeof c.className == "function" ? { [`text-${c.align}`]: !!c.align } : c.className
      ),
      onClick: a
    },
    i
  )) }) });
}
E.displayName = "SortableTableHead";
function U({
  className: t,
  size: a,
  responsive: e,
  sticky: n,
  data: s,
  keyField: c,
  rowClassName: i,
  renderRow: r,
  onSelectRow: o,
  selected: u,
  tableHeadProps: b,
  children: d,
  tfoot: f,
  currentSort: h,
  onChangeSort: T,
  ...P
}) {
  const _ = m("table", t, {
    [`table-${a}`]: !!a
  });
  return /* @__PURE__ */ p(F, { className: _, responsive: e, sticky: n, ...P, children: [
    /* @__PURE__ */ l(k, {}),
    /* @__PURE__ */ l(E, { currentSort: h, onChangeSort: T, ...b }),
    !!s.length && /* @__PURE__ */ l(
      $,
      {
        data: s,
        keyField: c,
        rowClassName: i,
        renderRow: r,
        onSelectRow: o,
        selected: u
      }
    ),
    d,
    f
  ] });
}
function X({
  fields: t,
  ...a
}) {
  return /* @__PURE__ */ l(S, { initialFields: t, children: /* @__PURE__ */ l(U, { ...a }) });
}
X.displayName = "SortableTable";
const Y = [10, 25, 50, 100, 250, 500, 1e3];
function M({
  value: t,
  pageValues: a = Y,
  size: e,
  label: n,
  className: s,
  onChange: c,
  ...i
}) {
  const r = I(), o = (d) => c(Number(d.target.value)), u = s ?? m("form-select", { [`form-select-${e}`]: !!e }), b = m("input-group", {
    [`input-group-${e}`]: !!e
  });
  return /* @__PURE__ */ p("div", { className: b, children: [
    /* @__PURE__ */ l("label", { className: "input-group-text", htmlFor: r, children: n ?? "Rows" }),
    /* @__PURE__ */ l(
      "select",
      {
        className: u,
        id: r,
        value: t,
        onChange: o,
        ...i,
        children: a.map((d) => /* @__PURE__ */ l("option", { value: d, children: d }, d))
      }
    )
  ] }, t);
}
M.displayName = "RowsPerPage";
function Z({
  page: t,
  rowsPerPage: a,
  onChangePage: e,
  count: n,
  size: s,
  showFirst: c,
  showLast: i,
  className: r,
  rowsPerPageProps: o,
  ...u
}) {
  const b = n === 0 ? 0 : t * a + 1, d = Math.min(t * a + a, n), f = a === 0 ? 0 : Math.floor((n - 1) / a), h = m("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ p("div", { className: m("row g-3 justify-content-end", r), ...u, children: [
    !!o && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(M, { ...o, value: a, size: s }) }),
    /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ p("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ p("div", { className: "col-auto", children: [
        b,
        "-",
        d,
        " of ",
        n
      ] }),
      c && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
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
          disabled: t >= f,
          onClick: () => e(t + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      i && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: h,
          disabled: t >= f,
          onClick: () => e(f),
          "aria-label": "Last page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
Z.displayname = "TablePagination";
const z = x.col`
    &.col-collapsed {
        visibility: collapse;
    }
`;
function k() {
  const t = y();
  return /* @__PURE__ */ l("colgroup", { children: t.map((a, e) => /* @__PURE__ */ l(
    z,
    {
      className: m(a.colClassName, { "col-collapsed": a.collapse }),
      span: a.colSpan ?? 1
    },
    e
  )) });
}
k.displayName = "DataTableCols";
export {
  q as DataTable,
  k as DataTableCols,
  S as DataTableProvider,
  w as DataTableRow,
  $ as DataTableTBody,
  C as DataTableTH,
  L as DataTableWithContext,
  M as RowsPerPage,
  X as SortableTable,
  E as SortableTableHead,
  j as SortableTableTH,
  U as SortableTableWithContext,
  Z as TablePagination,
  nt as useField,
  lt as useHasTableFieldsContext,
  J as useTableContext,
  y as useTableFields
};
//# sourceMappingURL=index.es.js.map
