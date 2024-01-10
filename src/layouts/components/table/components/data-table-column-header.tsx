import { useMemo } from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { useInitializeTableViewStore } from "@/hooks/useInitializeTableView";
import { useTableViewStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { Button } from "../registry/new-york/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../registry/new-york/ui/dropdown-menu";
import { sortingFilter } from "../data/data";
import { ColumnsNameEnum, ViewOptionEnum } from "@/types/enum";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {

  useInitializeTableViewStore()

  const { columnsView, setColumnsView } = useTableViewStore()
  const columnViewState = columnsView.find(columnView => columnView.columnName === column.id)

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  // Function that return the icon for each selector based on its view status 
  const getColumnIcon = (viewOption: ViewOptionEnum) => {
    const className = "table-selector-icons"
    switch (viewOption) {
      case ViewOptionEnum.DESC:
        return <ArrowDownIcon className={className} />
      case ViewOptionEnum.ASC:
        return <ArrowUpIcon className={className} />
      case ViewOptionEnum.HIDE:
        column.toggleVisibility(false)
        return null
      default:
        return <CaretSortIcon className={className} />
    }
  }

  // Function that return the icon for each filter inside the drop down menu
  const getIconFilter = (viewOption: ViewOptionEnum) => {
    const className = "h-3.5 w-3.5 text-muted-foreground/70"
    switch (viewOption) {
      case ViewOptionEnum.ASC:
        return <ArrowUpIcon className={className} />
      case ViewOptionEnum.DESC:
        return <ArrowDownIcon className={className} />
      default:
        return <EyeNoneIcon className={className} />
    }
  }

  // Function that return for each filter its onClick function
  const onClickFilter = (viewOption: ViewOptionEnum) => {
    setColumnsView({ columnName: column.id, viewOption })
    switch (viewOption) {
      case ViewOptionEnum.ASC:
        return column.toggleSorting(false)
      case ViewOptionEnum.DESC:
        return column.toggleSorting(true)
      default:
        return column.toggleVisibility(false)
    }
  }

  return (
    <div className={cn("flex justify-center pl-10", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`-ml-3 h-8 data-[state=open]:bg-accent hover:text-cyan-700 focus-visible:border-white ${column.id === ColumnsNameEnum.DIFFICULTY && 'pl-4'}`}
          >
            <span>{title}</span>
            {columnViewState ? getColumnIcon(columnViewState.viewOption) : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-body dark:bg-darkmode-body border dark:border-white">

          {sortingFilter.map(({ value, label }) => {
            if (column.id === ColumnsNameEnum.TITLE && value === ViewOptionEnum.HIDE) {
              return null
            }
            return (
              <DropdownMenuItem
                key={value}
                onClick={() => onClickFilter(value)}
                className="flex justify-between">
                {getIconFilter(value)}
                {label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
