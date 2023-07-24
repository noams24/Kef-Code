import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

const singleProblem = () => {
  const data: RegularPage = getListPage("pages/pageproblemexample.md");
  const { frontmatter, content } = data;
  //const { title, meta_title, description, image } = frontmatter;

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
