import { getAuthSession } from '@/lib/auth';
import Workspace from '@/components/workSpace/WorkSpace';
import { db } from '@/lib/db';
import SeoMeta from '@/partials/SeoMeta';

interface PageProps {
  params: {
    course: string;
    chapter: string;
    single: string;
  };
}
let solution: any = null;
const singleProblem = async ({ params }: PageProps) => {
  const title = decodeURIComponent(params.single.replaceAll('-', ' '));
  const session = await getAuthSession();
  const problem = await db.problem.findFirst({
    where: {
      course: params.course,
      chapter: params.chapter,
      title: title,
    },
  });

  if (!problem) return <h1 className="flex justify-center">השאלה לא קיימת</h1>;

  return (
    <div className="max-h-screen overflow-hidden">
      <SeoMeta
        // @ts-ignore
        title={`כיף קוד - ${title}`}
        // @ts-ignore
        meta_title={`כיף קוד - ${title}`}
        // @ts-ignore
        description={`כיף קוד - ${title}`}
      />
      <Workspace
        problemId={String(problem.id)}
        solution={solution}
        userId={session?.user.id}
        role={session?.user.role}
        session={session}
        problem={problem}
      />
    </div>
  );
};

singleProblem.getLayout = function getLayout(page: any) {
  return (
    <>
      {page}
      <h1>BLA</h1>
    </>
  );
};

export default singleProblem;

// import TopBar from "@/components/topBar/TopBar";
// import { generateHtml } from "@/layouts/editor/utils/generateHtml"
// import parse from 'html-react-parser';
// import { JSDOM } from "jsdom";
// import playgroundTemplate from './example.json';
// import type { EditorDocument } from './types';
// if (develop) {y
//     const dom = new JSDOM()
//     global.window = dom.window as unknown as Window & typeof globalThis
//     global.document = dom.window.document
//     global.DocumentFragment = dom.window.DocumentFragment
//     global.Element = dom.window.Element
//     global.navigator = dom.window.navigator
//     const document = playgroundTemplate as unknown as EditorDocument;

//     const html = await generateHtml(document.data);

//     solution = parse(html);
// }

{
  /* <PageHeader title={params.single} /> */
}
{
  /* <div className="my-5"> */
}
{
  /* <TopBar title={params.single} /> */
}
{
  /* </div> */
}
