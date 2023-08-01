import Pi from "./Pi";

interface Props {
  title: string;
  image: string;
  chapters?: number;
  items?: number;
  completed: string;
}

const CourseCard = ({ title, image, chapters, items, completed }: Props) => {
  return (
    <div className="max-w-xs cursor-pointer rounded border mx-2 my-2 inline-block hover:shadow-lg">
      <div className="relative w-full">
        <img
          className="w-full object-cover rounded"
          src={image}
          alt="Sunset in the mountains"
        />
        <div className="absolute top-5 left-5">
          <h2 className="text-2xl text-white mb-24 w-64 ">{title}</h2>
          <Pi completed={completed} />
        </div>
      </div>

      <div className="flex px-6 py-4 justify-end items-center gap-x-4">
        <div className="flex-col text-center">
          <p className="text-2xl">{items}</p>
          <p className="text-xs text-gray-500">פריטים</p>
        </div>
        <div className="flex-col text-center">
          <p className="text-2xl">{chapters}</p>
          <p className="text-xs text-gray-500">פרקים</p>
        </div>
      </div>


interface CourseCardProps {
  title: string;
  explanation: string;
  link: string,
}

const CourseCard: React.FC<CourseCardProps> = ({ title, explanation, link }) => {
  return (
    <div className="dark:bg-gray-900 text-center rounded-lg shadow-md p-6 m-1">
      <h4><Link href={`/courses/${link}`}>{title}</Link></h4>
      <p>{explanation}</p>
    </div>
  );
};

export default CourseCard;

{/* 
<>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title="קורסים" />
      <div className="flex justify-center p-6">
      <CourseCard
        title="אלגברה"
        explanation="אלגברה לינארית 1"
      />
      <CourseCard
        title="אלגוריתמים"
        explanation="קורס אלגוריתמים"
      />
      </div>
    </>

*/}
