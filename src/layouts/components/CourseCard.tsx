import Pi from "./Pi";

interface Props {
  title: string;
  link: string;
  image: string;
  chapters?: number;
  items?: number;
  completed: string;
}

const CourseCard = ({ title, link, image, chapters, items, completed }: Props) => {
  return (
    <a href={`courses/${link}`}>
      <div className="max-w-xs cursor-pointer rounded border mx-2 my-2 inline-block hover:shadow-lg">
        <div className="relative w-full">

          <img
            className="w-64 h-64 object-cover rounded"
            src={image}
            alt="Sunset in the mountains"
          />

          <div className="absolute top-5 left-5 right-5">
            <h2 className="course-card-title" dir="rtl">
              {title}
            </h2>
            <Pi completed={completed} />
          </div>
        </div>

        <div className="flex px-6 py-4 justify-end items-center gap-x-4">
          <div className="flex-col text-center">
            <p className="text-2xl">{items}</p>
            <p className="text-xs text-gray-500">שאלות</p>
          </div>
          <div className="flex-col text-center">
            <p className="text-2xl">{chapters}</p>
            <p className="text-xs text-gray-500">פרקים</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CourseCard;
