"use client"

import Split from 'react-split'
import { Button } from "@/components/ui/button";
import playgroundTemplate from './jsonFiles/empty.json';
import type { EditorDocument } from './types';
import { type EditorState, type SerializedEditorState } from "lexical";
import React, { useState, useEffect } from "react";
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import Confetti from 'react-confetti';
import Editor from "@/layouts/editor/components/Editor"
import useWindowSize from '@/hooks/useWindowSize';
import SolutionSection from './solutionSection/SolutionSection';

import "./split.css"

export type EditorContentType = SerializedEditorState | undefined | any;

type WorkSpaceProps = {
  problemId: string,
  solution: any
  userId: string | undefined,
  children: any
};

interface Data {
  content: any;
  imageUrl: any;
  likes: number;
  dislikes: number;
  difficulty: String;
  bookmark: boolean | undefined;
  likeStatus: any;
  solutionArticle?: any
  videoUrl?: any
  totalSubmissions: number
}

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

const Workspace: React.FC<WorkSpaceProps> = ({ problemId, solution, userId, children }) => {
  const { loginToast } = useCustomToasts()

  const [document, setDocument] = useState<EditorDocument>(playgroundTemplate as unknown as EditorDocument);
  const [jsonState, setJsonState] = useState<EditorContentType>(document.data);
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // const development = process.env.DATABASE_URL !== undefined && process.env.DATABASE_URL !== null;
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

  // get data from the db
  const { data: workSpaceData, isLoading: isLoadingData } = useQuery({
    queryFn: async () => {
      const query = `/api/getWorkSpace?problemId=${problemId}`
      const { data } = await axios.get(query)
      return data as Data
    },
  })

  // const { data: editorContent, isLoading: isLoadingEditor } = useQuery({
  //   queryFn: async () => {
  //     const query = `/api/getEditor?problemId=${problemId}`
  //     const { data } = await axios.get(query)
  //     return data
  //   },
  // })

  // if (!isFetching && !data?.imageUrl) {
  //   notFound()
  // }

  useEffect(() => {
    if (workSpaceData && workSpaceData.content) {
      const newData = { "id": "1", "name": "1", "data": workSpaceData.content.content }
      setDocument(newData as unknown as EditorDocument)
      setJsonState(newData.data)
    }
  }, [workSpaceData])

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
        <SolutionSection workSpaceData={workSpaceData} problemId={problemId} solution={solution} loading={isLoadingData} userId={userId}>
          {children}
        </SolutionSection>
        {/*EDITOR SECTION */}
        <div className="w-full overflow-y-auto ">
          {(!isLoadingData && workSpaceData) ? <Editor document={document} onChange={(editor) => onChange(editor, setJsonState)} /> : <div>Loading</div>}
          {/* <Editor document={document} onChange={(editor) => onChange(editor, setJsonState)} /> */}
        </div>
      </Split >

      {/* Buttons */}
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