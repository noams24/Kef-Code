import { BsCheck2Circle } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiBookmarks } from "react-icons/bi";

interface ProblemDescriptionProps {
    problem: string;
  }

const problemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  return (
    <>

    <div className='flex items-center mt-3'>
      <div
        className={`bg-green-800 text-green-500 inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
      >
        קל
      </div>
      <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
        <BsCheck2Circle />
      </div>

      <div
        className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
      >
        <AiFillLike className='text-dark-blue-s' />
        <span className='text-xs'>5</span>
      </div>
      <div
        className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
      >
        <AiFillDislike className='text-dark-blue-s' />

        <span className='text-xs'>2</span>
      </div>
      <div
        className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
      >
        <BiBookmarks className='text-dark-yellow' />
      </div>
    </div>
</>
  );
};

export default problemDescription;
