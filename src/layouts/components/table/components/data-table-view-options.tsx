"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { useTableViewStore } from "@/store/store"
import { Button } from "../registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../registry/new-york/ui/dropdown-menu"
import { hebrewColumnsFilter } from "../data/data"
import { ColumnsNameEnum, ViewOptionEnum } from "@/types/enum"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {

  const { columnsView, setColumnsView } = useTableViewStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 lg:flex btn-table-hover-color"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          הגדרת תצוגה
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-body dark:bg-darkmode-body border dark:border-white">
        <DropdownMenuLabel
          className="flex flex-row-reverse">
          שינוי עמודות
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide() && column.id !== ColumnsNameEnum.TITLE
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="flex flex-row-reverse"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value)
                  setColumnsView({
                    columnName: column.id,
                    viewOption: column.getIsVisible() ? ViewOptionEnum.HIDE : ViewOptionEnum.NO_SORTING
                  })
                }}
              >
                {hebrewColumnsFilter.map(({ label, value }) => {
                  if (column.id !== value) return
                  return label
                })}
              </DropdownMenuCheckboxItem>
            )
          })}
        <DropdownMenuCheckboxItem
          onClick={() => {
            columnsView.map(({ columnName }) => {
              setColumnsView({ columnName, viewOption: ViewOptionEnum.NO_SORTING })
            })
          }}>
          איפוס עמודות
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
