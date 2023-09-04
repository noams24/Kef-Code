'use client'

import Tab from "@/shortcodes/Tab";
import Tabs from "@/shortcodes/Tabs";
import Solution from './Solution';
import Feed from './Feed';
import Pagination from './Pagination'
import { AiOutlineClose } from 'react-icons/ai';
import Youtube from '@/shortcodes/Youtube';
import ImageDisplay from "@/components/ImageDisplay"
import Likes from "@/components/Likes";
import Accordion from "@/shortcodes/Accordion";
import { useGenerationStore } from '@/store/store';
import { useGenerationStoree } from '@/store/store';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import parse from 'html-react-parser';

import "mathlive/static.css";
import '@/layouts/editor/theme.css';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"
import { useState } from "react";
import ImageSkeleton from "@/components/skeletons/ImageSkeleton";
import LikesSkeleton from "@/components/skeletons/LikesSkeletion";

interface SolutionSectionProps {
    workSpaceData: any,
    problemId: any,
    solution: any,
    children: any,
    loading: any,
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ workSpaceData, problemId, solution, children, loading }) => {

    const { solutionState, setSolution } = useGenerationStore()
    const { page } = useGenerationStoree()
    const [sortBy, setSort] = useState('likes')

    const development = process.env.DATABASE_URL !== undefined && process.env.DATABASE_URL !== null;

    const { data: soltionSectionData, refetch, isFetching } = useQuery({
        queryKey: [page],
        queryFn: async () => {
            const query = `/api/getSolutions?problemId=${problemId}&page=${page}&sortBy=${sortBy}`
            const { data } = await axios.get(query)
            return data
        },
        keepPreviousData: true,
    },)

    const sortData: any = (e: any) => {
        setSort(e)
        refetch()
    }
    // if (workSpaceData){
    //     // console.log(workSpaceData)
    // }
    return (
        <div className="overflow-y-auto scrollbar-hide">
            <Tabs>
                <Tab name="פתרונות">
                    {(workSpaceData && workSpaceData.totalSubmissions === 0) ? <h3 className="flex justify-center">אין פתרונות להצגה</h3> : 
                    (solutionState || solutionState === 0) ?
                        <div className="px-5">
                            <div className="sticky top-0">
                                <button onClick={() => setSolution(null)} className="dark:text-white hover:bg-gray-400 ">
                                    <AiOutlineClose />
                                </button>
                            </div>
                            <Solution data={soltionSectionData[Number(solutionState)]} />
                            {/* <Solution author="ישראל ישראלי" date="2023-08-14" likes={42} comments={0} content={soltionSectionData[0].html} /> */}
                        </div>
                        : <div>
                            {soltionSectionData ?
                                <div>
                                    <div className="mt-3 dark:text-white text-center" dir="rtl">
                                        <Select onValueChange={(e) => (sortData(e))}>
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
                                    {isFetching ? <p>טוען</p> : <Feed data={soltionSectionData} />}
                                </div>
                                : <p>טוען..</p>}
                            {soltionSectionData && workSpaceData && <Pagination totalPages={Math.ceil(workSpaceData.totalSubmissions / 5)} />}
                        </div>}

                </Tab>
                <Tab name="פתרון רשמי">
                    <div className="mt-5">
                        {development ? <Youtube id="B1J6Ou4q8vE" title={'פתרון'} /> :
                         (workSpaceData && workSpaceData.videoUrl) ? <Youtube id={workSpaceData.videoUrl} title={'פתרון'} /> : null}
                    </div>
                    <div className="px-5">
                       {development ? solution : (workSpaceData && workSpaceData.solutionArticle) ? parse(workSpaceData.solutionArticle) : null }
                    </div>
                </Tab>
                <Tab name="תיאור">
                    {development ? <div>
                        <Likes problemId={problemId} difficulty={'קל'} likes={5} dislikes={2} bookmark={undefined} likeStatus={undefined} />
                        <ImageDisplay imageUrl={"https://i.ibb.co/Gdz4BTg/problem1.png"} /> </div>
                        :
                        <div className="my-2">
                            {loading ? <LikesSkeleton/> : <Likes problemId={problemId} difficulty={workSpaceData.difficulty} likes={Number(workSpaceData.likes)} dislikes={Number(workSpaceData.dislikes)} bookmark={workSpaceData.bookmark} likeStatus={workSpaceData.likeStatus} />}
                            <div className="mt-5 flex justify-center">
                                {loading ? <ImageSkeleton/> : <ImageDisplay imageUrl={workSpaceData?.imageUrl} /> }
                            </div>
                        </div>}
                    <Accordion className="mt-8" title="דיון">
                        {children}
                        {/* Comment Section */}
                    </Accordion>
                </Tab>
            </Tabs>
        </div>
    )
}

export default SolutionSection