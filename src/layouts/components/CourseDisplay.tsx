"use client";

import CourseCard from "@/components/CourseCard";
// import { Course } from "@/types";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Pi from "./Pi";

// import 'swiper/css/navigation';
// import { useDevelop } from '@/store/store'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
// interface PageData {
//   notFound?: boolean;
//   content?: string;
//   frontmatter: {
//     enable?: boolean;
//     title: string;
//     description?: string;
//     courses: Array<Course>;
//   };
// }

// interface PageData {
//   title: string;
//   link: string;
//   image: string;
//   chapters: string;
//   items: string
// }

const CourseDisplay = ({
  data,
  coursePercent
}: {
  data: any;
  coursePercent: any;
}) => {
  const idSelector = `slider-${data.title}`;
  // const swiper = useSwiper();
  // const slideLeft = () => {
  //   let slider: any = document.getElementById(idSelector);
  //   slider.scrollLeft = slider.scrollLeft - 500;
  // };

  // const slideRight = () => {
  //   let slider: any = document.getElementById(idSelector);
  //   slider.scrollLeft = slider.scrollLeft + 500;
  // };
  // console.log(data)

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        {/* <p className="text-3xl font-medium p-1">{data.title}</p> */}
        {/* <p className="text-3xl font-medium p-1">קורסים במדעי המחשב</p>  */}
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
            {data.map((item:any) => (
              // ({ title, link, image, chapters, items }) => (
                <SwiperSlide key={item.title}>
                  <CourseCard
                    key={item.title}
                    link={item.link}
                    title={item.title}
                    image={item.image}
                    chapters={item.chapters}
                    items={item.items}
                  >
                    {!coursePercent ? null : coursePercent[item.link] ? (
                      <Pi completed={String(coursePercent[item.link])} />
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
