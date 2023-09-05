"use client";

import { ColumnDef } from "@tanstack/react-table";
import { priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  title: string;
  difficulty: string;
  //TODO: problemstatus: string
}

export const columns: ColumnDef<Task>[] = [
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="רמת קושי" />
    ),
    cell: ({ row }) => {
      const difficulty = priorities.find(
        (difficulty) => difficulty.value === row.getValue("difficulty"),
      );

      if (!difficulty) {
        return null;
      }

      // const { data, isLoading }
      // = useQuery({
      //   queryFn: async () => {
      //     // const { data } = await axios.get('/api/getproblems?q=')
      //     const course = "algebra1"
      //     const chapter = "1"
      //     const { data } = await axios.get(`/api/getproblems?course=${course}&chapter=${chapter}`)
      //     return data as Data
      //   },
      // })

      return (
        <div className="flex justify-center items-center">
          {/* <div>{isLoading ? 'Content is loading' : JSON.stringify(data)}</div> */}
          <span className={`color-level-${difficulty.value}`}>
            {difficulty.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="שם השאלה" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-end space-x-2 pr-7">
          <span className="max-w-[500px] truncate font-medium">
            <Link href="/courses/Algebra/Chapter-1/1">
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
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
