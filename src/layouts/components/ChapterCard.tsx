import React from 'react';
import Link from "next/link";

interface ChapterCardProps {
  title: string;
  explanation: string;
  link: string,
}

const ChapterCard: React.FC<ChapterCardProps> = ({ title, explanation, link }) => {
  return (
    <div className="dark:bg-gray-900 text-center rounded-lg shadow-md p-6 m-1">
      <h4><Link href={`/courses/${link}`}>{title}</Link></h4>
      <p>{explanation}</p>
    </div>
  );
};

export default ChapterCard;