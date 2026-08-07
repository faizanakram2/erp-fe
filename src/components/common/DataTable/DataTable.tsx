"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-2xl border bg-white p-6">

      <h2 className="mb-6 text-lg font-medium">
        {title}
      </h2>

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

          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>

              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>

                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}

                </TableCell>
              ))}

            </TableRow>
          ))}

        </TableBody>

      </Table>
    </div>
  );
}