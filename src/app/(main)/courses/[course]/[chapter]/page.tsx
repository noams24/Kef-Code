import { columns } from '@/components/table/components/columns';
import { DataTable } from '@/components/table/components/data-table';
import PageHeader from '@/partials/PageHeader';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import dictionary from '@/content/dictionary.json';
import SeoMeta from '@/partials/SeoMeta';
import Header from '@/partials/Header';

interface PageProps {
  params: {
    course: string;
    chapter: string;
  };
}

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
        date: 'desc',
      },
    });

    problems.forEach((problem: { status: string }) => {
      problem.status = 'BEGIN';
    });

    if (session) {
      const query = `select id, status from public."Problem" p join public."problemStatus" ps on p.id = ps."problemId" where course = '${course}' and chapter = '${chapter}' and ps."userId" = '${session.user.id}'`;
      const problemStatus = await db.$queryRawUnsafe(query);
      if (Array.isArray(problemStatus)) {
        for (const p of problemStatus) {
          const index = Number(
            problems.findIndex((item: { id: any }) => item.id === p.id)
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
      <Header />
      <PageHeader title={params.chapter} />
      <div className="flex w-auto justify-center p-10">
        {data && <DataTable data={data} columns={columns} />}
      </div>
    </>
  );
}
