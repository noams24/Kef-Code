import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "@/components/table/components/columns";
import { DataTable } from "@/components/table/components/data-table";
import { taskSchema } from "@/components/table/data/schema";
import PageHeader from "@/partials/PageHeader";
// import { getAuthSession } from "@/lib/auth";
// import { db } from "@/lib/db";

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
  // const session = await getAuthSession();

  // let taskss = null;
  // if (session) {
  //   taskss =
  //     await db.$queryRawUnsafe(`select id, title, status, difficulty from Problem p join problemStatus ps on p.id = ps.problemId
  //                               where userId = '${session.user.id}' and course = '${params.course}'
  //                                and chapter = '${params.chapter}'`);
  // }
  // taskss = z.array(taskSchema).parse(taskss);

  // console.log(taskss);

  const tasks = await getTasks();
  // console.log(tasks)
  // const taskss = await getTaskss();
  return (
    <>
      <PageHeader title={params.chapter} />
      <div className="p-10 w-auto flex justify-center">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}




  //   const taskss = await db.problem.findMany({
  //     where: {
  //         course: params.course,
  //         chapter: params.chapter
  //     },
  //     select: {
  //         title: true,
  //         difficulty: true,
  //       },
  // })

  //   const taskss = await db.problem.findMany({
  //     include: {
  //       problemStatus: true,
  //     },
  //     where: {
  //         course: params.course,
  //         chapter: params.chapter,
  //         userId: session?.user.id,
  //     },

  // })
    // const status = await db.problemStatus.findMany({
  //   where: {
  //       course: params.course,
  //       chapter: params.chapter
  //   },
  //   select: {
  //       title: true,
  //       difficulty: true,
  //     },
  // })
