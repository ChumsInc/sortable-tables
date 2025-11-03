import { jsx as e, jsxs as N } from "react/jsx-runtime";
import u from "classnames";
import $, { useId as j } from "react";
import k from "@emotion/styled";
function T({
  field: a,
  className: n,
  children: t,
  ...l
}) {
  const s = u({ [`text-${a.align}`]: !!a.align }, n);
  return /* @__PURE__ */ e("th", { className: s, scope: "col", ...l, children: t ?? a.title });
}
T.displayName = "DataTableTH";
function x({ fields: a, ...n }) {
  return /* @__PURE__ */ e("thead", { ...n, children: /* @__PURE__ */ e("tr", { children: a.map((t, l) => /* @__PURE__ */ e(
    T,
    {
      ...t.thProps,
      field: t,
      className: u(
        typeof t.className == "function" ? { [`text-${t.align}`]: !!t.align } : t.className
      )
    },
    t.id ?? l
  )) }) });
}
x.displayName = "DataTableHead";
function _({ field: a, row: n, className: t, as: l, ...s }) {
  const c = u(
    { [`text-${a.align}`]: !!a.align },
    t,
    typeof a.className == "function" ? a.className(n) : a.className
  );
  return $.createElement(
    l ?? a.as ?? "td",
    {
      className: c,
      scope: (l ?? a.as) === "th" ? "row" : void 0,
      colSpan: a.colSpan,
      ...a.cellProps,
      ...s
    },
    n[a.field] === void 0 && !a.render ? null : typeof a.render == "function" ? a.render(n) : n[a.field]
  );
}
function C({
  className: a,
  rowClassName: n,
  selected: t,
  fields: l,
  row: s,
  trRef: c,
  onClick: r,
  ...i
}) {
  const m = (b) => {
    r?.(s, b);
  }, o = typeof n == "function" ? n(s) : n;
  return s ? /* @__PURE__ */ e(
    "tr",
    {
      ref: c,
      className: u({ "table-active": t }, a, o),
      onClick: m,
      ...i,
      children: l.map((b, d) => /* @__PURE__ */ e(_, { field: b, row: s }, d))
    }
  ) : null;
}
C.displayName = "DataTableRow";
function v({
  fields: a,
  data: n,
  keyField: t,
  rowClassName: l,
  renderRow: s,
  onSelectRow: c,
  selected: r = "",
  children: i,
  ...m
}) {
  return /* @__PURE__ */ N("tbody", { ...m, children: [
    n.map((o) => {
      const b = String(typeof t == "function" ? t(o) : o[t]), d = typeof r == "function" ? r(o) : b === r;
      return s ? s(o) : /* @__PURE__ */ e(
        C,
        {
          onClick: c,
          rowClassName: l,
          fields: a,
          row: o,
          selected: d
        },
        b
      );
    }),
    i
  ] });
}
v.displayName = "DataTableTBody";
const g = k.table`
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
`, D = $.forwardRef(
  function({
    sticky: n,
    responsive: t,
    children: l,
    className: s,
    ...c
  }, r) {
    if (t) {
      const i = u(s, {
        "table-responsive": t === !0,
        [`table-responsive-${t}`]: t !== !0
      });
      return /* @__PURE__ */ e("div", { className: i, children: /* @__PURE__ */ e(g, { ref: r, ...c, children: l }) });
    }
    return /* @__PURE__ */ e(g, { className: s, sticky: n, ref: r, ...c, children: l });
  }
);
function B({
  fields: a,
  data: n,
  keyField: t,
  size: l = "",
  sticky: s,
  responsive: c,
  rowClassName: r,
  renderRow: i,
  onSelectRow: m,
  selected: o = "",
  className: b = "",
  tfoot: d,
  children: p,
  tableHeadProps: h,
  ...y
}) {
  const f = u("table", b, {
    [`table-${l}`]: !!l
  });
  return /* @__PURE__ */ N(D, { sticky: s, responsive: c, className: f, ...y, children: [
    /* @__PURE__ */ e(x, { ...h, fields: a }),
    !!n.length && /* @__PURE__ */ e(
      v,
      {
        fields: a,
        data: n,
        keyField: t,
        rowClassName: r,
        renderRow: i,
        onSelectRow: m,
        selected: o
      }
    ),
    p,
    d
  ] });
}
B.displayName = "DataTable";
const M = (a) => {
  if (!a)
    return "flex-start";
  switch (a) {
    case "end":
      return "flex-end";
    default:
      return "center";
  }
}, V = k.div`
    display: flex;
    width: 100%;
    flex-direction: ${(a) => a.align === "end" ? "row-reverse" : "row"};
    justify-content: ${(a) => M(a.align)};
    .sort-icon {
        flex-grow: ${(a) => a.align === "end" ? "1" : "0"};
        opacity: ${(a) => a.sorted ? 1 : 0};
    }
    &:hover .sort-icon {
        color: ${(a) => a.sorted ? "unset" : "var(--bs-primary)"} ;
        opacity: 0.75;
        transition: opacity 0.2s;
    }
`;
function H({
  field: a,
  sorted: n,
  ascending: t,
  className: l,
  onClick: s
}) {
  if (!a.sortable)
    return /* @__PURE__ */ e(T, { field: a, className: l });
  const { className: c, ...r } = a.thProps ?? {}, i = u(
    l,
    c,
    { [`text-${a.align}`]: !!a.align }
  ), m = () => {
    s({ field: a.field, ascending: n ? !t : !0 });
  }, o = {
    "bi-arrow-down": t,
    "bi-arrow-up": !t
  };
  return /* @__PURE__ */ e("th", { ...r, className: u("sortable", i), scope: "col", onClick: m, children: /* @__PURE__ */ N(V, { sorted: n, align: a.align, children: [
    /* @__PURE__ */ e("div", { className: "field-title", children: a.title }),
    /* @__PURE__ */ e("div", { className: u("me-1 sort-icon", o) })
  ] }) });
}
H.displayName = "SortableTableTH";
function S({
  currentSort: a,
  fields: n,
  onChangeSort: t
}) {
  const { field: l, ascending: s } = a;
  return /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: n.map((c, r) => /* @__PURE__ */ e(
    H,
    {
      field: c,
      sorted: l === c.field,
      ascending: s,
      className: u(
        typeof c.className == "function" ? { [`text-${c.align}`]: !!c.align } : c.className
      ),
      onClick: t
    },
    r
  )) }) });
}
S.displayName = "SortableTableHead";
function E({
  fields: a,
  data: n,
  currentSort: t,
  onChangeSort: l,
  keyField: s,
  size: c = "",
  sticky: r,
  rowClassName: i,
  renderRow: m,
  onSelectRow: o,
  selected: b = "",
  className: d = "",
  tfoot: p,
  children: h,
  ...y
}) {
  const f = u("table", d, {
    [`table-${c}`]: !!c
  });
  return /* @__PURE__ */ N(D, { className: f, sticky: r, ...y, children: [
    /* @__PURE__ */ e(S, { currentSort: t, fields: a, onChangeSort: l }),
    !!n.length && /* @__PURE__ */ e(
      v,
      {
        fields: a,
        data: n,
        keyField: s,
        rowClassName: i,
        renderRow: m,
        onSelectRow: o,
        selected: b
      }
    ),
    h,
    p
  ] });
}
E.displayName = "SortableTable";
const G = [10, 25, 50, 100, 250, 500, 1e3];
function R({
  value: a,
  pageValues: n = G,
  size: t,
  label: l,
  className: s,
  onChange: c,
  ...r
}) {
  const i = j(), m = (d) => c(Number(d.target.value)), o = s ?? u("form-select", { [`form-select-${t}`]: !!t }), b = u("input-group", {
    [`input-group-${t}`]: !!t
  });
  return /* @__PURE__ */ N("div", { className: b, children: [
    /* @__PURE__ */ e("label", { className: "input-group-text", htmlFor: i, children: l ?? "Rows" }),
    /* @__PURE__ */ e(
      "select",
      {
        className: o,
        id: i,
        value: a,
        onChange: m,
        ...r,
        children: n.map((d) => /* @__PURE__ */ e("option", { value: d, children: d }, d))
      }
    )
  ] }, a);
}
R.displayName = "RowsPerPage";
function I({
  page: a,
  rowsPerPage: n,
  onChangePage: t,
  count: l,
  size: s,
  showFirst: c,
  showLast: r,
  className: i,
  rowsPerPageProps: m,
  ...o
}) {
  const b = l === 0 ? 0 : a * n + 1, d = Math.min(a * n + n, l), p = n === 0 ? 0 : Math.floor((l - 1) / n), h = u("btn btn-link", { [`btn-${s}`]: !!s });
  return /* @__PURE__ */ N("div", { className: u("row g-3 justify-content-end", i), ...o, children: [
    !!m && /* @__PURE__ */ e("div", { className: "col-auto", children: /* @__PURE__ */ e(R, { ...m, value: n, size: s }) }),
    /* @__PURE__ */ e("div", { className: "col-auto", children: /* @__PURE__ */ N("div", { className: "row g-3 flex-nowrap align-items-baseline", children: [
      /* @__PURE__ */ N("div", { className: "col-auto", children: [
        b,
        "-",
        d,
        " of ",
        l
      ] }),
      c && /* @__PURE__ */ e("div", { className: "col-auto", children: /* @__PURE__ */ e(
        "button",
        {
          className: h,
          disabled: a === 0,
          onClick: () => t(0),
          "aria-label": "First page",
          children: /* @__PURE__ */ e("span", { className: "bi-chevron-bar-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ e("div", { className: "col-auto", children: /* @__PURE__ */ e(
        "button",
        {
          className: h,
          disabled: a === 0,
          onClick: () => t(a - 1),
          "aria-label": "Previous page",
          children: /* @__PURE__ */ e("span", { className: "bi-chevron-left", "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ e("div", { className: "col-auto", children: /* @__PURE__ */ e(
        "button",
        {
          className: h,
          disabled: a >= p,
          onClick: () => t(a + 1),
          "aria-label": "Next page",
          children: /* @__PURE__ */ e("span", { className: "bi-chevron-right", "aria-hidden": "true" })
        }
      ) }),
      r && /* @__PURE__ */ e("div", { className: "col-auto", children: /* @__PURE__ */ e(
        "button",
        {
          className: h,
          disabled: a >= p,
          onClick: () => t(p),
          "aria-label": "Last page",
          children: /* @__PURE__ */ e("span", { className: "bi-chevron-bar-right", "aria-hidden": "true" })
        }
      ) })
    ] }) })
  ] });
}
I.displayname = "TablePagination";
export {
  B as DataTable,
  C as DataTableRow,
  v as DataTableTBody,
  T as DataTableTH,
  R as RowsPerPage,
  E as SortableTable,
  S as SortableTableHead,
  H as SortableTableTH,
  I as TablePagination,
  G as defaultRowsPerPageValues
};
//# sourceMappingURL=index.es.js.map
