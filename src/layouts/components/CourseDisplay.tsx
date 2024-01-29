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
  isMath,
}: {
  data: any;
  coursePercent: any;
  isMath?: boolean;
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

  let breakPoints = {
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
  };

  if (isMath) {
    Object.assign(breakPoints, {
      1800: {
        slidesPerView: 8,
      },
    });
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div>
        <MdChevronLeft
          size={40}
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={handlePrev}
        />
      </div>
      <Swiper
        ref={sliderRef}
        breakpoints={breakPoints}
        
      >
        {data.map((item: any) => (
          <SwiperSlide key={item.title} >
            <div className="flex justify-center">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <MdChevronRight
          size={40}
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default CourseDisplay;
