"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange } from "./DateRangePicker";
import { AllFoodOrders, FoodOrderStatusEnum } from "@/types";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Dialogs } from "../orders/_components/Dialog";

// Column тодорхойлолт
const getColumns = (
  handleStatusChange: (id: string, newStatus: FoodOrderStatusEnum) => void,
  selectedRows: any[],
  setSelectedRows: React.Dispatch<React.SetStateAction<any[]>>
): ColumnDef<AllFoodOrders>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedRows(
              !!value ? table.getRowModel().rows.map((row) => row.original) : []
            );
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedRows((prev) => {
              if (!!value) return [...prev, row.original];
              return prev.filter((r) => r._id !== row.original._id);
            });
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "number",
      header: "№",
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      header: "Customer",
      accessorFn: (row) => row.user?.email,
    },
    {
      header: "Food",
      accessorKey: "food",
      cell: ({ row }) => {
        const order = row.original;
        const itemsCount = order.foodOrderItems.length;

        return (
          <Popover>
            <PopoverTrigger asChild>
              <p>{itemsCount} foods</p>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="flex flex-col gap-3">
                {order.foodOrderItems.map((item, idx) => {
                  return (
                    <div key={idx} className="flex items-center gap-[10px]">
                      <Image
                        width={32}
                        height={30}
                        alt="foodImg"
                        src={item.food?.image || ""}
                        className="w-[32px] h-[30px] rounded-[4px]"
                      />
                      <p className="text-[12px] w-[171px]">
                        {item.food?.foodName || ""}
                      </p>
                      <p className="text-[12px]">x{item.quantity}</p>
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const dateStr = row.getValue("createdAt") as string;
        const date = new Date(dateStr);
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "totalPrice",
      header: () => <div>Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalPrice"));
        if (isNaN(amount)) return <div>-</div>;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Delivery state",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="capitalize">
                {order.status}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order._id)}
              >
                Copy Order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  handleStatusChange(order._id, FoodOrderStatusEnum.Pending)
                }
              >
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleStatusChange(order._id, FoodOrderStatusEnum.Delivered)
                }
              >
                Mark as Delivered
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<AllFoodOrders[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

  async function handleStatusChange(
    ids: string[],
    newStatus: FoodOrderStatusEnum
  ): Promise<void> {
    try {
      const idsStr = ids.join(",");
      await axios.patch(`/api/food-order/ids`, {
        ids,
        status: newStatus,
      });
      console.log("Status updated for all selected orders.");
    } catch (error) {
      console.error("Error updating order statuses:", error);
    }
  }
  function handleSingleStatusChange(
    id: string,
    newStatus: FoodOrderStatusEnum
  ): void {
    // Таны асинхрон функцыг дуудахдаа .catch хийх нь сайн
    handleStatusChange([id], newStatus).catch(console.error);
  }

  // fetch data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/food-order");
        const fetchedOrders = res.data.allFoodOrders.map((item: any) => ({
          ...item,
          status: item.status as FoodOrderStatusEnum,
        }));
        setData(fetchedOrders);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns: getColumns(
      handleSingleStatusChange,
      selectedRows,
      setSelectedRows
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full h-auto bg-white rounded-lg border">
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-[20px] font-semibold">Orders</h2>
          <p className="text-[12px]">{data.length} items</p>
        </div>
        <div className="flex gap-3">
          <DatePickerWithRange />
        </div>
        <Dialogs
          selectedOrders={selectedRows}
          onChangeState={handleStatusChange}
        />
      </div>
      <div className="border-t-[1px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
