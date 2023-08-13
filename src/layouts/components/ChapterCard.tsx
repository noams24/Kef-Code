import React from 'react';
import Link from "next/link";

interface ChapterCardProps {
  title: string;
  link: string,
  course: string
}

const ChapterCard: React.FC<ChapterCardProps> = ({ title, link, course }) => {
  return (
    <div className="dark:bg-gray-900 text-center rounded-lg shadow-md p-6 m-1">
      <h4><Link href={`/courses/${course}/${link}`}>{title}</Link></h4>
    </div>
  );
};

export default ChapterCard;