"use client"
import Split from 'react-split'
import { Button } from "@/components/ui/button";
import playgroundTemplate from './empty.json';
import type { EditorDocument } from './types';
import Tab from "@/shortcodes/Tab";
import Tabs from "@/shortcodes/Tabs";
import Video from "@/shortcodes/Video";
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
import "./split.css"
import { notFound } from 'next/navigation';
import dynamic from "next/dynamic";

import Editor from "@/layouts/editor/components/Editor"

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

  //TODO: discussion
  // solutionVideoUrl?: String
  // solutionArticle?: String
  //TODO: solutions?: solutions[]
}


type WorkSpaceProps = {
  userId?: any;
  problemId: string
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

const Workspace: React.FC<WorkSpaceProps> = ({ userId = null, problemId }) => {
  const { loginToast } = useCustomToasts()
  const imageUrl = "https://i.ibb.co/Gdz4BTg/problem1.png";
  // const document = playgroundTemplate as unknown as EditorDocument;

  const [document, setDocument] = useState<EditorDocument>(playgroundTemplate as unknown as EditorDocument);
  const [jsonState, setJsonState] = useState<EditorContentType>(document.data);

  //save solution to db
  const { mutate: handleSave, isLoading } = useMutation({
    mutationFn: async ({
      jsonState,
    }: any) => {
      const payload: any = { problemId, jsonState }
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
    // console.log(data)
  }, [data])

  return (
    <>
      <div className="mr-2">
        <Split className="split h-[70vh]" minSize={0} >
          <div className="content">
            <Tabs>
              <Tab name="פתרונות">כאן יופיעו פתרונות של אנשים</Tab>
              <Tab name="פתרון רשמי"><Video title="solution" height={500} width={500} src="https://joy1.videvo.net/videvo_files/video/free/video0467/large_watermarked/_import_61516692993d77.04238324_preview.mp4" /></Tab>
              <Tab name="תיאור"> 
              {!isLoadingData && <Likes difficulty={data?.difficulty} likes={Number(data?.likes)} dislikes={Number(data?.dislikes)} bookmark={data?.bookmark} likeStatus={data?.likeStatus.type}/> }
              {isLoadingData ? <div>Loading</div> : <ImageDisplay imageUrl={data?.imageUrl}/>}
              {/* {(!isLoadingData && !data?.imageUrl) ? <ImageDisplay imageUrl={imageUrl} /> : (data?.imageUrl) ? <ImageDisplay imageUrl={data?.imageUrl.img} /> : (<div>Loading</div>)} */}
            </Tab>
          </Tabs>

          <Accordion className="mt-8" title="דיון">
            <div>תגובה1</div>
            <div>תגובה2</div>
            <div>תגובה3</div>
          </Accordion>
      </div>
      <div className="w-full overflow-y-auto ">
        {(!isLoadingData) ? <Editor document={document} onChange={(editor) => onChange(editor, setJsonState)} /> : <div>Loading</div>}
      </div>
    </Split >
      <div className="my-3 flex justify-center gap-x-2">
        <Button
          className="btn bg-white dark:bg-black btn-outline-primary btn-sm  lg:inline-block"
        >
          פרסום
        </Button>
        <Button
          onClick={() => handleSave({ jsonState })}
          disabled={isLoading}
          className="btn bg-white dark:bg-black btn-outline-primary btn-sm  lg:inline-block"
        >
          שמירה
        </Button>
      </div>
      </div >
    </>
  );
};
export default Workspace;