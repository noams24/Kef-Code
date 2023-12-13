"use client";

import Split from "react-split";
import { Button } from "@/components/ui/button";
import playgroundTemplate from "./jsonFiles/empty.json";
import type { EditorDocument } from "./types";
import { type EditorState, type SerializedEditorState } from "lexical";
import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Confetti from "react-confetti";
import Editor from "@/layouts/editor/components/Editor";
import useWindowSize from "@/hooks/useWindowSize";
import SolutionSection from "./solutionSection/SolutionSection";
import { useDevelop } from "@/store/store";
import TopBar from "../topBar/TopBar";
import { db } from "@/indexedDB";
import { QueryContext } from "@/partials/ChildrenProviders";

import "./split.css";

export type EditorContentType = SerializedEditorState | undefined | any;

type WorkSpaceProps = {
  problemId: string;
  solution: any;
  userId: string | undefined;
  role: string | undefined;
};

interface Data {
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
}

async function onChange(
  state: EditorState,
  setJsonState: React.Dispatch<React.SetStateAction<EditorContentType>>,
  problemId: any,
) {
  state.read(() => {
    if (state.isEmpty()) {
      setJsonState(undefined);
      return;
    }
    setJsonState(state.toJSON());
  });
  try {
    const exists = await db.data.where("id").equals(problemId).toArray();
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
  var screenHeight = window.innerHeight;
  //save solution to db
  const { mutate: handleSave, isLoading } = useMutation({
    mutationFn: async ({ jsonState, isPublic }: any) => {
      const payload: any = { problemId, jsonState, isPublic };

      const { data } = await axios.post("/api/submit", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: "שגיאה",
        description: "לא ניתן לשמור/לפרסם את הפתרון כרגע, נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setConfetti(true);
      toast({
        title: "נשמר",
        description: "התשובה נשמרה/פורסמה בהצלחה.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: ["solution"] });
    },
  });

  // get data from the db
  const {
    data: workSpaceData,
    isLoading: isLoadingData,
    isPreviousData,
  } = useQuery({
    queryKey: ["workSpaceData", problemId],
    queryFn: async () => {
      if (development) return null;
      const query = `/api/getWorkSpace?problemId=${problemId}`;
      const { data } = await axios.get(query);
      //   const newData = {
      //     id: "1",
      //     name: "1",
      //     data: data.content.content,
      //   };
      // }
      return data as Data;
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Do something after 3 seconds
      setConfetti(false);
    }, 8000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [confetti]);

  useEffect(() => {
    async function getData() {
      try {
        setFetchingData(true);
        const exists = await db.data.where("id").equals(problemId).toArray();
        if (exists.length > 0) {
          setContent(exists[0].content);
          setJsonState(exists[0].content);
        }
        setFetchingData(false);
      } catch (error) {}
    }
    getData();
  }, []);

  return (
    <>
      {problemId && <TopBar problemId={problemId} />}
      <Split className={`split ${screenHeight > 900 ? 'h-[77vh]' : 'h-[70vh]'}`} minSize={0}>
        <SolutionSection
          workSpaceData={workSpaceData}
          problemId={problemId}
          solution={solution}
          loading={isLoadingData}
          userId={userId}
          role={role}
        />

        {/*EDITOR SECTION */}
        <div className="w-full overflow-y-auto font-arial">
          {/* {development || !userId ? (
            <Editor
              document={document}
              onChange={(editor) => onChange(editor, setJsonState, problemId)}
            />
          ) : !isLoadingData && workSpaceData ? (
            workSpaceData.content?.content ? (
              <Editor
                document={{ data: workSpaceData.content.content }}
                onChange={(editor) => onChange(editor, setJsonState, problemId)}
              />
            ) : (
              <Editor
                document={document}
                onChange={(editor) => onChange(editor, setJsonState, problemId)}
              />
            )
          ) : (
            <h3 className="flex justify-center items-center ">טוען</h3>
          )} */}
          {development ? (
            <Editor
              document={document}
              onChange={(editor) => onChange(editor, setJsonState, problemId)}
            />
          ) : fetchingData ? (
            <h3 className="flex justify-center items-center ">טוען</h3>
          ) : content ? (
            <Editor
              document={{ data: content }}
              onChange={(editor) => onChange(editor, setJsonState, problemId)}
            />
          ) : !isLoadingData && workSpaceData ? (
            workSpaceData.content?.content ? (
              <Editor
                document={{ data: workSpaceData.content.content }}
                onChange={(editor) => onChange(editor, setJsonState, problemId)}
              />
            ) : (
              <Editor
                document={document}
                onChange={(editor) => onChange(editor, setJsonState, problemId)}
              />
            )
          ) : (
            <h3 className="flex justify-center items-center ">טוען</h3>
          )}
        </div>
      </Split>

      {/* Buttons */}
      <div className="my-3 flex justify-center gap-x-2">
        <Button
          onClick={() => handleSave({ jsonState, isPublic: true })}
          disabled={isLoading}
          className="btn bg-white dark:bg-black btn-outline-primary btn-sm  lg:inline-block"
        >
          פרסום פתרון
        </Button>
        <Button
          onClick={() => handleSave({ jsonState, isPublic: false })}
          disabled={isLoading}
          className="btn bg-white dark:bg-black btn-outline-primary btn-sm  lg:inline-block"
        >
          שמירה בענן
        </Button>
      </div>
      {confetti && (
        <Confetti gravity={0.3} width={width - 1} height={height - 1} />
      )}
    </>
  );
};
export default Workspace;
