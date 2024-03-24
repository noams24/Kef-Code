// import { promises as fs } from "fs";
// import path from "path";
import { z } from "zod";
import { columns } from "@/components/table/components/columns";
import { DataTable } from "@/components/table/components/data-table";
import { taskSchema } from "@/components/table/data/schema";
import PageHeader from "@/partials/PageHeader";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import dictionary from "@/content/dictionary.json";
import SeoMeta from "@/partials/SeoMeta";

interface PageProps {
  params: {
    course: string;
    chapter: string;
  };
}

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "src/layouts/components/table/data/tasks.json"),
//   );
//   const tasks = JSON.parse(data.toString());
//   return z.array(taskSchema).parse(tasks);
// }

async function getData(course: string, chapter: string) {
  try {
    const session = await getAuthSession();
    let problems: any = await db.problem.findMany({
      where: {
        course,
        chapter,
      },
      select: {
        id: true,
        title: true,
        difficulty: true,
        date: true,
      },
      orderBy: {
        date: "desc"
      },
    });

    problems.forEach((problem: { status: string }) => {
      problem.status = "BEGIN";
    });

    if (session) {
      const query = `select id, status from public."Problem" p join public."problemStatus" ps on p.id = ps."problemId" where course = '${course}' and chapter = '${chapter}' and ps."userId" = '${session.user.id}'`;
      const problemStatus = await db.$queryRawUnsafe(query);
      if (Array.isArray(problemStatus)) {
        for (const p of problemStatus) {
          const index = Number(
            problems.findIndex((item: { id: any }) => item.id === p.id),
          );
          problems[index].status = p.status;
        }
      }
    }
    // return z.array(taskSchema).parse(problems)
    return problems;
  } catch (error) {
    return null;
  }
}

export default async function TaskPage({ params }: PageProps) {
  const data = await getData(params.course, params.chapter);
  return (
    <>
      <SeoMeta
        // @ts-ignore
        title={`כיף קוד - ${dictionary[params.chapter]}`}
        // @ts-ignore
        meta_title={`כיף קוד - ${dictionary[params.chapter]}`}
        // @ts-ignore
        description={`כיף קוד - ${dictionary[params.chapter]}`}
      />
      <PageHeader title={params.chapter} />
      <div className="p-10 w-auto flex justify-center">
        {data && <DataTable data={data} columns={columns} />}
        {/* <DataTable data={tasks} columns={columns} /> */}
        {/* {data && data[0] ? <DataTable data={data} columns={columns} /> : <DataTable data={tasks} columns={columns} />} */}
      </div>
    </>
  );
}
