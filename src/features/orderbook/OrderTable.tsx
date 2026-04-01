import { useState } from "react";
import { useOrderStore } from "./store/order.store";
import type { Order } from "./types/order.types";
import sortIcon from "../../assets/Sorting.svg";
import searchIcon from "../../assets/search.svg";
import type {
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Order>();

function OrderTable() {
  const { orders } = useOrderStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeSearchColumn, setActiveSearchColumn] = useState<string | null>(
    null,
  );

  const columns = [
    columnHelper.accessor("tradingSymbol", {
      header: "Scrips",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("exchange", {
      header: "Exchange",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("transactionType", {
      header: "Transaction",
      cell: (info) => {
        const value = info.getValue();
        const isBuy = value?.toLowerCase() === "buy";

        return (
          <span
            className={`px-2 rounded-sm font-semibold text-s ${isBuy ? "text-[#198055] bg-[#E8F2EE]" : "text-[#CA3521] bg-[#FAEBE9]"}`}
          >
            {isBuy ? "BOUGHT" : "SOLD"}
          </span>
        );
      },
    }),
    columnHelper.accessor("productCode", {
      header: "Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("pendingQuantity", {
      header: "Qty",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nestOrderNumber", {
      header: "Transaction ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("orderedTime", {
      header: "Nest Update Time",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("orderPriceType", {
      header: "Order Type",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("triggerPrice", {
      header: "Trigger Price",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bffOrderStatus", {
      header: "Order Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rejectionReason", {
      header: "Rejection Reason",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("exchangeOrderNumber", {
      header: "Exchange Order Number",
      cell: (info) => info.getValue(),
    }),
  ];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: orders,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="rounded-sm m-4 border border-[#E3E4E5] max-h-125 overflow-auto scrollbar-hide">
        <table className="text-left table-auto  min-w-full ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isSearchable =
                    header.id === "tradingSymbol" ||
                    header.id === "nestOrderNumber";
                  const isCurrentlySearching = activeSearchColumn === header.id;

                  return (
                    <th
                      key={header.id}
                      className={`${
                        index === 0
                          ? "sticky left-0 z-20 shadow-[5px_0_10px_-2px_rgba(0,0,0,0.3)]"
                          : "z-10"
                      }`}
                    >
                      <div
                        className={`flex justify-between items-center min-w-62.5 font-medium bg-[#ECEDEE] text-[#2A2A2B] border-r border-[#E3E4E5] px-4 py-2 whitespace-nowrap 
                ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          {isSearchable && isCurrentlySearching ? (
                            <div
                              className="flex items-center gap-1 bg-white border rounded px-1 w-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                autoFocus
                                className="text-xs outline-none w-full p-1 font-normal"
                                placeholder={`Search ${header.column.columnDef.header}...`}
                                value={
                                  (header.column.getFilterValue() as string) ??
                                  ""
                                }
                                onChange={(e) =>
                                  header.column.setFilterValue(e.target.value)
                                }
                              />
                              <X
                                size={14}
                                className="cursor-pointer text-gray-400 hover:text-black"
                                onClick={() => {
                                  setActiveSearchColumn(null);
                                  header.column.setFilterValue("");
                                }}
                              />
                            </div>
                          ) : (
                            <>
                              <span className="grow">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </span>

                              {isSearchable && (
                                <img
                                  src={searchIcon}
                                  alt="search"
                                  className="cursor-pointer hover:opacity-70"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveSearchColumn(header.id);
                                  }}
                                />
                              )}
                            </>
                          )}
                        </div>

                        <div className="ml-2">
                          {{
                            asc: <ArrowUp size={16} color="#555555" />,
                            desc: <ArrowDown size={16} color="#555555" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <img src={sortIcon} alt="sort" />
                          )}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-[#ffff] even:bg-[#F9F9F9]">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`
                    whitespace-nowrap
                    p-2.5 max-w-0 
                    ${index === 0 ? "sticky left-0 z-10 bg-inherit shadow-[5px_0_10px_-2px_rgba(0,0,0,0.3)]" : ""}
                  `}
                  >
                    <p className={`text-sm text-[#2A2A2B]`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>

        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div>
          Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
          {table.getRowCount().toLocaleString()} Rows
        </div>
        {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
      </div>
    </>
  );
}

export default OrderTable;
