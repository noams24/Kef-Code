import PageHeader from "@/partials/PageHeader";
import ChapterCard from "@/components/ChapterCard";

interface PageProps {
  params: {
    chapter: string
  }
}

const Chapter = ({ params }: PageProps) => {
  return (
    <>
      <PageHeader title={params.chapter} />
      <div className="flex justify-center">
        <ChapterCard
          title="פרק 1"
          explanation="תיאור פרק 1"
          link={`/${params.chapter}/1`}
        />
      </div>
      <div className="flex justify-center">
        <ChapterCard
          title="פרק 2"
          explanation="תיאור פרק 2"
          link={`/${params.chapter}/2`}
        />
      </div>
      <div className="flex justify-center">
        <ChapterCard
          title="פרק 3"
          explanation="תיאור פרק 3"
          link={`/${params.chapter}/3`}
        />
      </div>
      <div className="flex justify-center">
        <ChapterCard
          title="פורום"
          explanation=""
          link={`/${params.chapter}/discussion`}
        />
      </div>
    </>
  );
};

export default Chapter;
