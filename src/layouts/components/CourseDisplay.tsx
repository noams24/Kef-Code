"use client";

import CourseCard from "@/components/CourseCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Pi from "./Pi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCallback, useRef } from "react";

const CourseDisplay = ({
  data,
  coursePercent,
}: {
  data: any;
  coursePercent: any;
}) => {
  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    //@ts-ignore
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    //@ts-ignore
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
        <div className="flex justify-center items-center w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          <div>
            <MdChevronLeft
              size={40}
              className="opacity-50 cursor-pointer hover:opacity-100"
              onClick={handlePrev}
            />
          </div>
          <Swiper
            ref={sliderRef}
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
            {data.map((item: any) => (
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
            ))}
          </Swiper>
          <div>
            <MdChevronRight
              size={40}
              className="opacity-50 cursor-pointer hover:opacity-100 "
              onClick={handleNext}
            />
          </div>
      </div>
  );
};

export default CourseDisplay;
