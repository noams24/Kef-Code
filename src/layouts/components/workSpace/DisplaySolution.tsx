import { generateHtml } from "@/layouts/editor/utils/generateHtml"
import parse from 'html-react-parser';
import { JSDOM } from "jsdom";
import playgroundTemplate from './Playground.json';
import type { EditorDocument } from './types';
// import "mathlive/static.css";
// import '@/layouts/editor/theme.css';


// const DisplaySolution:any = async (document: any) => {
//     // const dom = new JSDOM()
//     // global.window = dom.window as unknown as Window & typeof globalThis
//     // global.document = dom.window.document
//     const html = await generateHtml(document);
//     // console.log(html)
//     const displaySolution = parse(html);
//     return (
//         <>
//             {displaySolution}
//         </>
//     )
// }
// export default DisplaySolution

export default async function DisplaySolution(document:any) {
  const dom = new JSDOM()
  global.window = dom.window as unknown as Window & typeof globalThis
  global.document = dom.window.document
  global.DocumentFragment = dom.window.DocumentFragment
  global.Element = dom.window.Element
  global.navigator = dom.window.navigator
  // const documentt = playgroundTemplate as unknown as EditorDocument;
  // console.log(documentt.data)
  //  console.log(document.data)
  const html = await generateHtml(document.document.data);
  //   // console.log(html)
  const children = parse(html);
  
    return <>{children}</>;
  }