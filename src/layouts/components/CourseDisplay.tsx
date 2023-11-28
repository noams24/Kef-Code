"use client";

import CourseCard from "@/components/CourseCard";
import { Course } from "@/types";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Pi from "./Pi";
import "swiper/css";
// import 'swiper/css/navigation';
// import { useDevelop } from '@/store/store'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

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

const CourseDisplay = ({
  data,
  coursePercent,
}: {
  data: PageData;
  coursePercent: any;
}) => {
  const idSelector = `slider-${data.frontmatter.title}`;
  const swiper = useSwiper();
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
        <p className="text-3xl font-medium p-1">{data.frontmatter.title}</p>
      </div>
      <div className="relative flex items-center">
        {/* <MdChevronLeft
          size={40}
          onClick={slideLeft}
          className="opacity-50 cursor-pointer hover:opacity-100"
        /> */}
        <div
          id={idSelector}
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          <Swiper
            // modules={[Autoplay, Pagination, Navigation]}
            // navigation={true}
            loopedSlides={2}
            centeredSlides={false}
            spaceBetween={0}
            pagination={{ clickable: true }}
            breakpoints={{
              450: {
                slidesPerView: 2,
              },
              620: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 4,
              },
              1100: {
                slidesPerView: 5,
              },
              1500: {
                slidesPerView: 6,
              },
              1700: {
                slidesPerView: 7,
              },
              2000: {
                slidesPerView: 8,
              },
            }}
          >
            {data.frontmatter.courses?.map(
              ({ title, link, image, chapters, items }) => (
                <SwiperSlide key={title}>
                  <CourseCard
                    key={title}
                    link={link}
                    title={title}
                    image={image}
                    chapters={chapters}
                    items={items}
                  >
                    {!coursePercent ? null : coursePercent[link] ? (
                      <Pi completed={String(coursePercent[link])} />
                    ) : (
                      <Pi completed={"0"} />
                    )}
                  </CourseCard>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </div>
        {/* <MdChevronRight
          size={40}
          onClick={slideRight}
          className="opacity-50 cursor-pointer hover:opacity-100"
        /> */}
      </div>
    </>
  );
};

export default CourseDisplay;
