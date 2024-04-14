"use client";

import React from "react";
import { FaRegComment} from "react-icons/fa";
import { humanize, slugify } from "@/lib/utils/textConverter";
import hebrewDateFormat from "@/lib/utils/hebrewDateFormat";
import { AiOutlineCalendar, AiFillLike } from "react-icons/ai";
import { UserAvatar } from "@/components/UserAvatar";
import Link from "next/link";

import { Card, CardActionArea } from "@mui/material";

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
    <div dir="rtl" className="p-4 h-20 my-4">
      <Card className="border border-gray-200 dark:border-gray-500">
        <CardActionArea>
          <div className="flex justify-center m-2">
            <UserAvatar
              user={{ name: "" || null, image: avatar || null }}
              className="h-8 w-8 ml-2 inline-block"
            />
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={`/user/${author}`}
              target="_blank"
              className="pt-1 font-bold font-primary text-center text-lg hover:text-blue-500 dark:hover:text-blue-500"
            >
              {humanize(author)}
            </Link>
          </div>
          <div className="flex justify-center items-center text-sm mb-1">
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
