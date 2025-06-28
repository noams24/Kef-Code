'use client';

import Link from 'next/link';
// import Pi from "./Pi";
import '../../styles/courseCard.scss';
import Image from 'next/image';
// import ImageFallback from "@/helpers/ImageFallback";

interface Props {
  title: string;
  link: string;
  image: string;
  chapters?: number;
  items?: number;
  children: any;
}

const CourseCard = ({
  title,
  link,
  image,
  chapters,
  items,
  children,
}: Props) => {
  return (
    <Link href={`courses/${link}`}>
      <div className="card">
        <div className="relative w-full">
          <Image
            src={image}
            className="h-60 w-60 select-none rounded-md object-cover opacity-0 transition-opacity duration-[0.5s]"
            height={300}
            width={300}
            alt="שם הקורס"
            onLoad={img => img.currentTarget.classList.remove('opacity-0')}
            priority
          />
          <div className="styletext">
            <h2 className="text max-w-[calc(100%-40px)] select-none text-2xl">
              {title}
            </h2>
          </div>
          <div className="stylescore">
            {/* {completed && <Pi completed={completed} />} */}
            {children}
          </div>
        </div>
        <div className="courseData">
          <div className="flex-col text-center">
            <p className="text-2xl">{items}</p>
            <p className="text-xs text-gray-500">שאלות</p>
          </div>
          <div className="flex-col text-center">
            <p className="text-2xl">{chapters}</p>
            <p className="text-xs text-gray-500">פרקים</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
