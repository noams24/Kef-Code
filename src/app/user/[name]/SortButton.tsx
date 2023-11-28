'use client'

import React, { useEffect, useMemo, useState , useRef } from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import dictionary from "@/content/dictionary.json";



const SortButton = ({ sortSolutions , data , filterByCourse} : any) => {
  const [toggleSortModal, setToggleSortModal] = useState<boolean>(false);
  const [modalTop, setModalTop] = useState<string>('110');
  const [sortStatus, setSortStatus] = useState<string>('אקראי');
  const [currentCourse, setCurrentCourse] = useState<string>('הכל');
  const [courses, setCourses] = useState<string[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  const getCourses = () => {
   const namesOfCourses = data.map((course:any) => (dictionary as any)[course.problem.course]);
   namesOfCourses.unshift("הכל")
   setCourses(namesOfCourses)
  }

   useMemo(() => {
    getCourses();
   },[])

   useEffect(() => {
    if(toggleSortModal && modalRef.current){
     const distanceTop = modalRef.current.offsetTop;
     if(distanceTop < 54) setModalTop('152');
    }
  },[toggleSortModal])


   useEffect(() => {
    sortSolutions(sortStatus);
   },[sortStatus])

   useEffect(() => {
    filterByCourse(currentCourse);
   },[currentCourse])
   

  return (
    <div className="relative flex ml-3 items-center justify-center px-[10px] py-[6.75px] h-10 bg-gray-50 dark:bg-gray-900 rounded-md">
      <MixerHorizontalIcon
        onClick={() => setToggleSortModal((prev) => !prev)}
        className="cursor-pointer transparent"
        width="24"
        height="27"
      />
      {toggleSortModal && (
        <div ref={modalRef} style={{bottom:`-${modalTop}px`}} className={`z-[101] absolute right-2 px-[10px] py-[10px] rounded-md border border-blue-600 min-w-[400px] md:min-w-0 md:w-[863px] min-h-[120px] md:min-h-[80px] p-5 bg-gray-50 dark:bg-gray-600`}>
          <div className="flex flex-col justify-center h-full gap-[22px]">
            <div
              className="flex gap-4 md:gap-[26px] justify-center md:justify-normal md:items-center"
              dir="rtl"
            >
              <span className="body-roman text-gray-500 dark:text-gray-400 w-[60px] max-w-[60px]">
                מיון לפי
              </span>
              <div className="flex gap-[18px] md:gap-10 flex-wrap w-full">
                {statuses.map((sort,index) => (
                  <div key={index} className="flex items-center gap-[7px]">
                    <input
                      className="cursor-pointer"
                      type="radio"
                      name="sort"
                      value={sort}
                      checked={sort === sortStatus}
                      onChange={() => setSortStatus(sort)}
                    />
                    <label>{sort}</label>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex gap-4 md:gap-[26px] justify-center md:justify-normal md:items-center"
              dir="rtl"
            >
              <span className="body-roman text-gray-500 dark:text-gray-400 w-[120px] min-w-[120px]">
                מיון לפי קורסים
              </span>
              <div className="flex flex-wrap w-full gap-4">
              {courses.map((course,index) => (
                  <div key={index} className="flex items-center gap-[7px]">
                    <input
                      className="cursor-pointer"
                      type="radio"
                      name="course"
                      value={course}
                      checked={course === currentCourse}
                      onChange={() => setCurrentCourse(course)}
                    />
                    <label>{course}</label>
                  </div>
                ))}
                </div>
            </div>
            <div className="absolute -top-[0.75rem] right-[10px] -mb-[1px] inline-block overflow-hidden">
              <div className="h-3 w-[18px] origin-bottom-left rotate-45 transform border border-blue-600 bg-gray-50 dark:bg-gray-500 "></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;

const statuses:string[] = ["אקראי", "עודכן לאחרונה", "נוצר לאחרונה","אלפביתי"];
