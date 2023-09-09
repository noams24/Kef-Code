import PageHeader from "@/partials/PageHeader";
import ChapterCard from "@/components/ChapterCard";
import coursesData from './chapters.json';
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "כיף קוד - פרקים",
  }

interface PageProps {
  params: {
    course: string
  }
}

const Chapter = ({ params }: PageProps) => {
  const course = coursesData.find(course => course.courseName === params.course);
  if (!course) {
    return <p>הקורס בפיתוח</p>;
  }
  return (
    <>
      <PageHeader title={params.course} />
      <div className="flex justify-center">
        <div className="chapter-page-container dark:chapter-page-container-dark">
          {course.chapters.map((chapter, chapterIndex) => (
            <ChapterCard
              key={chapterIndex} // Use a unique key for each component in the list
              title={chapter.title}
              link={chapter.link}
              course={params.course}
              complete={String(chapter.complete)}
              index={chapterIndex}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Chapter;
