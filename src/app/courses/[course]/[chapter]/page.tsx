import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/table/components/columns"
import { DataTable } from "@/components/table/components/data-table"
import { UserNav } from "@/components/table/components/user-nav"
import { taskSchema } from "@/components/table/data/schema"
import PageHeader from "@/partials/PageHeader";
export const metadata: Metadata = {
  title: "שאלות - כיף קוד",
  description: "A task and issue tracker build using Tanstack Table.",
}

interface PageProps {
  params: {
    course: string,
    chapter: string
  }
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/layouts/components/table/data/tasks.json")
  )
  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage({ params }: PageProps) {
  const tasks = await getTasks()
  return (
    <>
    
      <PageHeader title={params.chapter} />
      <div className="p-10 w-auto flex justify-center">
        {/*<h2 className="text-center text-2xl font-bold tracking-tight"> {params.chapter} - שאלות מהקורס </h2>
            <h2 className="text-center text-2xl font-bold tracking-tight">{params.problems} - ומפרק</h2> */}
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}

{/* 

    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-right text-2xl font-bold tracking-tight"> {params.chapter}שאלות מהקורס </h2>
            <h2 className="text-right text-2xl font-bold tracking-tight">{params.problems}ומפרק</h2>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>


*/}