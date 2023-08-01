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
  const slideLeft = () => {
    let slider: any = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider: any = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const courses = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="relative flex items-center">
      <MdChevronLeft
        size={40}
        onClick={slideLeft}
        className="opacity-50 cursor-pointer hover:opacity-100"
      />
      <div
        id="slider"
        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
      >
        {data.frontmatter.courses.map(
          ({ title, image, chapters, items, completed }) => (
            <CourseCard
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
  );
};

export default Testimonials;
