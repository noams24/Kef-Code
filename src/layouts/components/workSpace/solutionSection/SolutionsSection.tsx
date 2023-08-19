'use client'
import SolutionCard from './SolutionCard';
import * as React from "react"
import PaginationControls from './PaginationControl'
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

interface SolutionSectionProps {
    problemId: String
}


const data = [
    {author: "ישראל ישראלי", date: "2023-08-14", likes: 42, comments: 7},
    {author: "ג'ון סינה", date: "2023-08-14", likes: 18, comments: 4},
    {author: "מסי", date: "2023-08-14", likes: 9, comments: 2},
    {author: "משתמש24", date: "2023-08-14", likes: 42, comments: 7},
    {author: "משה זוכמיר", date: "2023-08-14", likes: 42, comments: 7},
    {author: "יוני חטאים", date: "2023-08-14", likes: 42, comments: 7},
    {author: "אנונימי", date: "2023-08-14", likes: 42, comments: 7},
    {author: "אלון מאסק", date: "2023-08-14", likes: 42, comments: 7},
    {author: "סנופ דוג", date: "2023-08-14", likes: 42, comments: 7},
    {author: "משתמש5", date: "2023-08-14", likes: 42, comments: 7},
    {author: "משתמש21", date: "2023-08-14", likes: 42, comments: 7}
  ]

  const SolutionsSection: React.FC<SolutionSectionProps> = ({ problemId }) => {
    const { page, setPage } = useGenerationStoree()
    const per_page = 5
  
    // mocked, skipped and limited in the real app
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page) // 5, 10, 15 ...
  
    const entries = data.slice(start, end)
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
            {entries.map((item, index) => (
      <div key={index}>
        <SolutionCard author={item.author} date={item.date} likes={item.likes} comments={item.comments} />
        </div>
        // <p key={entry}>{entry}</p>
      ))}
      <PaginationControls
        hasNextPage={end < data.length}
        hasPrevPage={start > 0}
        numberOfItems= {data.length}
      />
        </>
    );
};

export default SolutionsSection;