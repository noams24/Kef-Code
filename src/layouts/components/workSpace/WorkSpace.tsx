"use client"
import Split from 'react-split'
import { Button } from "@/components/ui/button";
import Editor from "@/layouts/editor/components/Editor"
import playgroundTemplate from './example.json';
import type { EditorDocument } from './types';
import Tab from "@/shortcodes/Tab";
import Tabs from "@/shortcodes/Tabs";
import Video from "@/shortcodes/Video";
import Likes from "@/shortcodes/Likes";
import Accordion from "@/shortcodes/Accordion";
import ImageDisplay from "@/components/ImageDisplay"
import { type EditorState, type SerializedEditorState } from "lexical";
import React, { useState } from "react";
import "./split.css"

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



const Workspace: React.FC<any> = () => {
  const imageUrl = "https://i.ibb.co/Gdz4BTg/problem1.png";
  const document = playgroundTemplate as unknown as EditorDocument;
  const [jsonState, setJsonState] = useState<EditorContentType>(document.data);
  return (
    <>
      <div className="mr-2">
        <Split className="split" minSize={0}>
          <div className="content">
            <Tabs>
              <Tab name="פתרונות">כאן יופיעו פתרונות של אנשים</Tab>
              <Tab name="פתרון רשמי"><Video title="solution" height={500} width={500} src="https://joy1.videvo.net/videvo_files/video/free/video0467/large_watermarked/_import_61516692993d77.04238324_preview.mp4" /></Tab>
              <Tab name="תיאור"> <Likes /> <ImageDisplay imageUrl={imageUrl} /></Tab>
            </Tabs>
            <Accordion title="דיון">
              תגובה1
              תגובה2
              תגובה3
            </Accordion>
            <Accordion title="שאלות דומות">
              שאלה1
              2שאלה
              שאלה3
            </Accordion>
          </div>

          <div className="p-8 w-full overflow-y-auto h-[70vh]">
            <Editor document={document} onChange={(editor) => onChange(editor, setJsonState)} />
          </div>


        </Split>
        <div className="my-3 flex justify-center gap-x-2">
          <Button
            className="btn bg-white dark:bg-black btn-outline-primary btn-sm  lg:inline-block"
          >
            פרסום
          </Button>
          <Button
            className="btn bg-white dark:bg-black btn-outline-primary btn-sm  lg:inline-block"
          >
            שמירה
          </Button>
        </div>
      </div>
    </>
  );
};
export default Workspace;