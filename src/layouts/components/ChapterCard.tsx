import React from 'react';

import Link from "next/link";
import Pi from './Pi';

interface ChapterCardProps {
  title: string;
  link: string,
  course: string
  complete: string
  index: number
}

const ChapterCard: React.FC<ChapterCardProps> = ({ title, link, course, complete, index }) => {
  return (
    <div className="hover:chapter-card-container-hover hover:dark:chapter-card-container-hover-dark">
      <Link href={`/courses/${course}/${link}`}>
        <div className="flex flex-grow items-center">
          <h4 dir='rtl' className='text-lg font-semibold hover:text-blue-900 dark:text-gray-300 dark:hover:text-blue-50'>{`פרק ${index + 1}: ${title}`}</h4>
          <div className='w-14 pl-4'>
            <Pi completed={complete} />
          </div>
        </div>
        <div className='flex justify-end mr-14'>
          מספר שאלות
        </div>
      </Link>
    </div>
  );
};

export default ChapterCard;