import { generateHtml } from "@/layouts/editor/utils/generateHtml"
import parse from 'html-react-parser';
import playgroundTemplate from './Playground.json';
import type { EditorDocument } from './types';
import { JSDOM } from "jsdom";
// import ViewDocument from "@/components/ViewEditorContent";

import "mathlive/static.css";
import '@/layouts/editor/theme.css';
import DisplaySolution from "@/components/workSpace/DisplaySolution";

const page = () => {
  // const dom = new JSDOM()
  // global.window = dom.window as unknown as Window & typeof globalThis
  // global.document = dom.window.document
  // global.DocumentFragment = dom.window.DocumentFragment
  // global.Element = dom.window.Element
  // global.navigator = dom.window.navigator
  const document = playgroundTemplate as unknown as EditorDocument;
  // //  console.log(document.data)
  // const html = await generateHtml(document.data);
  // //   // console.log(html)
  // const children = parse(html);
  return (
    <>
      {/* {children} */}
      {/* <ViewDocument >{children}</ViewDocument> */}
      <DisplaySolution document={document}/>
    </>
  );
};
export default page;
