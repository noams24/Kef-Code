import { BsCheck2Circle, BsBookmarkFill, BsBookmarksFill } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

// import { BsBookmark } from "react-icons/bi";

interface LikesProps {
  difficulty: String | undefined
  likes: number;
  dislikes: number;
  bookmark: boolean | undefined;
  likeStatus: String | undefined | any;
}

const Likes = ({difficulty, likes, dislikes, bookmark, likeStatus}: LikesProps) => {

let difficultyClass = ''
if (difficulty === 'קל') {
  difficultyClass = 'bg-green-800 text-green-500'
}
else if (difficulty === 'בינוני'){
  difficultyClass = 'bg-orange-600  text-yellow-600'

}
else {
  difficultyClass = 'bg-rose-600 text-rose-500'
}

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex items-center mt-3'>
          <div
            className={`${difficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
            // className={`bg- text-yellow inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
          >
            {difficulty}
          </div>
          {/* <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
            <BsCheck2Circle />
          </div> */}

          <div
            className='flex items-center cursor-pointer hover:bg-gray-400 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
          >
            {(likeStatus === 'LIKE') ? <AiFillLike className='text-blue-600'/> : <AiFillLike/>}
            <span className='text-xs'>{likes}</span>
          </div>
          <div
            className='flex items-center cursor-pointer hover:bg-gray-400 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
          >
            {(likeStatus === 'DISLIKE') ? <AiFillDislike className='text-blue-600'/> : <AiFillDislike/>}

            <span className='text-xs'>{dislikes}</span>
          </div>
          <div
            className='cursor-pointer hover:bg-gray-400  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
          >
            { bookmark ? <BsBookmarksFill className='text-blue-600' /> : <BsBookmarksFill/> } 
          </div>
        </div>
      </div>
    </>
  );
};

export default Likes;
