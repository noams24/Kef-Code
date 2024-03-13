import PageHeader from "@/partials/PageHeader";
import ChapterCard from "@/components/ChapterCard";
import coursesData from "@/content/chapters.json"
import SeoMeta from "@/partials/SeoMeta";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import dictionary from "@/content/dictionary.json";

interface PageProps {
  params: {
    course: string;
  };
}

async function getChapterPercent(course: string) {

  try {
    const courseItems = await db.$queryRawUnsafe(
      `select chapter, COUNT(*) as items from public."Problem" where course = '${course}' group by chapter`,
    );
    const session = await getAuthSession();
    if (!session) return [null, courseItems]

    const query = `select chapter, COUNT(*) as completed from public."Problem" p join public."problemStatus" ps on p.id = ps."problemId" where ps."userId" = '${session.user.id}' and status = 'FINISH' and course = '${course}' group by chapter`;
    const chapterCompleted = await db.$queryRawUnsafe(query);
    
    let results: any = {};
    if (Array.isArray(chapterCompleted) && Array.isArray(courseItems)) {
      for (let i = 0; i < chapterCompleted.length; i++) {
        let numberOfItems: any = courseItems.filter(
          (item) => item.chapter === chapterCompleted[i].chapter,
        )[0].items;
        results[chapterCompleted[i].chapter] = Math.trunc(
          (Number(chapterCompleted[i].completed) / Number(numberOfItems)) * 100,
        );
      }
    }
    return [results, courseItems];
  } catch (error) {
    return null;
  }
}

const Chapter = async ({ params }: PageProps) => {
  const course = coursesData.find(
    (course) => course.courseName === params.course,
  );
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
       {/* @ts-ignore */}
      <PageHeader title={params.course} />
      <div className="flex justify-center">
        <div className="chapter-page-container dark:chapter-page-container-dark mx-96 flex flex-col w-[410px] items-center border border-gray-800 rounded-lg p-4 m-3 dark:border-gray-500">
          {course.chapters.map((chapter, chapterIndex) => (
            <ChapterCard
              key={chapterIndex} // Use a unique key for each component in the list
              title={chapter.title}
              link={chapter.link}
              course={params.course}
              complete={
                !data || !data[0] ? "-1" : (data[0] && data[0][chapter.link]
                  ? String(data[0][chapter.link])
                  : "0" )
              }
              index={chapterIndex}
              numberOfQuestions={
                data &&
                data[1] &&
                data[1].filter((item: any) => item.chapter === chapter.link)[0]
                  ?.items
                  ? data[1].filter(
                      (item: any) => item.chapter === chapter.link,
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
