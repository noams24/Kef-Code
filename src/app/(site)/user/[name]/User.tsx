'use client';
import { UserAvatar } from '@/components/UserAvatar';
import dictionary from '@/content/dictionary.json';
import hebrewDateFormat from '@/lib/utils/hebrewDateFormat';
import { Share } from '@mui/icons-material';
import PublicIcon from '@mui/icons-material/Public';
import SaveIcon from '@mui/icons-material/Save';
import { Chip, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import React, { useState } from 'react';
import { SiGoogledocs } from 'react-icons/si';
import SearchTask from './SearchTask';
import { DataObject, UserObject } from './page';

interface MyComponentProps {
  // data: DataObject[];
  data: any;
  user: UserObject;
  localUser: boolean;
}

const User: React.FC<MyComponentProps> = ({ user, data, localUser }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<DataObject[]>(data);
  const [searchInput, setSearchInput] = useState<string>('');
  const [statusTime, setStatusTime] = useState<string>('createdAt');

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
    const filteredData: any = data.filter((solution: any) =>
      solution.title?.includes(e.target.value)
    );
    setSolutions(filteredData);
  };

  const sortSolutionsBy = (status: string) => {
    if (status === 'אקראי') return setSolutions(data);
    if (status === 'אלפביתי')
      return setSolutions(
        solutions.slice().sort((a, b) => a.title.localeCompare(b.title))
      );

    const statusSort = status === 'עודכן לאחרונה' ? 'updatedAt' : 'createdAt';
    const sortedArray = solutions.slice().sort((a, b) => {
      const dateA = a[statusSort].getTime();
      const dateB = b[statusSort].getTime();

      return dateB - dateA;
    });
    setStatusTime(statusSort);
    setSolutions(sortedArray);
  };

  const SortCoursesBy = (course: string) => {
    if (course === 'הכל') return setSolutions(data);
    const sortByCourse = data.filter(
      (solution: any) => (dictionary as any)[solution.course] === course
    );
    setSolutions(sortByCourse);
  };

  return (
    <div className="min-h-screen w-full pt-8">
      <Snackbar
        open={isCopied}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          הקישור הועתק
        </Alert>
      </Snackbar>

      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
        <div className="flex h-36 w-full items-center justify-between gap-x-5 rounded-sm border border-gray-700 p-2">
          <div className="flex h-full w-full flex-col justify-between">
            <div>
              <h3 dir="rtl" className="mt-8 font-primary">
                {user?.username}
              </h3>
            </div>
          </div>
          <div className="">
            <UserAvatar
              user={{
                name: user?.username || null,
                image: user?.image || null,
              }}
              className="h-32 w-32"
            />
          </div>
        </div>
        <div className="flex h-24 w-full items-center justify-end">
          <SearchTask
            handleSearchSolutions={searchSolutions}
            val={searchInput}
            sortSolutions={sortSolutionsBy}
            data={solutions}
            filterByCourse={SortCoursesBy}
          />
        </div>
        <div dir="rtl" className="mt-8 flex w-full flex-col gap-y-5">
          <div className="flex w-full justify-between">
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
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {solutions.map((item: any, index: any) => (
              <div
                className="overflow-clip rounded-sm border border-gray-800 p-2 hover:bg-gray-100 dark:border-gray-400 dark:hover:bg-slate-800"
                key={index}
              >
                <Link href={`/view/${item.id}`}>
                  <div className="flex w-80 justify-between space-x-3">
                    <SiGoogledocs className="" size={30} />
                    <div className="w-full gap-y-1 pr-2">
                      <h5 className="font-primary font-bold">{item.title}</h5>
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
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleShare(item.id);
                      }}
                    >
                      <Share />
                    </button>
                    {localUser && item.isPublic && (
                      <Chip
                        sx={{ width: 0, flex: 1, maxWidth: 'fit-content' }}
                        icon={<PublicIcon />}
                        label={'פורסם'}
                        dir="ltr"
                      />
                    )}
                    {localUser && item.isPublic === false && (
                      <Chip
                        sx={{ width: 0, flex: 1, maxWidth: 'fit-content' }}
                        icon={<SaveIcon />}
                        label={'שמור'}
                        dir="ltr"
                      />
                    )}
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
