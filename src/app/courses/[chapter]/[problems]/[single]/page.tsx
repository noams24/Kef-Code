import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import { Editor } from "@/components/text-editor/editor";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import Link from "next/link";
import { type SerializedEditorState } from "lexical";
//import { Fragment, useRef, useState } from "react";
//import Login from "@/components/Login"
//import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { submitCreationRequest, submitValidator } from '@/lib/validators/submit'
//import { toast } from '@/hooks/use-toast'
import { getSinglePage } from "@/lib/contentParser";

interface PageProps {
  params: {
    chapter: string,
    problems: string,
    single: string
  }
}

export const generateStaticParams: () => { single?: string }[] = () => {
  const problems: any = getSinglePage("problemss");

  const paths = problems.map((problem:any) => ({
    single: problem.slug,
  }));

  return paths;
};

const singleProblem = async ({ params }: PageProps) => {
  //const data: RegularPage = getListPage("pages/pageproblemexample.md");
  const problems: any = getSinglePage("problemss");
  const problem = problems.filter((page:any) => page.slug === params.single)[0];
  const { frontmatter, content } = problem;
  const session = await getServerSession(authOptions);
  //const [isWritingComment, setIsWritingComment] = useState(false);

  return (
    <>
      <h2 className="text-center">{params.single}</h2>
      <div className="text-right flex mt-4">
        <div className="content">
          <MDXContent content={content} />
        </div>
        <div>
          <Editor
            action="פתרון"
            content={undefined}
            session={session}
          />
        </div>
      </div>
    </>
  );
};

export default singleProblem;