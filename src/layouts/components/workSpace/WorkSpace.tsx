"use client"
import Split from 'react-split'
import { Button } from "@/components/ui/button";
import playgroundTemplate from './jsonFiles/empty.json';
import type { EditorDocument } from './types';
import Tab from "@/shortcodes/Tab";
import Tabs from "@/shortcodes/Tabs";
// import Video from "@/shortcodes/Video";
import Likes from "@/shortcodes/Likes";
import Accordion from "@/shortcodes/Accordion";
import ImageDisplay from "@/components/ImageDisplay"
import { type EditorState, type SerializedEditorState } from "lexical";
import React, { useState, useEffect } from "react";
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
// import DisplaySolution from './DisplaySolution';
import "./split.css"
// import { notFound } from 'next/navigation';
// import dynamic from "next/dynamic";
import Confetti from 'react-confetti';
import Editor from "@/layouts/editor/components/Editor"
import useWindowSize from '@/hooks/useWindowSize';
import Youtube from '@/shortcodes/Youtube';
import SolutionCard from './solutionSection/SolutionCard';
import { useGenerationStore } from '@/store/store';
import { AiOutlineClose } from 'react-icons/ai';
import SolutionsSection from './solutionSection/SolutionsSection';
import Solution from './solutionSection/Solution';
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import CommentsSection from '../comments/CommentsSection'
// import CommentsSection from '../components/CommentsSection'
// const Editor = dynamic(() => import("@/layouts/editor/components/Editor"), { ssr: false, loading: () => <div>Loadin</div> });
export type EditorContentType = SerializedEditorState | undefined | any;

interface Data {
  content: EditorDocument | undefined;
  imageUrl: any;
  likes: number;
  dislikes: number;
  difficulty: String;
  bookmark: boolean | undefined;
  likeStatus: any;
  solutionArticle?: any
  //TODO: discussion
  // solutionVideoUrl?: String

  //TODO: solutions?: solutions[]
}

type WorkSpaceProps = {
  userId?: any;
  problemId: string,
  solution: any
  children: any
};

function onChange(
  state: EditorState,
  setJsonState: React.Dispatch<React.SetStateAction<EditorContentType>>
) {
  state.read(() => {
    if (state.isEmpty()) {
      setJsonState(undefined);
      return;
    }
    setJsonState(state.toJSON());
  });
}

const Workspace: React.FC<WorkSpaceProps> = ({ userId = null, problemId, solution, children }) => {
  // const document = playgroundTemplate as unknown as EditorDocument;
  const { loginToast } = useCustomToasts()
  const imageUrl = "https://i.ibb.co/Gdz4BTg/problem1.png";
  const [document, setDocument] = useState<EditorDocument>(playgroundTemplate as unknown as EditorDocument);
  const [jsonState, setJsonState] = useState<EditorContentType>(document.data);
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { solutionState, setSolution } = useGenerationStore()


  // const development = (process.env.NODE_ENV !== "development")
  const development = process.env.DATABASE_URL !== undefined && process.env.DATABASE_URL !== null;
  //save solution to db
  const { mutate: handleSave, isLoading } = useMutation({
    mutationFn: async ({ jsonState, isPublic }: any) => {
      const payload: any = { problemId, jsonState, isPublic }
      const { data } = await axios.post('/api/submit', payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }
      toast({
        title: 'There was an error.',
        description: 'Could not create subreddit.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      setConfetti(true)
      toast({
        title: 'נשמר',
        description: 'התשובה נשמרה בהצלחה.',
        variant: 'destructive',
      })
    },
  })

  //get data from the db
  const { isFetching, data, refetch, isFetched, isLoading: isLoadingData } = useQuery({
    queryFn: async () => {
      const query = `/api/getWorkSpace?problemId=${problemId}&userId=${userId}`
      const { data } = await axios.get(query)
      return data as Data
    },
  })
  // if (!isFetching && !data?.imageUrl) {
  //   notFound()
  // }

  useEffect(() => {
    if (data?.content) {
      const newData = { "id": "1", "name": "1", "data": data.content.content }
      setDocument(newData as EditorDocument)
      setJsonState(newData.data)
    }
  }, [data])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Do something after 3 seconds
      setConfetti(false)
    }, 8000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [confetti]);

  return (
    <>
      <Split className="split h-[70vh]" minSize={0} >
        <div className="overflow-y-auto scrollbar-hide">
          <Tabs>
            <Tab name="פתרונות">
              {solutionState ?
                <div className="px-5">
                  <div className="sticky top-0">
                    <button onClick={() => setSolution(null)} className="dark:text-white hover:bg-gray-400 ">
                      <AiOutlineClose />
                    </button>
                  </div>
                  <Solution author="ישראל ישראלי" date="2023-08-14" likes={42} comments={0} content={solution} />
                </div>
                : <SolutionsSection problemId={'1'} />}
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
                <ImageDisplay imageUrl={imageUrl} /> </div>
                :
                <div className="my-2">
                  {!isLoadingData && data && <Likes problemId={problemId} difficulty={data?.difficulty} likes={Number(data?.likes)} dislikes={Number(data?.dislikes)} bookmark={data?.bookmark} likeStatus={data?.likeStatus} />}
                  {isLoadingData ? <div>Loading</div> : data && <div className="mt-5"><ImageDisplay imageUrl={data?.imageUrl} /></div>}
                </div>}
              <Accordion className="mt-8" title="דיון">
                {children}
              </Accordion>
            </Tab>
          </Tabs>


        </div>
        <div className="w-full overflow-y-auto ">
          {development ? <Editor document={document} onChange={(editor) => onChange(editor, setJsonState)} /> :
            <div>{(!isLoadingData) ? <Editor document={document} onChange={(editor) => onChange(editor, setJsonState)} /> : <div>Loading</div>}</div>}
        </div>
      </Split >
      <div className="my-3 flex justify-center gap-x-2">
        <Button
          onClick={() => handleSave({ jsonState, isPublic: true })}
          disabled={isLoading}
          className="btn bg-white dark:bg-black btn-outline-primary btn-sm  lg:inline-block"
        >
          פרסום
        </Button>
        <Button
          onClick={() => handleSave({ jsonState, isPublic: false })}
          disabled={isLoading}
          className="btn bg-white dark:bg-black btn-outline-primary btn-sm  lg:inline-block"
        >
          שמירה
        </Button>
      </div>
      {confetti && <Confetti gravity={0.3} width={width - 1} height={height - 1} />}
    </>
  );
};
export default Workspace;