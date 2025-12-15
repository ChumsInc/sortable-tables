import { jsx as l, jsxs as h } from "react/jsx-runtime";
import x, { useId as A } from "react";
import g from "@emotion/styled";
function k(a) {
  var e, t, n = "";
  if (typeof a == "string" || typeof a == "number") n += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var s = a.length;
    for (e = 0; e < s; e++) a[e] && (t = k(a[e])) && (n && (n += " "), n += t);
  } else for (t in a) a[t] && (n && (n += " "), n += t);
  return n;
}
function u() {
  for (var a, e, t = 0, n = "", s = arguments.length; t < s; t++) (a = arguments[t]) && (e = k(a)) && (n && (n += " "), n += e);
  return n;
}
function v({
  field: a,
  className: e,
  children: t,
  ...n
}) {
  const s = u({ [`text-${a.align}`]: !!a.align }, e);
  return /* @__PURE__ */ l("th", { className: s, scope: "col", ...n, children: t ?? a.title });
}
v.displayName = "DataTableTH";
function D({ fields: a, ...e }) {
  return /* @__PURE__ */ l("thead", { ...e, children: /* @__PURE__ */ l("tr", { children: a.map((t, n) => /* @__PURE__ */ l(
    v,
    {
      ...t.thProps,
      field: t,
      className: u(
        typeof t.className == "function" ? { [`text-${t.align}`]: !!t.align } : t.className
      )
    },
    t.id ?? n
  )) }) });
}
D.displayName = "DataTableHead";
function B({ field: a, row: e, className: t, as: n, ...s }) {
  const c = u(
    { [`text-${a.align}`]: !!a.align },
    t,
    typeof a.className == "function" ? a.className(e) : a.className
  );
  return x.createElement(
    n ?? a.as ?? "td",
    {
      className: c,
      scope: (n ?? a.as) === "th" ? "row" : void 0,
      colSpan: a.colSpan,
      ...a.cellProps,
      ...s
    },
    e[a.field] === void 0 && !a.render ? null : typeof a.render == "function" ? a.render(e) : e[a.field]
  );
}
function S({
  className: a,
  rowClassName: e,
  selected: t,
  fields: n,
  row: s,
  trRef: c,
  onClick: o,
  ...i
}) {
  const d = (b) => {
    o?.(s, b);
  }, r = typeof e == "function" ? e(s) : e;
  return s ? /* @__PURE__ */ l(
    "tr",
    {
      ref: c,
      className: u({ "table-active": t }, a, r),
      onClick: d,
      ...i,
      children: n.map((b, m) => /* @__PURE__ */ l(B, { field: b, row: s }, m))
    }
  ) : null;
}
S.displayName = "DataTableRow";
function T({
  fields: a,
  data: e,
  keyField: t,
  rowClassName: n,
  renderRow: s,
  onSelectRow: c,
  selected: o = "",
  children: i,
  ...d
}) {
  return /* @__PURE__ */ h("tbody", { ...d, children: [
    e.map((r) => {
      const b = String(typeof t == "function" ? t(r) : r[t]), m = typeof o == "function" ? o(r) : b === o;
      return s ? s(r) : /* @__PURE__ */ l(
        S,
        {
          onClick: c,
          rowClassName: n,
          fields: a,
          row: r,
          selected: m
        },
        b
      );
    }),
    i
  ] });
}
T.displayName = "DataTableTBody";
const $ = g.table`
    --table-sticky-top: ${(a) => a.sticky ? "0" : void 0};

    thead {
        tr:nth-of-type(1) td,
        tr:nth-of-type(1) th {
            top: var(--table-sticky-top, unset);
            position: ${(a) => a.sticky ? "sticky" : "unset"};
            z-index: ${(a) => a.sticky ? 10 : "unset"};
            background: ${(a) => a.sticky ? "linear-gradient(var(--bs-table-bg) 75%, rgba(var(--bs-secondary-bg-rgb), 0.9))" : "unset"};
        }
    }
`, H = x.forwardRef(
  function({
    sticky: e,
    responsive: t,
    children: n,
    className: s,
    ...c
  }, o) {
    if (t) {
      const i = u(s, {
        "table-responsive": t === !0,
        [`table-responsive-${t}`]: t !== !0
      });
      return /* @__PURE__ */ l("div", { className: i, children: /* @__PURE__ */ l($, { ref: o, ...c, children: n }) });
    }
    return /* @__PURE__ */ l($, { className: s, sticky: e, ref: o, ...c, children: n });
  }
), M = g.col`
    &.col-collapsed {
        visibility: collapse;
    } 
`;
function C({ fields: a }) {
  return /* @__PURE__ */ l("colgroup", { children: a.map((e, t) => /* @__PURE__ */ l(
    M,
    {
      className: u(e.colClassName, { "col-collapsed": e.collapse }),
      span: e.colSpan ?? 1
    },
    t
  )) });
}
C.displayName = "DataTableCols";
function V({
  fields: a,
  data: e,
  keyField: t,
  size: n = "",
  sticky: s,
  responsive: c,
  rowClassName: o,
  renderRow: i,
  onSelectRow: d,
  selected: r = "",
  className: b = "",
  tfoot: m,
  children: N,
  tableHeadProps: p,
  ...y
}) {
  const f = u("table", b, {
    [`table-${n}`]: !!n
  });
  return /* @__PURE__ */ h(H, { sticky: s, responsive: c, className: f, ...y, children: [
    /* @__PURE__ */ l(C, { fields: a }),
    /* @__PURE__ */ l(D, { ...p, fields: a }),
    !!e.length && /* @__PURE__ */ l(
      T,
      {
        fields: a,
        data: e,
        keyField: t,
        rowClassName: o,
        renderRow: i,
        onSelectRow: d,
        selected: r
      }
    ),
    N,
    m
  ] });
}
V.displayName = "DataTable";
const E = (a) => {
  if (!a)
    return "flex-start";
  switch (a) {
    case "end":
      return "flex-end";
    default:
      return "center";
  }
}, G = g.div`
    display: flex;
    width: 100%;
    flex-direction: ${(a) => a.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(a) => E(a.align)};

    .sort-icon {
        flex-grow: ${(a) => a.align === "end" ? "1" : "0"};
        opacity: ${(a) => a.sorted ? 1 : 0};
    }

    &:hover .sort-icon {
        color: ${(a) => a.sorted ? "unset" : "var(--bs-primary)"};
        opacity: 0.75;
        transition: opacity 0.2s;
    }
`;
function R({
  field: a,
  sorted: e,
  ascending: t,
  className: n,
  onClick: s
}) {
  if (!a.sortable)
    return /* @__PURE__ */ l(v, { field: a, className: n });
  const { className: c, ...o } = a.thProps ?? {}, i = u(
    n,
    c,
    { [`text-${a.align}`]: !!a.align }
  ), d = () => {
    s({ field: a.field, ascending: e ? !t : !0 });
  }, r = {
    "bi-arrow-down": t,
    "bi-arrow-up": !t
  };
  return /* @__PURE__ */ l("th", { ...o, className: u("sortable", i), scope: "col", onClick: d, children: /* @__PURE__ */ h(G, { sorted: e, align: a.align, children: [
    /* @__PURE__ */ l("div", { className: "field-title", children: a.title }),
    /* @__PURE__ */ l("div", { className: u("me-1 sort-icon", r) })
  ] }) });
}
R.displayName = "SortableTableTH";
function j({
  currentSort: a,
  fields: e,
  onChangeSort: t
}) {
  const { field: n, ascending: s } = a;
  return /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: e.map((c, o) => /* @__PURE__ */ l(
    R,
    {
      field: c,
      sorted: n === c.field,
      ascending: s,
      className: u(
        typeof c.className == "function" ? { [`text-${c.align}`]: !!c.align } : c.className
      ),
      onClick: t
    },
    o
  )) }) });
}
j.displayName = "SortableTableHead";
function I({
  fields: a,
  data: e,
  currentSort: t,
  onChangeSort: n,
  keyField: s,
  size: c = "",
  sticky: o,
  rowClassName: i,
  renderRow: d,
  onSelectRow: r,
  selected: b = "",
  className: m = "",
  tfoot: N,
  children: p,
  ...y
}) {
  const f = u("table", m, {
    [`table-${c}`]: !!c
  });
  return /* @__PURE__ */ h(H, { className: f, sticky: o, ...y, children: [
    /* @__PURE__ */ l(C, { fields: a }),
    /* @__PURE__ */ l(j, { currentSort: t, fields: a, onChangeSort: n }),
    !!e.length && /* @__PURE__ */ l(
      T,
      {
        fields: a,
        data: e,
        keyField: s,
        rowClassName: i,
        renderRow: d,
        onSelectRow: r,
        selected: b
      }
    ),
    p,
    N
  ] });
}
I.displayName = "SortableTable";
const J = [10, 25, 50, 100, 250, 500, 1e3];
function _({
  value: a,
  pageValues: e = J,
  size: t,
  label: n,
  className: s,
  onChange: c,
  ...o
}) {
  const i = A(), d = (m) => c(Number(m.target.value)), r = s ?? u("form-select", { [`form-select-${t}`]: !!t }), b = u("input-group", {
    [`input-group-${t}`]: !!t
  });
  return /* @__PURE__ */ h("div", { className: b, children: [
    /* @__PURE__ */ l("label", { className: "input-group-text", htmlFor: i, children: n ?? "Rows" }),
    /* @__PURE__ */ l(
      "select",
      {
        className: r,
        id: i,
        value: a,
        onChange: d,
        ...o,
        children: e.map((m) => /* @__PURE__ */ l("option", { value: m, children: m }, m))
      }
    )
  ] }, a);
}
_.displayName = "RowsPerPage";
function L({
  page: a,
  rowsPerPage: e,
  onChangePage: t,
  count: n,
  size: s,
  showFirst: c,
  showLast: o,
  className: i,
  rowsPerPageProps: d,
  ...r
}) {
  const b = n === 0 ? 0 : a * e + 1, m = Math.min(a * e + e, n), N = e === 0 ? 0 : Math.floor((n - 1) / e), p = u("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ h("div", { className: u("row g-3 justify-content-end", i), ...r, children: [
    !!d && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(_, { ...d, value: e, size: s }) }),
    /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ h("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ h("div", { className: "col-auto", children: [
        b,
        "-",
        m,
        " of ",
        n
      ] }),
      c && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: a === 0,
          onClick: () => t(0),
          "aria-label": "First page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: a === 0,
          onClick: () => t(a - 1),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: a >= N,
          onClick: () => t(a + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      o && /* @__PURE__ */ l("div", { className: "col-auto", children: /* @__PURE__ */ l(
        "button",
        {
          className: p,
          disabled: a >= N,
          onClick: () => t(N),
          "aria-label": "Last page",
          children: /* @__PURE__ */ l("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
L.displayname = "TablePagination";
export {
  V as DataTable,
  C as DataTableCols,
  S as DataTableRow,
  T as DataTableTBody,
  v as DataTableTH,
  _ as RowsPerPage,
  I as SortableTable,
  j as SortableTableHead,
  R as SortableTableTH,
  L as TablePagination
};
//# sourceMappingURL=index.es.js.map
