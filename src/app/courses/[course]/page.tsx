import PageHeader from "@/partials/PageHeader";
import ChapterCard from "@/components/ChapterCard";
import coursesData from './chapters.json';
import { Metadata } from "next"
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";


export const metadata: Metadata = {
  title: "כיף קוד - פרקים",
}

interface PageProps {
  params: {
    course: string
  }
}

async function getChapterPercent(course: string) {

  const session = await getAuthSession()
  if (!session) return null

  try {
    const query = `select chapter, COUNT(*) as completed from Problem p join problemStatus ps on p.id = ps.problemId where ps.userId = '${session.user.id}' and status = 'FINISH' and course = '${course}' group by chapter`
    const chapterCompleted = await db.$queryRawUnsafe(query)
    const courseItems = await db.$queryRawUnsafe(`select chapter, COUNT(*) as items from Problem where course = '${course}' group by chapter`)
    let results: any = {}
    if (Array.isArray(chapterCompleted) && Array.isArray(courseItems)) {
      for (let i = 0; i < chapterCompleted.length; i++) {
        let numberOfItems: any = courseItems.filter(item => item.chapter === chapterCompleted[i].chapter)[0].items
        results[chapterCompleted[i].chapter] = Math.trunc((Number(chapterCompleted[i].completed) / Number(numberOfItems)) * 100)
      }
    }
    return results
  }
  catch (error) {
    return null
  }
}

const Chapter = async ({ params }: PageProps) => {
  const course = coursesData.find(course => course.courseName === params.course);
  if (!course) {
    return <h2 className="flex justify-center">הקורס בפיתוח</h2>;
  }

  const chapterPercent = await getChapterPercent(params.course);
  return (
    <>
      <PageHeader title={params.course} />
      <div className="flex justify-center">
        <div className="chapter-page-container dark:chapter-page-container-dark mx-96 flex flex-col w-[410px] items-center border border-gray-800 rounded-lg p-4 m-3 dark:border-gray-500">
          {
            course.chapters.map((chapter, chapterIndex) => (
              <ChapterCard
                key={chapterIndex} // Use a unique key for each component in the list
                title={chapter.title}
                link={chapter.link}
                course={params.course}
                complete={chapterPercent ? String(chapterPercent[chapter.link]) : '0'}
                index={chapterIndex}
                numberOfQuestions={Math.floor(Math.random() * 100) + 1}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Chapter;
