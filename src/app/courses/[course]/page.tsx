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
      <div className="mx-96">
      {course.chapters.map((chapter, chapterIndex) => (
        <ChapterCard
          key={chapterIndex} // Use a unique key for each component in the list
          title={chapter.title}
          link={chapter.link}
          course={params.course}
        />
      ))}
      </div>
    </>
  );
};

export default Chapter;
