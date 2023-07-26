import PageHeader from "@/partials/PageHeader";

interface PageProps {
  params: {
    chapter: string
  }
}

const Chapter = ({ params }: PageProps) => {
  return (
    <>
    <PageHeader title={params.chapter}/>
    </>
  );
};

export default Chapter;
