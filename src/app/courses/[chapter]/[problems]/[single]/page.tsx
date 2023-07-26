import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import { Editor } from "@/components/text-editor/editor";
import Login from "@/components/Login"

interface PageProps {
  params: {
    chapter: string,
    problems: string,
    single: string
  }
}

const singleProblem = ({ params }: PageProps) => {
  const data: RegularPage = getListPage("pages/pageproblemexample.md");
  const { frontmatter, content } = data;
  return (
    <>
    <h2 className="text-center">{params.single}</h2>
           <Login/>
            <div className="text-right flex mt-4">
              <div className="content">
                <MDXContent content={content} />
              </div>
              <div>
              <Editor
            action="פתרון"
            content={undefined}
          />
        </div>
            </div> 
    </>
  );
};

export default singleProblem;
