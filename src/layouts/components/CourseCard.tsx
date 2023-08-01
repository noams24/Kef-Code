import Pi from "./Pi";

interface Props {
  title: string;
  image: string;
  chapters: number;
  items: number;
  completed: string;
}

const CourseCard = () => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer p-2 inline-block">
      <div className="relative w-full">
        <img
          className="w-full object-cover"
          src="https://picsum.photos/280/200"
          alt="Sunset in the mountains"
        />
        <div className="absolute top-10 left-10">
          <h2 className="text-3xl text-white mb-24 w-64">מבוא למדעי המחשב</h2>
          <Pi completed="90" />
        </div>
      </div>

      <div className="flex px-6 py-4 justify-end items-center gap-x-4">
        <div className="flex-col text-center">
          <p className="text-2xl">17</p>
          <p className="text-xs text-gray-500">פריטים</p>
        </div>
        <div className="flex-col text-center">
          <p className="text-2xl">4</p>
          <p className="text-xs text-gray-500">פרקים</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
