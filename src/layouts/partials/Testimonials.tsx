"use client";

import CourseCard from "@/components/CourseCard";
import { Course, Testimonial } from "@/types";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

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

const Testimonials = ({ data }: { data: PageData }) => {
  const idSelector = `slider-${data.frontmatter.title}`;

  const slideLeft = () => {
    let slider: any = document.getElementById(idSelector);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider: any = document.getElementById(idSelector);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

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
            ({ title, image, chapters, items, completed }) => (
              <CourseCard
                key={title}
                title={title}
                image={image}
                chapters={chapters}
                items={items}
                completed={completed}
              />
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

export default Testimonials;
