import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const getValueByPath = (obj, path) => {
  if (!obj || !path) return "";

  return path.split(".").reduce((acc, key) => {
    return acc ? acc[key] : undefined;
  }, obj);
};

const CardTable = ({
  columns = [],
  data = [],

  searchValue = "",
  onSearchChange,

  page = 0,
  totalPages = 1,
  onPageChange,

  pageSize = 10,
  onPageSizeChange,
  loading = false,
}) => {
  const tableColumns = useMemo(() => {
    return columns.map((col) => ({
      id: col.key,
      accessorFn: (row) => getValueByPath(row, col.key),
      header: col.label,
      enableSorting: col.enableSorting !== false,

      cell: ({ row, getValue }) => {
        const value = getValue();
        const originalRow = row.original;

        if (col.render) {
          return col.render(value, originalRow);
        }

        if (value === null || value === undefined || value === "") {
          return "-";
        }

        return value;
      },
    }));
  }, [columns]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <div className="card mt-5 bg-base-100 shadow">
      <div className="card-body gap-4">
        {/* RECHERCHE GLOBALE BACKEND */}
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <input
            type="text"
            className="input input-bordered w-full md:w-80"
            placeholder="Rechercher..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
          {loading && (
            <div className="text-sm opacity-70 flex items-center gap-2">
              <span className="loading loading-spinner loading-xs"></span>
              Recherche en cours...
            </div>
          )}

          <select
            className="select select-bordered w-full md:w-40"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} lignes
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table text-dark font-bold text-center">
            <thead className="nav-bg">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex justify-center items-center gap-1"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted()] ?? ""}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {data.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-5">
                    Aucune donnée trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION BACKEND */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-sm opacity-70">
            Page {page + 1} sur {totalPages || 1}
          </div>

          <div className="join">
            <button
              type="button"
              className="btn btn-sm join-item"
              onClick={() => onPageChange?.(0)}
              disabled={page === 0}
            >
              «
            </button>

            <button
              type="button"
              className="btn btn-sm join-item"
              onClick={() => onPageChange?.(page - 1)}
              disabled={page === 0}
            >
              Précédent
            </button>

            <button
              type="button"
              className="btn btn-sm join-item"
              onClick={() => onPageChange?.(page + 1)}
              disabled={page + 1 >= totalPages}
            >
              Suivant
            </button>

            <button
              type="button"
              className="btn btn-sm join-item"
              onClick={() => onPageChange?.(totalPages - 1)}
              disabled={page + 1 >= totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTable;
