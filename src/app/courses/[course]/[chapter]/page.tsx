import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "@/components/table/components/columns";
import { DataTable } from "@/components/table/components/data-table";
import { taskSchema } from "@/components/table/data/schema";
import PageHeader from "@/partials/PageHeader";

export const metadata: Metadata = {
  title: "כיף קוד - שאלות",
};

interface PageProps {
  params: {
    course: string;
    chapter: string;
  };
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/layouts/components/table/data/tasks.json"),
  );
  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage({ params }: PageProps) {
  const tasks = await getTasks();
  return (
    <>
      <PageHeader title={params.chapter} />
      <div className="p-10 w-auto flex justify-center">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
