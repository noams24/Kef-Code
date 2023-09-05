import Pi from "./Pi";
import "../../styles/courseCard.scss";

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
    <div className="card">
      <div className="relative w-full">
          <img
            className="imgCourse"
          src={image}
          alt="Sunset in the mountains"
        />
        <div className="styletext">
        <h2 className="text text-2xl ">{title}</h2>
        </div>
        <div className="stylescore">
        <Pi completed={completed} />
        </div>

      </div>

      <div className="courseData">
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
