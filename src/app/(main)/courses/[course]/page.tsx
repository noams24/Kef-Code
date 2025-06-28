import PageHeader from '@/partials/PageHeader';
import ChapterCard from '@/components/ChapterCard';
import SeoMeta from '@/partials/SeoMeta';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import dictionary from '@/content/dictionary.json';
import Header from '@/partials/Header';
import { createClient } from '@supabase/supabase-js';

interface PageProps {
  params: {
    course: string;
  };
}

async function getChapterPercent(course: string) {
  try {
    const courseItems = await db.$queryRawUnsafe(
      `select chapter, COUNT(*) as items from public."Problem" where course = '${course}' group by chapter`
    );
    const session = await getAuthSession();
    if (!session) return [null, courseItems];

    const query = `select chapter, COUNT(*) as completed from public."Problem" p join public."problemStatus" ps on p.id = ps."problemId" where ps."userId" = '${session.user.id}' and status = 'FINISH' and course = '${course}' group by chapter`;
    const chapterCompleted = await db.$queryRawUnsafe(query);

    let results: any = {};
    if (Array.isArray(chapterCompleted) && Array.isArray(courseItems)) {
      for (let i = 0; i < chapterCompleted.length; i++) {
        let numberOfItems: any = courseItems.filter(
          item => item.chapter === chapterCompleted[i].chapter
        )[0].items;
        results[chapterCompleted[i].chapter] = Math.trunc(
          (Number(chapterCompleted[i].completed) / Number(numberOfItems)) * 100
        );
      }
    }
    return [results, courseItems];
  } catch (error) {
    return null;
  }
}

const Chapter = async ({ params }: PageProps) => {
  const supabaseUrl = process.env.SUPABASE_STORAGE_ENDPOINT as string;
  const supabaseKey = process.env.SUPABASE_STORAGE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: coursesJson, error } = await supabase.storage
    .from('files')
    .download('courses/chapters.json');
  if (error || !coursesJson) {
    throw new Error('Failed to load courses.json');
  }
  const text = await coursesJson.text();
  const coursesData = JSON.parse(text);

  const course = coursesData[params.course];
  if (!course) {
    return <h2 className="flex justify-center">הקורס בפיתוח</h2>;
  }

  const data = await getChapterPercent(params.course);

  return (
    <>
      <SeoMeta
        // @ts-ignore
        title={`כיף קוד - ${dictionary[params.course]}`}
        // @ts-ignore
        meta_title={`כיף קוד - ${dictionary[params.course]}`}
        // @ts-ignore
        description={`כיף קוד - ${dictionary[params.course]}`}
      />
      <Header />
      {/* @ts-ignore */}
      <PageHeader title={params.course} />
      <div className="flex justify-center">
        <div className="chapter-page-container dark:chapter-page-container-dark m-3 mx-96 flex w-[410px] flex-col items-center rounded-lg border border-gray-800 p-4 dark:border-gray-500">
          {course.chapters.map((chapter: any, chapterIndex: any) => (
            <ChapterCard
              key={chapterIndex} // Use a unique key for each component in the list
              title={chapter.title}
              link={chapter.link}
              course={params.course}
              complete={
                !data || !data[0]
                  ? '-1'
                  : data[0] && data[0][chapter.link]
                    ? String(data[0][chapter.link])
                    : '0'
              }
              index={chapterIndex}
              numberOfQuestions={
                data &&
                data[1] &&
                data[1].filter((item: any) => item.chapter === chapter.link)[0]
                  ?.items
                  ? data[1].filter(
                      (item: any) => item.chapter === chapter.link
                    )[0].items
                  : 0
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Chapter;
