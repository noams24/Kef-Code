interface PageProps {
  params: {
    chapter: string
  }
}

const Chapter = ({ params }: PageProps) => {
  return (
    <>
    <h2 className="text-center">{params.chapter}</h2>
    </>
  );
};

export default Chapter;
