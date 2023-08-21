import React from 'react';

import { FaRegUserCircle } from 'react-icons/fa';
import { humanize, slugify } from "@/lib/utils/textConverter";
import dateFormat from '@/lib/utils/dateFormat';
import { AiFillLike } from 'react-icons/ai';
import parse from 'html-react-parser';

import "mathlive/static.css";
import '@/layouts/editor/theme.css';

// interface SolutionProps {
//     author: string;
//     date: string;
//     likes: number;
//     comments: number;
//     content: any;
// }

interface SolutionProps {
    data: any;
}


// const Solution: React.FC<SolutionProps> = ({ author, date, likes, comments, content }) => {
    const Solution: React.FC<SolutionProps> = ({ data }) => {
    
    return (
        <div>
            <div dir="rtl" className="flex justify-between mt-6 border-b-2 border-gray-700">
                <div className="flex">
                    <FaRegUserCircle className={"mt-2 inline-block text-2xl"} />
                    <div className="mr-1">
                        <a href={`/authors/${slugify(data.user.username)}`} className="mr-4 font-bold text-center text-lg hover:text-blue-500 dark:hover:text-blue-500">
                            {humanize(data.user.username)}
                        </a>
                        <div className="flex">
                            <span className="mr-5">{dateFormat(data.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <button className="flex rounded-lg border-2 border-gray-400 h-8 w-16 dark:text-white mt-2 ">
                    <span className="mr-1">{data.votes.length}</span>
                    <AiFillLike className="text-xl mt-0.5 ml-1 mr-2" />
                </button>
            </div>
            {parse(data.html)}
        </div>
    );
};

export default Solution;

