'use client';

import Split from 'react-split';
import { useCustomToasts } from '@/hooks/use-custom-toast';
import { toast } from '@/hooks/use-toast';
import useWindowSize from '@/hooks/useWindowSize';
import { db } from '@/indexedDB';
import Editor from '@/layouts/editor/components/Editor';
import { QueryContext } from '@/partials/ChildrenProviders';
import { useDevelop } from '@/store/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { type EditorState, type SerializedEditorState } from 'lexical';
import React, { useContext, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import TopBar from '../topBar/TopBar';
import playgroundTemplate from './jsonFiles/empty.json';
import SolutionSection from './solutionSection/SolutionSection';
import type { EditorDocument } from './types';
import LinearProgress from '@mui/material/LinearProgress';

import './split.css';
import { Avatar } from '../ui/Avatar';
import { UserAvatar } from '../UserAvatar';
import Link from 'next/link';

export type EditorContentType = SerializedEditorState | undefined | any;

type WorkSpaceProps = {
  problemId: string;
  solution: any;
  userId: string | undefined;
  role: string | undefined;
};

interface Data {
  submissions: any;
  content: any;
  imageUrl: any;
  likes: number;
  dislikes: number;
  difficulty: String;
  bookmark: boolean | undefined;
  likeStatus: any;
  solutionId?: String;
  solutionArticle?: any;
  videoUrl?: any;
  totalSubmissions: number;
  solutionStart: any;
}

async function onChange(
  state: EditorState,
  setJsonState: React.Dispatch<React.SetStateAction<EditorContentType>>,
  problemId: any
) {
  state.read(() => {
    if (state.isEmpty()) {
      setJsonState(undefined);
      return;
    }
    setJsonState(state.toJSON());
  });
  try {
    const exists = await db.data.where('id').equals(problemId).toArray();
    if (exists.length > 0) {
      await db.data.update(problemId, { content: state.toJSON() });
    } else {
      await db.data.add({
        id: problemId,
        content: state.toJSON(),
      });
    }
  } catch (error) {}
}

const Workspace: React.FC<WorkSpaceProps> = ({
  problemId,
  solution,
  userId,
  role,
}) => {
  const { loginToast } = useCustomToasts();
  const document = playgroundTemplate as unknown as EditorDocument;
  const [jsonState, setJsonState] = useState<EditorContentType>(document.data);
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { development } = useDevelop();
  const [content, setContent] = useState<any>(null);
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const queryClient = useContext(QueryContext);
  //save solution to db
  const { mutate: handleSave, isLoading } = useMutation({
    mutationFn: async ({ jsonState, isPublic }: any) => {
      const payload: any = { problemId, jsonState, isPublic };

      const { data } = await axios.post('/api/submit', payload);
      return data;
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }

        if (err.response?.status === 402) {
          return toast({
            title: 'שגיאה',
            description: 'ניתן לשמור רק 3 פתרונות.',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 400) {
          return toast({
            title: 'שגיאה',
            description: 'אורך הפתרון ארוך מדי',
            variant: 'destructive',
          });
        }
      }
      toast({
        title: 'שגיאה',
        description: 'לא ניתן לשמור/לפרסם את הפתרון כרגע, נסה שוב מאוחר יותר',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      setConfetti(true);
      queryClient.invalidateQueries({ queryKey: ['solution'] });
      queryClient.invalidateQueries({ queryKey: ['workSpaceData'] });
      return toast({
        title: 'נשמר',
        description: 'התשובה נשמרה/פורסמה בהצלחה.',
        variant: 'destructive',
      });
    },
  });

  // get data from the db
  const { data: workSpaceData, isLoading: isLoadingData } = useQuery({
    queryKey: ['workSpaceData', problemId],
    queryFn: async () => {
      if (development) return null;
      const query = `/api/getWorkSpace?problemId=${problemId}`;
      const { data } = await axios.get(query);
      return data as Data;
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setConfetti(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [confetti]);

  useEffect(() => {
    async function getData() {
      try {
        setFetchingData(true);
        const exists = await db.data.where('id').equals(problemId).toArray();
        if (exists.length > 0) {
          setContent(exists[0].content);
          setJsonState(exists[0].content);
        }
        setFetchingData(false);
      } catch (error) {}
    }
    getData();
  }, []);

  const updateEditor = (newState: any) => {
    const reloadEditor = () => {
      setFetchingData(false);
    };
    setFetchingData(true);
    setTimeout(reloadEditor, 1);
    setContent(newState);
    setJsonState(newState);
  };
  return (
    <>
      {problemId && <TopBar problemId={problemId} />}
      <Split
        // className={`split ${height > 900 ? 'h-[88dvh]' : 'h-[85dvh]'}`}
        className={`split h-[85vh]`}
        minSize={0}
      >
        <SolutionSection
          workSpaceData={workSpaceData}
          problemId={problemId}
          solution={solution}
          loading={isLoadingData}
          userId={userId}
          role={role}
          updateEditor={updateEditor}
        />

        {/*EDITOR SECTION */}
        <div className="relative flex w-full flex-col overflow-y-auto rounded-lg border border-border font-arial dark:border-darkmode-border">
          {development ? (
            <Editor
              document={document}
              onChange={editor => onChange(editor, setJsonState, problemId)}
            />
          ) : fetchingData ? (
            <LinearProgress />
          ) : content ? (
            <Editor
              document={{ data: content }}
              onChange={editor => onChange(editor, setJsonState, problemId)}
            />
          ) : !isLoadingData && workSpaceData ? (
            workSpaceData.content?.content ? (
              <Editor
                document={{ data: workSpaceData.content.content }}
                onChange={editor => onChange(editor, setJsonState, problemId)}
              />
            ) : workSpaceData.solutionStart ? (
              <Editor
                document={{ data: workSpaceData.solutionStart }}
                onChange={editor => onChange(editor, setJsonState, problemId)}
              />
            ) : (
              <Editor
                document={document}
                onChange={editor => onChange(editor, setJsonState, problemId)}
              />
            )
          ) : (
            <LinearProgress />
          )}
        </div>
      </Split>

      {/* Buttons */}
      <div className="my-3 flex justify-center gap-x-3 pr-2">
        <button
          onClick={() => handleSave({ jsonState, isPublic: true })}
          disabled={isLoading}
          className="btn-outline-primary"
        >
          פרסום פתרון
        </button>
        <button
          onClick={() => handleSave({ jsonState, isPublic: false })}
          disabled={isLoading}
          className="btn-outline-primary"
        >
          שמירה בענן
        </button>
      </div>
      {confetti && (
        <Confetti gravity={0.3} width={width - 1} height={height - 1} />
      )}

      {role === 'ADMIN' && (
        <div className="absolute bottom-3 left-3 flex">
          <Link
            href={`/adminstuff?problemId=${problemId}`}
            title="admin stuff"
            target="_blank"
          >
            <UserAvatar
              user={{ name: 'admin', image: null }}
              className="h-8 w-8"
            />
          </Link>
          <Link
            href={`/addSolution?problemId=${problemId}`}
            title="add solution"
            target="_blank"
          >
            <UserAvatar
              user={{ name: 'admin', image: null }}
              className="h-8 w-8"
            />
          </Link>
        </div>
      )}
    </>
  );
};
export default Workspace;
