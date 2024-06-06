"use client";
import type { EditorState, LexicalEditor } from "lexical";
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
// import { IS_MOBILE } from "./shared/environment";
import { editorConfig } from "./config";
import { EditorPlugins } from "./plugins";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { MutableRefObject } from "react";
import "./styles.css";

export const Editor: React.FC<{
  initialConfig: Partial<InitialConfigType>;
  editorRef?: MutableRefObject<LexicalEditor | null>;
  onChange: (editorState: EditorState) => void;
}> = ({ initialConfig, onChange, editorRef }) => {
  // const disableContextMenu = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  // ) => {
  //   if (IS_MOBILE) e.preventDefault();
  // };
  return (
    <LexicalComposer initialConfig={{ ...editorConfig, ...initialConfig }}>
      <>
        <ToolbarPlugin />
        <EditorPlugins
          contentEditable={
            <ContentEditable className="editor-input" />
          }
          onChange={onChange}
        />
        {/*@ts-ignore */}
        {editorRef && <EditorRefPlugin editorRef={editorRef} />}
        {/* {process.env.NODE_ENV === "development" && <TreeViewPlugin />} */}
      </>
    </LexicalComposer>
  );
};

export default Editor;
