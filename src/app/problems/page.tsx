import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import { Editor } from "@/components/text-editor/editor";

function handleSave() {}
function handleCancel() {}

const singleProblem = () => {
  const data: RegularPage = getListPage("pages/pageproblemexample.md");
  const { frontmatter, content } = data;

  return (
    <>
            <div className="text-right flex ">
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
