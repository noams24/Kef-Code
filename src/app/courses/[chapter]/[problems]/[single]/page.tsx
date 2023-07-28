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

interface PageProps {
  params: {
    chapter: string,
    problems: string,
    single: string
  }
}

const singleProblem = async ({ params }: PageProps) => {
  const data: RegularPage = getListPage("pages/pageproblemexample.md");
  const { frontmatter, content } = data;
  const session = await getServerSession(authOptions);
  //const [isWritingComment, setIsWritingComment] = useState(false);

  return (
    <>
      <h2 className="text-center">{params.single}</h2>
      {/*<Login/> */}
      {session?.user ? (
        <UserAccountNav user={session.user} />
      ) : (
        <Link
          className="btn btn-outline-primary btn-sm hidden lg:inline-block"
          href="/sign-in"
        >
          כניסה
        </Link>
      )}
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