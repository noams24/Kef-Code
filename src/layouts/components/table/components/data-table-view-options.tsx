"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "../registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../registry/new-york/ui/dropdown-menu"
import { hebrewColumnsFilter } from "../data/data"
import './styles.css';
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex btn-hover-color"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          הגדרת תצוגה
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dropDownMenuClass dark:bg-black">
        <DropdownMenuLabel
          className="flex flex-row-reverse">
          שינוי עמודות
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="flex flex-row-reverse"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {hebrewColumnsFilter.map(({ label, value }) => {
                  if (column.id !== value) return
                  return label
                })}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
