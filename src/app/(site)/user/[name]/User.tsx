"use client";
import { UserAvatar } from "@/components/UserAvatar";
import { SiGoogledocs } from "react-icons/si";
import Link from "next/link";
import hebrewDateFormat from "@/lib/utils/hebrewDateFormat";
import { Share } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import { Snackbar } from "@mui/material";
import dictionary from "@/content/dictionary.json";
import SearchTask from "./SearchTask";
import { DataObject, UserObject } from "./page";
import PublicIcon from "@mui/icons-material/Public";
import { Chip } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

interface MyComponentProps {
  // data: DataObject[];
  data:any;
  user: UserObject;
  localUser: boolean;
}

const User: React.FC<MyComponentProps> = ({ user, data, localUser }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<DataObject[]>(data);
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusTime, setStatusTime] = useState<string>("createdAt");

  const handleShare = (id: any) => {
    navigator.clipboard
      .writeText(`https://kef-code.vercel.app/view/${id}`)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
  };

  const searchSolutions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const filteredData: any = data.filter(
      (solution: any) =>
        solution.title?.includes(e.target.value),
    );
    setSolutions(filteredData);
  };

  const sortSolutionsBy = (status: string) => {
    if (status === "אקראי") return setSolutions(data);
    if (status === "אלפביתי")
      return setSolutions(
        solutions
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title)),
      );

    const statusSort = status === "עודכן לאחרונה" ? "updatedAt" : "createdAt";
    const sortedArray = solutions.slice().sort((a, b) => {
      const dateA = a[statusSort].getTime();
      const dateB = b[statusSort].getTime();

      return dateB - dateA;
    });
    setStatusTime(statusSort);
    setSolutions(sortedArray);
  };

  const SortCoursesBy = (course: string) => {
    if (course === "הכל") return setSolutions(data);
    const sortByCourse = data.filter(
      (solution:any) => (dictionary as any)[solution.course] === course,
    );
    setSolutions(sortByCourse);
  };

  return (
    <div className="w-full min-h-screen pt-8">
      <Snackbar
        open={isCopied}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          הקישור הועתק
        </Alert>
      </Snackbar>

      <div className="flex flex-col w-full h-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between w-full p-2 border border-gray-700 rounded-sm gap-x-5 h-36">
          <div className="flex flex-col justify-between w-full h-full ">
            <div>
              <h3 dir="rtl" className="mt-8 font-primary">
                {user?.username}
              </h3>
            </div>
          </div>
          <div className="">
            <UserAvatar
              user={{ name: "" || null, image: user?.image || null }}
              className="w-32 h-32"
            />
          </div>
        </div>
        <div className="flex items-center h-24 w-full justify-end">
          <SearchTask
            handleSearchSolutions={searchSolutions}
            val={searchInput}
            sortSolutions={sortSolutionsBy}
            data={solutions}
            filterByCourse={SortCoursesBy}
          />
        </div>
        <div dir="rtl" className="flex flex-col w-full mt-8 gap-y-5 ">
          <div className="flex justify-between w-full">
            <h4>פתרונות</h4>
            <div className="flex items-center justify-center">
              {/* <button
                    // type="button"
                    className="px-5 py-[0.8em] text-sm h-10 font-medium text-white bg-gray-800 rounded-l-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    <BiDownload />
                  </button> */}
              {/* 
                  <select className="h-10 text-sm font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ">
                    <option value="">Updated</option>
                    <option value="">Created</option>
                    <option value="">Name</option>
                  </select> */}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {solutions.map((item: any, index: any) => (
              <div
                className="overflow-clip p-2 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-800 dark:border-gray-400 rounded-sm"
                key={index}
              >
                <Link href={`/view/${item.id}`}>
                  <div className="flex justify-between space-x-3 w-80 ">
                    <SiGoogledocs className="" size={30} />
                    <div className="w-full gap-y-1 pr-2 ">
                      <h5 className="font-bold font-primary">
                        {item.title}
                      </h5>
                      <span className="text-sm">
                        {/* @ts-ignore */}
                        {dictionary[item.course]} - {/* @ts-ignore */}
                        {dictionary[item.chapter]}
                      </span>
                      <div className="text-sm">
                        {hebrewDateFormat(item[statusTime])}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pr-2">
                    <button
                      title="שיתוף"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleShare(item.id);
                      }}
                    >
                      <Share />
                    </button>
                    {localUser && item.isPublic && <Chip
                      sx={{ width: 0, flex: 1, maxWidth: "fit-content" }}
                      icon={<PublicIcon />}
                      label={"פורסם"}
                      dir="ltr"
                    />}
                       {localUser && item.isPublic === false && <Chip
                      sx={{ width: 0, flex: 1, maxWidth: "fit-content" }}
                      icon={<SaveIcon />}
                      label={"שמור"}
                      dir="ltr"
                    />}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

// const data :DataObject[] = [
//   {
//     id: "1",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     problem:{
//      chapter:"bases",
//      course:"algorithms",
//      difficulty:"קשה",
//      id:1,
//      img:"https://uploadthing.com/f/497afd25-86ff-4705-abab-378854e93917_q1.png",
//      title:"בלות לינארית"
//     },
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T19:34:51.140Z"),
//     updatedAt: new Date("2023-08-20T19:34:51.140Z"),
//     isPublic: true,
//     videoUrl: "B1J6Ou4q8vE",
//   },
//   {
//     id: "3",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     problem:{
//       chapter:"bases",
//       course:"data-structures",
//       difficulty:"קשה",
//       id:1,
//       img:"https://uploadthing.com/f/497afd25-86ff-4705-abab-378854e93917_q1.png",
//       title:"אלות לינארית"
//      },
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T19:22:51.140Z"),
//     updatedAt: new Date("2023-10-20T19:22:51.140Z"),
//     isPublic: true,
//     videoUrl: null,
//   },
//   {
//     id: "cllkt8q460001mg08cgwccsat",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     problem:{
//       chapter:"bases",
//       course:"algebra-1",
//       difficulty:"קשה",
//       id:1,
//       img:"https://uploadthing.com/f/497afd25-86ff-4705-abab-378854e93917_q1.png",
//       title:"גלות לינארית"
//      },
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T19:00:51.140Z"),
//     updatedAt: new Date("2023-01-20T19:00:51.140Z"),
//     isPublic: true,
//     videoUrl: null,
//   },
//   {
//     id: "cllkt9i0r0001mh08ikegn95k",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     problem:{
//       chapter:"bases",
//       course:"algebra-2",
//       difficulty:"קשה",
//       id:1,
//       img:"https://uploadthing.com/f/497afd25-86ff-4705-abab-378854e93917_q1.png",
//       title:"ללות לינארית"
//      },
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T17:34:51.140Z"),
//     updatedAt: new Date("2023-02-20T17:34:51.140Z"),
//     isPublic: true,
//     videoUrl: null,
//   },
//   {
//     id: "cllkta3k20003mh08dlgbi8mp",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     problem:{
//       chapter:"bases",
//       course:"probability",
//       difficulty:"קשה",
//       id:1,
//       img:"https://uploadthing.com/f/497afd25-86ff-4705-abab-378854e93917_q1.png",
//       title:"תלות לינארית"
//      },
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T20:34:51.140Z"),
//     updatedAt: new Date("2023-03-20T20:34:51.140Z"),
//     isPublic: true,
//     videoUrl: null,
//   },
// ];
