import React from 'react';
import Link from "next/link";

interface CourseCardProps {
  title: string;
  explanation: string;
  link: string,
}

const CourseCard: React.FC<CourseCardProps> = ({ title, explanation, link }) => {
  return (
    <div className="dark:bg-gray-900 text-center rounded-lg shadow-md p-6 m-1">
      <h4><Link href={`/courses/${link}`}>{title}</Link></h4>
      <p>{explanation}</p>
    </div>
  );
};

export default CourseCard;

{/* 
<>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title="קורסים" />
      <div className="flex justify-center p-6">
      <CourseCard
        title="אלגברה"
        explanation="אלגברה לינארית 1"
      />
      <CourseCard
        title="אלגוריתמים"
        explanation="קורס אלגוריתמים"
      />
      </div>
    </>

*/}