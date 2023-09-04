'use client'

import React from 'react';
import { FaRegComment, FaRegUserCircle } from 'react-icons/fa';
import { humanize, slugify } from "@/lib/utils/textConverter";
import hebrewDateFormat from '@/lib/utils/hebrewDateFormat';
import { AiOutlineCalendar, AiFillLike } from 'react-icons/ai';

interface SolutionCardProps {
    author: string;
    date: string;
    likes: number;
    comments: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ author, date, likes, comments }) => {

    return (
        <div dir="rtl" className="first-letter:bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white hover:cursor-pointer rounded-lg shadow p-4 h-20 my-4 no-underline">
            <div className="flex justify-center items-center mb-2">
                <a href={`/authors/${slugify(author)}`} className="font-bold text-center text-lg hover:text-blue-500 dark:hover:text-blue-500">
                    <FaRegUserCircle className={"-mt-1 ml-2 inline-block"} />
                    {humanize(author)}
                </a>
            </div>
            <div className="flex justify-center items-center text-sm mb-1">
                <span>{hebrewDateFormat(date)}</span>
                <AiOutlineCalendar className="ml-4 mr-1" />
                <span>{comments}</span>
                <FaRegComment className="ml-4 mr-1" />
                <span className="mr-1">{likes}</span>
                <AiFillLike className="mr-1" />
            </div>
        </div>
    );
};

export default SolutionCard;

