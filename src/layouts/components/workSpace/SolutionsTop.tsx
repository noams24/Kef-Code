import React from 'react';

import { FaRegComment, FaRegUserCircle } from 'react-icons/fa';
import { humanize, slugify } from "@/lib/utils/textConverter";
import dateFormat from '@/lib/utils/dateFormat';
import { AiOutlineCalendar, AiFillLike } from 'react-icons/ai';

interface SolutionCardProps {
    author: string;
    date: string;
    likes: number;
}

const SolutionsTop: React.FC<SolutionCardProps> = ({ author, date, likes }) => {



    return (
        <div className="flex justify-between mt-6 border-b-2 border-gray-700">
            <div className="flex">
                <FaRegUserCircle className={"mt-2 inline-block text-2xl"} />
                <div className="ml-1">
                    <a href={`/authors/${slugify(author)}`} className="ml-4 font-bold text-center text-lg hover:text-blue-500 dark:hover:text-blue-500">
                        {humanize(author)}
                    </a>
                    <div className="flex">
                        <span className="ml-2">{dateFormat(date)}</span>
                    </div>
                </div>
            </div>
            <button className="flex rounded-lg border-2 border-gray-400 h-8 w-60 dark:text-white mt-2 ">
                <AiFillLike className="text-xl mt-1.5 mr-1" />
                <span className="mr-1">{likes}</span>
            </button>
        </div>
    );
};

export default SolutionsTop;

