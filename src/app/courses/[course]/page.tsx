import PageHeader from "@/partials/PageHeader";
import ChapterCard from "@/components/ChapterCard";
import coursesData from './chapters.json';

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
        <div className="chapter-page-container mx-96 flex flex-col w-[410px] items-center border border-gray-800 rounded-lg p-4 m-3">
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
