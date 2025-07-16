import { Action, IColumn, PaginationMeta } from "@/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table as ReactTable,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import PageTitle from "../page-title";
import { SearchInput } from "../input";
import { capitalizeFirstLetter, currencyFormatter, toSentenceCase, truncateText } from "@/libs";
import StatusTag from "../status-tag";
import moment from "moment";
import Pagination from "../pagination";
import PageLoader from "../page-loader";
import EmptyState from "./EmptyState";

interface TableProps<TData> {
  title?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  tableData: TData[] | [] | undefined;
  tableColumns: IColumn<TData>[];
  searchPlaceholder?: string;
  totalItems?: number;
  limit?: number;
  currentPage?: number;
  action?: Action<TData>[];
  filterOptions?: string[];
  hasDateFilter?: boolean;
  hasHeader?: boolean;
  emptyMessage?: string;
  meta?: PaginationMeta;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  setSearchQuery?: Dispatch<SetStateAction<string>>;
  setFilter?: Dispatch<SetStateAction<Record<string, string>>>;
  // filterBy?: TableFilterOption[];
}

export const Table = <TData,>({
  title,
  //   searchPlaceholder = "Search...",
  isLoading = false,
  tableData = [],
  tableColumns = [],
  action,
  //   filterOptions,
  //   hasDateFilter,
  //   hasHeader,
  emptyMessage,
  meta,
  setCurrentPage,
  setSearchQuery,
  searchPlaceholder,
  //   setFilter,
  // filterBy,
}: TableProps<TData>) => {
  const limit = meta?.limit ?? 20;
  const currentPage = meta?.page ?? 0;
  const totalPages = meta?.total as number;

  //   const [activeRowId, setActiveRowId] = useState<string | null>(null);

  //   const showMenuHandler = (rowId: string) => {
  //     if (activeRowId === rowId) {
  //       return setActiveRowId(null);
  //     }

  //     setActiveRowId(rowId);
  //   };

  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo<ColumnDef<TData, any>[]>(() => {
    return [
      ...tableColumns.map((col) => {
        if (col?.type === "status") {
          return {
            ...col,
            cell: (item: { getValue: () => string }) => {
              const status = capitalizeFirstLetter(toSentenceCase(item?.getValue()));
              // const status = item?.getValue();
              return <StatusTag status={status} value={status} />;
            },
          } as ColumnDef<TData>;
        }
        if (col?.type === "date") {
          return {
            ...col,
            cell: (item: { getValue: () => string }) => {
              const date = item?.getValue();

              const formattedDate = moment(date).format("MMM D, YYYY");
              return <span> {formattedDate}</span>;
            },
          } as ColumnDef<TData>;
        }
        if (col?.type === "dateAndTime") {
          return {
            ...col,
            cell: (item: { getValue: () => string }) => {
              const date = item?.getValue();

              const formattedDate = moment(date).format("Do MMMM, YYYY h:mm A");
              return <span> {formattedDate}</span>;
            },
          } as ColumnDef<TData>;
        }
        if (col?.type === "currency") {
          return {
            ...col,
            cell: (item: { getValue: () => number; row: { original: { currency: string } } }) => {
              const amount = item?.getValue();
              // const currency = item?.row?.original?.currency.toUpperCase();

              const formattedAmount = currencyFormatter({ amount });
              return <span> {formattedAmount}</span>;
            },
          } as ColumnDef<TData>;
        }
        if (col?.type === "percentage") {
          return {
            ...col,
            cell: (item: { getValue: () => number }) => {
              const amount = item?.getValue();
              const formattedAmount = `${amount}%`;
              return <span> {formattedAmount}</span>;
            },
          } as ColumnDef<TData>;
        }
        if (col?.type === "sn") {
          return {
            ...col,
            cell: (item: { row: { index: number } }) => {
              const number =
                currentPage > 1
                  ? (currentPage - 1) * limit + item?.row?.index + 1
                  : item?.row?.index + 1;

              return <span> {number}</span>;
            },
          } as ColumnDef<TData>;
        }

        if (col?.type === "truncate") {
          return {
            ...col,
            cell: (item: { getValue: () => string }) => {
              const text = item?.getValue();
              return (
                <span title={text} className="block truncate max-w-xs">
                  {truncateText(text, 65)}
                </span>
              );
            },
          };
        }

        return {
          ...(col as ColumnDef<TData>),
        };
      }),
      //   ...((action?.length as number) > 0
      //     ? [
      //         {
      //           header: "Action",
      //           cell: (item: { getValue: () => string; row: { original: TData; index: number } }) => {
      //             const row = item?.row.original;
      //             const id = item?.row.index;
      //             const rowId = (item?.row?.original as any)?.id as string;
      //             const status = (item?.row?.original as any)?.status as string;
      //             const hideStatus = (item?.row?.original as any)?.hideStatus as string;

      //             let filteredActions = [...(action as Action<TData>[])];

      //             if (status) {
      //               filteredActions = action?.filter(
      //                 (x) => !x?.hide || !x?.hide?.includes(status?.toLowerCase())
      //               ) as Action<TData>[];
      //             }

      //             // if (hideStatus) {
      //             //   filteredActions = filteredActions?.filter(
      //             //     (x) => !x?.hide || !x?.hide?.includes(hideStatus?.toLowerCase())
      //             //   ) as Action<TData>[];
      //             // }

      //             // return (
      //             //   <span className="relative cursor-pointer">
      //             //     <BsThreeDotsVertical
      //             //       onClick={() => {
      //             //         showMenuHandler(rowId);
      //             //       }}
      //             //       id={`popover-table-${id}`}
      //             //       size={25}
      //             //     />
      //             //     {activeRowId === rowId && (
      //             //       <Popover
      //             //         openPopover={activeRowId === rowId}
      //             //         content={filteredActions}
      //             //         closePopover={() => {
      //             //           showMenuHandler(rowId);
      //             //         }}
      //             //         row={row}
      //             //         buttonId={`popover-table-${id}`}
      //             //       />
      //             //     )}
      //             //   </span>
      //             // );
      //           },
      //         },
      //       ]
      //     : []),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, currentPage, tableColumns]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const table: ReactTable<any> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,

    state: {
      sorting,
      globalFilter: filtering,
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
    },
  });

  return (
    <section>
      {title && <PageTitle title={title} variant="small" className="mb-4" />}
      {/* <div className="flex w-full overflow-x-scroll">
        <div className="w-[500px]">
          {setSearchQuery && (
            <SearchInput
              placeholder={searchPlaceholder || "Search..."}
              setSearchQuery={setSearchQuery}
            />
          )}
          {setFilter && (
            <TableFilter
              filterBy={filterBy as TableFilterOption[]}
              setFilter={setFilter}
              setFilterArray={setFilterArray}
            />
          )}
        </div>
        <div></div>
      </div> */}
      <div className="w-full">
        {table.getRowModel().rows.length > 0 ? (
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-y border-zana-grey-300 text-xs text-util-grey-500"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="py-3 pr-3 text-left text-util-grey-500 font-semibold whitespace-nowrap"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="w-full text-sm">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-zana-grey-300  text-dark-400">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 text-left whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState text={isLoading ? "Please wait" : emptyMessage} />
        )}

        {isLoading && <PageLoader variant="bar" hideTitle className="mb-5 mt-5" />}
      </div>

      {/* {table.getRowModel().rows.length > 0 && meta?.total>0 && (
        <Pagination
          currentOffset={currentPage}
          total={totalPages}
          setCurrentOffset={setCurrentPage as Dispatch<SetStateAction<number>>}
          limit={meta?.limit}
        />
      )} */}
    </section>
  );
};

export default Table;
