//import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
//import { Editor } from "@/components/text-editor/editor";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import Link from "next/link";
const singleProblem = async () => {
  //const data: RegularPage = getListPage("pages/pageproblemexample.md");
  const data: RegularPage = await getListPage("pages/about.md");
  //const { frontmatter, content } = data;
  const session = await getServerSession(authOptions);
  return (
    <>
             
          
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
            {/*<div className="text-right flex mt-4">
              <div className="content">
                <MDXContent content={content} />
              </div>
              <div>
              <Editor
            action="פתרון"
            content={undefined}
          />
        </div>
            </div> */}
    </>
  );
};

export default singleProblem;
