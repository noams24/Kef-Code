'use client'

import Tab from "@/shortcodes/Tab";
import Tabs from "@/shortcodes/Tabs";
import Solution from './Solution';
import Feed from './Feed';
import PaginationControls from './PaginationControl'
import { AiOutlineClose } from 'react-icons/ai';
import Youtube from '@/shortcodes/Youtube';
import ImageDisplay from "@/components/ImageDisplay"
import Likes from "@/components/Likes";
import Accordion from "@/shortcodes/Accordion";
import { useGenerationStore } from '@/store/store';
import { useGenerationStoree } from '@/store/store';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// import type { EditorDocument } from './types';

interface SolutionSectionProps {
    workSpaceData: any,
    problemId: any,
    solution: any,
    children: any,
}

interface Data {
    imageUrl: any;
    likes: number;
    dislikes: number;
    difficulty: String;
    bookmark: boolean | undefined;
    likeStatus: any;
    solutionArticle?: any
    //TODO: discussion
    // solutionVideoUrl?: String
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ workSpaceData, problemId, solution, children}) => {

    const { solutionState, setSolution } = useGenerationStore()
    const { page } = useGenerationStoree()
    const development = process.env.DATABASE_URL !== undefined && process.env.DATABASE_URL !== null;

    const { data: soltionSectionData, isPreviousData, isFetching } = useQuery({
        queryKey: ['solutions', page],
        queryFn: async () => {
            const query = `/api/getSolutions?problemId=${problemId}&page=${page}`
            const { data } = await axios.get(query)
            return data
        },
        keepPreviousData: true
    })

    // const { data: problemDescription } = useQuery({
    //     queryFn: async () => {
    //         const query = `/api/getProblemDescription?problemId=${problemId}`
    //         const { data } = await axios.get(query)
    //         return data
    //         // return data as Data
    //     },
    // })

    return (
        <div className="overflow-y-auto scrollbar-hide">
            <Tabs>
                <Tab name="פתרונות">
                    {(solutionState || solutionState === 0) ?
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
                            {soltionSectionData ? <Feed data={soltionSectionData} /> : <p>טוען..</p>}
                            {soltionSectionData && <PaginationControls hasNextPage={soltionSectionData.hasMore} hasPrevPage={page != 1} numberOfItems={1} />}
                            </div>}
            
                </Tab>
                <Tab name="פתרון רשמי">
                    <div className="mt-5">
                        <Youtube id="B1J6Ou4q8vE" title={'פתרון'} />
                    </div>
                    <div className="px-5">
                        {solution}
                    </div>
                </Tab>
                <Tab name="תיאור">
                    {development ? <div>
                        <Likes problemId={problemId} difficulty={'קל'} likes={5} dislikes={2} bookmark={undefined} likeStatus={undefined} />
                        <ImageDisplay imageUrl={"https://i.ibb.co/Gdz4BTg/problem1.png"} /> </div>
                        :
                        <div className="my-2">
                            {workSpaceData && <Likes problemId={problemId} difficulty={workSpaceData.difficulty} likes={Number(workSpaceData.likes)} dislikes={Number(workSpaceData.dislikes)} bookmark={workSpaceData.bookmark} likeStatus={workSpaceData.likeStatus} /> }
                            <div className="mt-5 flex justify-center">
                                <ImageDisplay imageUrl={workSpaceData?.imageUrl} />
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