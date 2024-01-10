"use client";
import Editor from "@/layouts/editor/components/Editor";
import playgroundTemplate from "@/layouts/components/workSpace/jsonFiles/Playground.json";
import type { EditorDocument } from "@/types";
import { type EditorState, type SerializedEditorState } from "lexical";
import { useState } from "react";

const PlayGround = () => {
  const documentt = playgroundTemplate as unknown as EditorDocument;
  const [jsonState, setJsonState] = useState(documentt.data);

  function onChange(
    state: EditorState,
    setJsonState: React.Dispatch<
      React.SetStateAction<SerializedEditorState | undefined | any>
    >,
  ) {
    state.read(() => {
      if (state.isEmpty()) {
        setJsonState(undefined);
        return;
      }
      setJsonState(state.toJSON());
    });
  }

  return (
    <div className="h-[90vh] overflow-y-auto font-arial mx-44">
      <Editor
        document={documentt}
        onChange={(editor) => onChange(editor, setJsonState)}
      />
    </div>
  );
};

export default PlayGround;