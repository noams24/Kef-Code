import React from 'react';
import { BiUpvote } from 'react-icons/bi';
import { FaRegComment, FaRegUserCircle } from 'react-icons/fa';
import { humanize, slugify } from "@/lib/utils/textConverter";
import dateFormat from '@/lib/utils/dateFormat';
import { AiOutlineCalendar } from 'react-icons/ai';

interface SolutionCardProps {
    author: string;
    date: string;
    upvotes: number;
    comments: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ author, date, upvotes, comments }) => {
    
    const handleClick = () => {
        console.log('Hello');
      };
    
    return (
        <div onClick={handleClick} className="first-letter:bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white hover:cursor-pointer rounded-lg shadow p-4 h-20 my-4 no-underline">
            <div className="flex justify-center items-center mb-2">
                <a href={`/authors/${slugify(author)}`} className="font-bold text-center text-lg hover:text-blue-500 dark:hover:text-blue-500">
                    <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
                    {humanize(author)}
                </a>
            </div>
            <div className="flex justify-center items-center text-sm mb-1">
                <BiUpvote className="mr-1" />
                <span className="mr-1">{upvotes}</span>
                <FaRegComment className="ml-4 mr-1" />
                <span>{comments}</span>
                <AiOutlineCalendar className="ml-4 mr-1" />
                <span >{dateFormat(date)}</span>
            </div>
        </div>
    );
};

export default SolutionCard;