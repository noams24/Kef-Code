'use client';

import { useDevelop, useGenerationStore } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BsList } from 'react-icons/bs';
import Breadcrumbs from '../Breadcrumbs';
import Login from '../Login';
import Logo from '../Logo';
import ThemeSwitcher from '../ThemeSwitcher';
import FullScreen from './FullScreen';
import QuestionCard from './QuestionCard';
import QuestionsDrawer from './QuestionsDrawer';
import Timer from './Timer';

// const mockData = [
//   {
//     id: 1,
//     title: "שאלה במטריצות",
//     difficulty: "קשה",
//     status: "FINISH",
//   },
//   {
//     id: 6,
//     title: "אי רציפות",
//     difficulty: "קל",
//     status: "BEGIN",
//   },
//   {
//     id: 24,
//     title: "משפט לופיטל",
//     difficulty: "בינוני",
//     status: "STUCK",
//   },
// ];

const TopBar = (problemId: any) => {
  const pathname = usePathname().split('/');
  const course = pathname[2];
  const chapter = pathname[3];
  const currentQuestion = decodeURIComponent(pathname[4].replaceAll('-', ' '));
  const [open, setOpen] = useState(false);
  const { development } = useDevelop();
  const { setSolution } = useGenerationStore();

  const { data, isLoading: isLoadingData } = useQuery({
    queryKey: ['topbar', course, chapter],
    queryFn: async () => {
      if (development) return null;
      const query = `/api/getTopBar?course=${course}&chapter=${chapter}&problemId=${problemId.problemId}`;
      const { data } = await axios.get(query);
      return data;
    },
  });

  return (
    <section>
      <QuestionsDrawer isOpen={open} setOpen={setOpen}>
        <div className="mt-5 rounded-xl">
          {data &&
            data.problems &&
            data.problems.map((item: any, index: any) => (
              <div key={index}>
                <QuestionCard
                  title={item.title}
                  difficulty={item.difficulty}
                  status={item.status}
                  currentQuestion={currentQuestion}
                  url={`/courses/${course}/${chapter}/${item.title.replaceAll(' ', '-')}`}
                />
              </div>
            ))}
        </div>
      </QuestionsDrawer>
      <div className="mx-auto mt-5 flex h-8 items-center justify-between gap-2 rounded bg-gradient-to-b from-body to-theme-light px-12 pb-3 dark:from-darkmode-body dark:to-darkmode-theme-light">
        <div className="flex h-6 w-20 cursor-pointer items-center justify-between gap-2">
          <div className="order-0 flex items-center md:order-0 lg:ml-0">
            <Login />
            <ThemeSwitcher className="mx-5" />
          </div>
          <span
            title="שאלה קודמת"
            className="custom-border text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            {data ? (
              <Link href={data.prevLink} onClick={() => setSolution(null)}>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  height="22"
                  width="22"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="22"
                width="22"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
          <span
            title="עוד שאלות"
            className="custom-border flex h-6 justify-center text-zinc-600 hover:text-black dark:text-zinc-300 hover:dark:text-white"
          >
            {data ? (
              <button className="px-[3px]" onClick={() => setOpen(true)}>
                <BsList />
              </button>
            ) : (
              <button className="px-[3px]">
                <BsList />
              </button>
            )}
          </span>
          <span
            title="שאלה הבאה"
            className="custom-border text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            {data ? (
              <Link href={data.nextLink} onClick={() => setSolution(null)}>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  height="22"
                  width="22"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="22"
                width="22"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        </div>
        {/* <BreadcrumbCompact /> */}
        <div className="-mr-36 hidden md:inline lg:-mr-24">
          <Breadcrumbs />
        </div>
        <div className="ml-4 flex h-6 items-center justify-around gap-2 rounded-lg">
          <div className="mr-0 hidden w-auto justify-end gap-2 sm:inline-flex md:mr-5 lg:w-[150px]">
            <Timer />
            <FullScreen />
          </div>
          <Logo isSmall={true} />
        </div>
      </div>
    </section>
  );
};

export default TopBar;
