'use client'
import SolutionCard from './SolutionCard';
import * as React from "react"
// import PaginationControls from './PaginationControl'
import { useGenerationStoree } from '@/store/store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { useGenerationStore } from '@/store/store';

// import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'
// import { useGenerationStore } from '@/store/store';
// import { Item } from '@radix-ui/react-dropdown-menu';
interface SolutionSectionProps {
  data: any
}



const SolutionsSection: React.FC<SolutionSectionProps> = ({ data }) => {

  const { setSolution } = useGenerationStore()

  const handleClick = (id:String) => {
    setSolution(id)
  };

  // const { page } = useGenerationStoree()
  // const per_page = 5

  // mocked, skipped and limited in the real app
  // const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  // const end = start + Number(per_page) // 5, 10, 15 ...
  // const { solutionState, setSolution } = useGenerationStore()

  // const Mockdata = [
  //   { author: "ישראל ישראלי", date: "2023-08-14", likes: 42, comments: 7 },
  //   { author: "ג'ון סינה", date: "2023-08-14", likes: 18, comments: 4 },
  //   { author: "מסי", date: "2023-08-14", likes: 9, comments: 2 },
  //   { author: "משתמש24", date: "2023-08-14", likes: 42, comments: 7 },
  //   { author: "משה זוכמיר", date: "2023-08-14", likes: 42, comments: 7 },
  //   { author: "יוני חטאים", date: "2023-08-14", likes: 42, comments: 7 },
  //   { author: "אנונימי", date: "2023-08-14", likes: 42, comments: 7 },
  //   { author: "אלון מאסק", date: "2023-08-14", likes: 42, comments: 7 },
  //   { author: "סנופ דוג", date: "2023-08-14", likes: 42, comments: 7 },
  //   { author: "משתמש5", date: "2023-08-14", likes: 42, comments: 7 },
  //   { author: "משתמש21", date: "2023-08-14", likes: 42, comments: 7 }
  // ]
  // const slicedData = Mockdata.slice(start, end)

  // const develop = process.env.DATABASE_URL !== undefined && process.env.DATABASE_URL !== null;
  //get data from the db

  return (
    <>
      <div className="mt-3 dark:text-white text-center" dir="rtl">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="לייקים" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>מיין לפי</SelectLabel>
              <SelectItem value="likes">לייקים</SelectItem>
              <SelectItem value="recent">נוסף לאחרונה</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* {entries.map((item, index) => (
        <div key={index}>
          <SolutionCard author={item.author} date={item.date} likes={item.likes} comments={item.comments} />
        </div>
      ))} */}

      {/* {develop ? <div>{slicedData.map((item, index) => (
        <div key={index}>
          <SolutionCard author={item.author} date={item.date} likes={item.likes} comments={item.comments} />
        </div>
      ))} </div>

        : <div> */}
      {(!data) ? <p>אין פתרונות עדיין</p> :
        <div>
          {data?.map((item: any, index: any) => (
            
            <div key={index} onClick={() => handleClick(index)}>
              <SolutionCard author={item.user.username} date={item.createdAt} likes={item.votes.length} comments={item.comments.length} />
            </div>
          ))}</div>
      }
      {/* </div>} */}
    </>
  );
};

export default SolutionsSection;