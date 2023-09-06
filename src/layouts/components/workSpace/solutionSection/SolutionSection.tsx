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
import { useDevelop } from '@/store/store'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import parse from 'html-react-parser';
import Status from '@/components/Status'

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
import CommentsSection from "@/components/comments/CommentsSection";
import DescriptionCommentsSection from "@/components/comments/DescriptionCommentsSection";
// import CommentsSection from "@/components/comments/CommentsSectionn";

interface SolutionSectionProps {
    workSpaceData: any,
    problemId: string,
    solution: any,
    userId: string | undefined,
    loading: any,
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ workSpaceData, problemId, solution, userId, loading }) => {

    const { solutionState, setSolution } = useGenerationStore()
    const { page } = useGenerationStoree()
    const [sortBy, setSort] = useState('likes')
    const { development } = useDevelop()

    const { data: soltionSectionData, refetch, isFetching } = useQuery({
        queryKey: [page],
        queryFn: async () => {
            if (development) return null
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
                                <Solution data={soltionSectionData[Number(solutionState)]} userId={userId} />
                                {/* <Solution author="ישראל ישראלי" date="2023-08-14" likes={42} comments={0} content={soltionSectionData[0].html} /> */}
                            </div>
                            : <div>
                                {soltionSectionData ?
                                    <div>
                                        <div className="mt-3 dark:text-white text-center" dir="rtl">
                                            <Select onValueChange={(e) => (sortData(e))}>
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder="לייקים" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel dir='rtl'>מיין לפי</SelectLabel>
                                                        <SelectItem dir='rtl' value="likes">לייקים</SelectItem>
                                                        <SelectItem dir='rtl' value="recent">נוסף לאחרונה</SelectItem>
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
                        {development ? solution : (workSpaceData && workSpaceData.solutionArticle)
                            ? parse(workSpaceData.solutionArticle) : null}
                        {/* <Accordion className="mt-8" title="דיון">
                            <CommentsSection problemId={1} comments={[]} userId={userId} />
                        </Accordion> */}
                    </div>
                </Tab>
                <Tab name="תיאור">
                    {development ? <div>
                        <Likes problemId={problemId} difficulty={'קל'} likes={5} dislikes={2} bookmark={undefined} likeStatus={undefined} />
                        <ImageDisplay imageUrl={"https://i.ibb.co/Gdz4BTg/problem1.png"} /> </div>
                        :
                        <div className="my-2">
                            <div className="flex justify-between items-center ml-20">
                            <p></p>
                            {loading ? <LikesSkeleton /> : <Likes problemId={problemId} difficulty={workSpaceData.difficulty} likes={Number(workSpaceData.likes)} dislikes={Number(workSpaceData.dislikes)} bookmark={workSpaceData.bookmark} likeStatus={workSpaceData.likeStatus} />}
                            {userId ? <Status problemId={problemId}/> : <div className="ml-20"> </div>}
                            </div>
                            <div className="mt-5 flex justify-center">
                                {loading ? <ImageSkeleton /> : <ImageDisplay imageUrl={workSpaceData?.imageUrl} />}
                            </div>
                        </div>}
                    <Accordion className="mt-8" title="דיון">
                        <DescriptionCommentsSection ID={problemId} type='problem' comments={[]} userId={userId} />
                    </Accordion>
                </Tab>
            </Tabs>
        </div>
    )
}

export default SolutionSection