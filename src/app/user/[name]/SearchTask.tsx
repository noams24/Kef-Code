import React from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import SortButton from './SortButton';
import { DataObject } from './page'


interface MyComponentProps {
  handleSearchSolutions:(e: React.ChangeEvent<HTMLInputElement>) => void;
  val:string;
  sortSolutions:(status:string) => void;
  data:DataObject[];
  filterByCourse:(course:string) => void;
}

const SearchTask:React.FC<MyComponentProps>  = ({handleSearchSolutions , val , sortSolutions ,data , filterByCourse}) => {
  return (
    <div className='flex items-center w-[70%]'>
      {/* //Search Input */}
    <div className="relative w-full h-10">
  <input dir='rtl' placeholder='חפש פתרון לפי שם קורס...' 
  className="h-full w-full pl-[42px] pr-[18px] rounded-[50px]
   bg-gray-50 dark:bg-gray-500 outline-none focus:outline-1
    focus:outline-purple-500 placeholder-blue-500" 
    onChange={handleSearchSolutions}
    value={val}
    />
  <MagnifyingGlassIcon className="cursor-pointer absolute left-[9px] top-[9px] transparent" width="24" height="24"/>
    </div>
    {/*Sort feature */}
   <SortButton sortSolutions={sortSolutions} data={data} filterByCourse={filterByCourse} />
    </div>
  )
}

export default SearchTask