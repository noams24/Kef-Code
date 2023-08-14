import React from 'react';
import Link from "next/link";
import { BiUpvote } from 'react-icons/bi';
import { FaRegComment, FaRegUserCircle } from 'react-icons/fa';
import { humanize, plainify, slugify } from "@/lib/utils/textConverter";

interface SolutionCardProps {
    author: string;
    date: string;
    upvotes: number;
    comments: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ author, date, upvotes, comments }) => {
    return (
        <div className="bg-gray-200 dark:bg-gray-900 dark:text-white rounded-lg shadow p-4 h-20 my-4">
            <div className="flex justify-center items-center mb-2">
            <a href={`/authors/${slugify(author)}`} className="font-bold text-center text-lg">
                <FaRegUserCircle className={"-mt-1 mr-2 inline-block"}/>
                {humanize(author)}
                </a>
                </div>
            <div className="flex justify-center items-center text-sm mb-1">
                <BiUpvote className="mr-1"/>
                <span className="mr-1">{upvotes}</span>
                <FaRegComment className="ml-4 mr-1"/>
                <span>{comments}</span>
                <span className="ml-4">{date}</span>
            </div>
        </div>
    );
};

export default SolutionCard;