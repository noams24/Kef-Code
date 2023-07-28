"use client";
import React, { Fragment, useState } from "react";
import { type EditorState, type SerializedEditorState } from "lexical";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { Button } from "@/components/ui/button";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "./plugins/toolbar-plugin";
import { useSharedHistoryContext } from "./context/shared-history";
import CodeHighlightPlugin from "./plugins/code-highlight-plugin";
import { EditorComposer } from "./context/lexical-composer";
import clsx from "clsx";
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export type EditorContentType = SerializedEditorState | undefined;

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

function handleSave(jsonState:any, session:any){
  if(!session){
    console.log("not logged")
    return;
  }
  console.log("logged");
  console.log(jsonState);
  console.log(session)
}

export const Editor: React.FC<{
  action: "description" | "comment" | any;
  content: EditorContentType;
  className?: string;
  session: any;
}> = ({ action, content, className, session}) => {

  const { historyState } = useSharedHistoryContext();
  const [jsonState, setJsonState] = useState<EditorContentType>(content);

  const { mutate: handleSubmit } = useMutation({
    mutationFn: async ({
      problemId,
      jsonState,
      session
    }: any) => {
      const payload: any = { problemId , jsonState }
      const { data } = await axios.post('/api/submit', payload)
      return data
    },
    onError: () => {
      console.log("error")
    },
    onSuccess: () => {
      console.log("success")
    },
  })

  return (
    <Fragment>
      <div
        className={clsx(
          "w-full rounded-[3px] border border-gray-200 shadow-sm",
          className
        )}
      >
        <EditorComposer readonly={false} jsonState={jsonState}>
          <ToolbarPlugin />
          <div className="relative">
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable className="min-h-[300px] w-full resize-none overflow-hidden text-ellipsis px-2.5 py-4 outline-none" />
              }
              placeholder={
                <div className="pointer-events-none absolute top-6 right-6 select-none px-1 text-right text-sm text-gray-500">
                   כתוב את ה{action} שלך כאן 
                </div>
              }
            />
          </div>

          <CodeHighlightPlugin />
          <ListPlugin />
          <AutoFocusPlugin />
          <OnChangePlugin
            onChange={(editor) => onChange(editor, setJsonState)}
          />
          <HistoryPlugin externalHistoryState={historyState} />
        </EditorComposer>
      </div>
      <div className="my-3 ml-5 flex gap-x-2">
      <Button
          onClick={() => handleSubmit({problemId: '1234', jsonState, session})}
          className="btn btn-outline-primary btn-sm lg:inline-block"
        >
          פרסום
        </Button>
        <Button
          onClick={() => handleSave(jsonState, session)}
          className="btn btn-outline-primary btn-sm  lg:inline-block"
        >
          שמירה
        </Button>
      </div>
    </Fragment>
  );
};
//<ContentEditable className="min-h-[100px] w-full resize-none overflow-hidden text-ellipsis px-2.5 py-4 outline-none" />