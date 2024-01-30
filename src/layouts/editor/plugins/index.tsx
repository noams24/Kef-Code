"use client"
import { type EditorState, type LexicalEditor } from "lexical";
import { useSharedHistoryContext } from "../context/SharedHistoryContext";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { TablePlugin } from './TablePlugin';
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import MarkdownPlugin from "./MarkdownPlugin/MarkdownShortcutPlugin";
import ListMaxIndentLevelPlugin from "./ListPlugin/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./CodePlugin/CodeHighlightPlugin";
import AutoLinkPlugin from "./LinkPlugin/AutoLinkPlugin";
import TableCellActionMenuPlugin from './TablePlugin/TableActionMenuPlugin';
import TableCellResizer from './TablePlugin/TableCellResizer';
import FloatingToolbarPlugin from "./FloatingToolbar";
import HorizontalRulePlugin from "./HorizontalRulePlugin";
import MathPlugin from "./MathPlugin";
import ImagePlugin from "./ImagePlugin";
import SketchPlugin from './SketchPlugin';
import GraphPlugin from './GraphPlugin';
import StickyPlugin from './StickyPlugin';
import ClickableLinkPlugin from './LinkPlugin/ClickableLinkPlugin';
import ComponentPickerMenuPlugin from './ComponentPickerPlugin';
import TabFocusPlugin from './TabFocusPlugin';
import DragDropPaste from './DragDropPastePlugin';
// import DraggableBlockPlugin from './DraggableBlockPlugin'
import EmojiPickerPlugin from './EmojiPickerPlugin';
import CollapsiblePlugin from "./CollapsiblePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TableNode } from "../nodes/TableNode";
import { ImageNode } from "../nodes/ImageNode";
import { SketchNode } from "../nodes/SketchNode";
import { GraphNode } from "../nodes/GraphNode";
import { StickyNode } from "../nodes/StickyNode";
import { LayoutContainerNode } from "../nodes/LayoutNode";
import { LayoutPlugin } from "./LayoutsPlugin";
import { CollapsibleContainerNode } from "./CollapsiblePlugin/CollapsibleContainerNode";
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { usePathname } from "next/navigation";

export const EditorPlugins: React.FC<{
  contentEditable: React.ReactElement;
  placeholder?: JSX.Element | ((isEditable: boolean) => JSX.Element | null) | null;
  onChange?: (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void;
  initialConfig: Partial<InitialConfigType>;
}> = ({ contentEditable, placeholder = null, onChange, initialConfig }) => {
  const [editor] = useLexicalComposerContext();
  const { historyState } = useSharedHistoryContext();
  const pathname = decodeURIComponent(usePathname());
const WS_SERVER_URL = "ws://localhost:1234/"
// const WS_SERVER_URL = "wss://omniknight.10pines-labs.workers.dev/chat";
  const randomId = () => Math.floor(Math.random() * 100_000).toString();
  const randomUsername = Math.floor(Math.random() * 100_000).toString()
  
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const roomId = searchParams.get("roomId") || "default-room-id";
  const username = searchParams.get("username") || randomUsername;
  
  const collaborativeRoom = {
    id: roomId,
    serverUrl: WS_SERVER_URL,
    userId: randomId(),
    username,
  };

  return (
    <>
      <RichTextPlugin contentEditable={contentEditable} ErrorBoundary={LexicalErrorBoundary} placeholder={placeholder} />
      <HistoryPlugin externalHistoryState={historyState} />
      {onChange && <OnChangePlugin ignoreHistoryMergeTagChange ignoreSelectionChange onChange={onChange} />}
      <ListPlugin />
      <CheckListPlugin />
      <LinkPlugin />
      <ClickableLinkPlugin />
      <TabFocusPlugin />
      <TabIndentationPlugin />
      <ListMaxIndentLevelPlugin maxDepth={7} />
      <MarkdownPlugin />
      <FloatingToolbarPlugin />
      <HorizontalRulePlugin />
      {editor.hasNode(TableNode) && <TablePlugin />}
      {editor.hasNode(TableNode) && <TableCellActionMenuPlugin /> }
      {editor.hasNode(TableNode) && <TableCellResizer /> }
      <ComponentPickerMenuPlugin />
      <EmojiPickerPlugin />
      <MathPlugin />
      {editor.hasNode(ImageNode) && <ImagePlugin />}
      {editor.hasNode(SketchNode) && <SketchPlugin />}
      {editor.hasNode(GraphNode) && <GraphPlugin />}
      {editor.hasNode(StickyNode) && <StickyPlugin />}
      <DragDropPaste />
      {editor.hasNode(LayoutContainerNode) && <LayoutPlugin />}
      {/* <DraggableBlockPlugin /> */}
      <CodeHighlightPlugin />
     {editor.hasNode(CollapsibleContainerNode) && <CollapsiblePlugin />}
     <CollaborationPlugin
            id={pathname}
          // id={collaborativeRoom.id}
          //@ts-ignore
          providerFactory={(id, yjsDocMap) => {
            const doc = new Y.Doc();
            yjsDocMap.set(id, doc);
            // console.log(id, doc)
            return new WebsocketProvider(collaborativeRoom.serverUrl, id, doc, {
              params: { userId: collaborativeRoom.userId },
            });
          }}
          initialEditorState={null}
          // initialEditorState={initialConfig.editorState}
          shouldBootstrap={true}
          username={collaborativeRoom.username}
          
        />
      <AutoLinkPlugin />
    </>
  );
};
