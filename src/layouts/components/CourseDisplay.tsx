"use client";

import CourseCard from "@/components/CourseCard";
import { Course } from "@/types";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDevelop } from '@/store/store'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Pi from "./Pi"

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    title: string;
    description?: string;
    courses: Array<Course>;
  };
}

const CourseDisplay = ({ data, session }: { data: PageData, session:any }) => {
  const idSelector = `slider-${data.frontmatter.title}`;

  const slideLeft = () => {
    let slider: any = document.getElementById(idSelector);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider: any = document.getElementById(idSelector);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const { development } = useDevelop()

  const { data: coursePercent } = useQuery({
    queryKey: ['coursePercent'],
    queryFn: async () => {
        if (development || !session) return null
        const query = `/api/getCoursePercent`
        const { data } = await axios.get(query)
        return data
    },
},)

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <p className="text-3xl font-medium p-2">{data.frontmatter.title}</p>
      </div>
      <div className="relative flex items-center">
        <MdChevronLeft
          size={40}
          onClick={slideLeft}
          className="opacity-50 cursor-pointer hover:opacity-100"
        />
        <div
          id={idSelector}
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {data.frontmatter.courses?.map(
            ({ title, link, image, chapters, items }) => (
              <CourseCard
                key={title}
                link={link}
                title={title}
                image={image}
                chapters={chapters}
                items={items}
              >
                {!session ? null : ((coursePercent && coursePercent[link]) ? <Pi completed={String(coursePercent[link])} /> : <Pi completed={'0'} />)}
              </CourseCard>
            ),
          )}
        </div>
        <MdChevronRight
          size={40}
          onClick={slideRight}
          className="opacity-50 cursor-pointer hover:opacity-100"
        />
      </div>
    </>
  );
};

export default CourseDisplay;
