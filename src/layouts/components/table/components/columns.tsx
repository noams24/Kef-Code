"use client";

import { ColumnDef } from "@tanstack/react-table";
import { difficulties, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import Link from "next/link";
import { usePathname } from "next/navigation";

// interface Data {
//   title: string;
//   difficulty: string;
//   //TODO: problemstatus: string
// }

const Path = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((x) => x);
  return paths
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="רמת קושי" />
    ),
    cell: ({ row }) => {
      const difficulty = difficulties.find(
        (difficulty) => difficulty.value === row.getValue("difficulty"),
      );

      if (!difficulty) {
        return null;
      }

        let colorClass = 'color-difficulty-low'
        if (difficulty.value === 'בינוני') {
          colorClass = 'color-difficulty-medium'
        }
        else if (difficulty.value === 'קשה') {
          colorClass = 'color-difficulty-high'
        }

      return (
        <div className="flex justify-center items-center">
          <span className={colorClass}>
            {difficulty.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA, rowB, columId) => {
      const statusOrder = {
        "קשה": 3,
        "בינוני": 2,
        "קל": 1
      }
      const valueA = rowA.getValue(columId) as keyof typeof statusOrder
      const valueB = rowB.getValue(columId) as keyof typeof statusOrder
      return statusOrder[valueA] - statusOrder[valueB]
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader className="pr-2" column={column} title="מועד" />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2 justify-center'>
          <span className="max-w-[500px] truncate font-bold font-arial"> 
              {row.getValue("date") ? row.getValue("date") : ''}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="שם השאלה" />
    ),
    cell: ({ row }) => {
      const path = Path()
      return (
        <div className='flex space-x-2 justify-center'>
          <span className="max-w-[500px] truncate font-bold font-arial">
            <Link href={`/courses/${path[1]}/${path[2]}/${row.original.title.replaceAll(' ', '-')}`}> 
              {row.getValue("title")}
            </Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="סטטוס" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div
          title={status.label}
          className="flex justify-end w-[80px] items-center"
        >
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA, rowB, columId) => {
      const statusOrder = {
        "FINISH": 4,
        "STUCK": 3,
        "ONGOING": 2,
        "BEGIN": 1
      }
      const valueA = rowA.getValue(columId) as keyof typeof statusOrder
      const valueB = rowB.getValue(columId) as keyof typeof statusOrder
      return statusOrder[valueA] - statusOrder[valueB]
    },
  },
]