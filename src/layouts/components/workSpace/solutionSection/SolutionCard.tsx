'use client';

import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { humanize, slugify } from '@/lib/utils/textConverter';
import hebrewDateFormat from '@/lib/utils/hebrewDateFormat';
import { AiOutlineCalendar, AiFillLike } from 'react-icons/ai';
import { UserAvatar } from '@/components/UserAvatar';
import Link from 'next/link';

import { Card, CardActionArea } from '@mui/material';

interface SolutionCardProps {
  author: string;
  date: string;
  likes: number;
  comments: number;
  avatar: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  author,
  date,
  likes,
  comments,
  avatar,
}) => {
  return (
    <div dir="rtl" className="my-4 h-20 p-4">
      <Card className="border border-gray-200 dark:border-gray-500">
        <CardActionArea>
          <div className="m-2 flex justify-center">
            <UserAvatar
              user={{ name: '', image: avatar }}
              className="ml-2 inline-block h-8 w-8"
            />
            <Link
              onClick={e => {
                e.stopPropagation();
              }}
              href={`/user/${author}`}
              target="_blank"
              className="pt-1 text-center font-primary text-lg font-bold hover:text-blue-500 dark:hover:text-blue-500"
            >
              {author}
            </Link>
          </div>
          <div className="mb-1 flex items-center justify-center text-sm">
            <span>{hebrewDateFormat(date)}</span>
            <AiOutlineCalendar className="ml-4 mr-1" />
            <span>{comments}</span>
            <FaRegComment className="ml-4 mr-1" />
            <span className="mr-1">{likes}</span>
            <AiFillLike className="mr-1" />
          </div>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default SolutionCard;
