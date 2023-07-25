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
  const session = await getServerSession(authOptions);
  const data: RegularPage = getListPage("pages/about.md");
  //const { frontmatter, content } = data;
  
  return (
    <>
             
          
           
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
