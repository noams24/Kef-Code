//import { db } from '@/lib/db'
import { generateHtml } from "@/layouts/editor/utils/generateHtml"
import parse from 'html-react-parser';
import Workspace from "@/components/workSpace/WorkSpace";
import TopBar from "@/components/topBar/TopBar";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { JSDOM } from "jsdom";
import playgroundTemplate from './example.json';
import type { EditorDocument } from './types';

import "mathlive/static.css";
import '@/layouts/editor/theme.css';


interface PageProps {
    params: {
        chapter: string,
        problems: string,
        single: string
    }
}

const singleProblem = async ({ params }: PageProps) => {
    const session = await getServerSession(authOptions);

      const dom = new JSDOM()
  global.window = dom.window as unknown as Window & typeof globalThis
  global.document = dom.window.document
  global.DocumentFragment = dom.window.DocumentFragment
  global.Element = dom.window.Element
  global.navigator = dom.window.navigator
  const document = playgroundTemplate as unknown as EditorDocument;


  const html = await generateHtml(document.data);
 
  const children = parse(html);


    {/* 
    try {
        // Fetch all records from the "Problem" table
        const problem = await db.problem.findUnique({
            where: {
                id: params.single,
            },
        })
        //console.log(problem);
    }
    catch (error) {
        console.error('Error finding problem:', error);
    }
*/}
    return (
        <>
            {/* <PageHeader title={params.single} /> */}
            <div className="my-5">
            <TopBar title={params.single} />
            </div>
            <Workspace userId={session?.user.id} problemId={params.single} solution={children}/>
        </>
    );
};
export default singleProblem;
