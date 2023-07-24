import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";

const singleProblem = () => {
  const data: RegularPage = getListPage("pages/pageproblemexample.md");
  const { frontmatter, content } = data;

  return (
    <>
            <div className="text-left md:col-10 lg:col-7">
              <div className="content">
                <MDXContent content={content} />
              </div>
            </div>
    </>
  );
};

export default singleProblem;
