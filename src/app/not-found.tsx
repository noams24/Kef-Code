import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import Link from "next/link";

const NotFound = () => {
  // const data: RegularPage = getListPage("pages/404.md");
  // const { image, title } = data.frontmatter;
  const title = "דף לא נמצא"
  return (
    <>
      <SeoMeta title={"דף לא נמצא"} image={"/images/404.png"} />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center sm:col-10 md:col-8 lg:col-6">
              <ImageFallback
                className="mb-8 w-full"
                src="/images/404.png"
                alt="page not found"
                height={320}
                width={630}
              />
              <h1
                className="h2 mb-4"
                dangerouslySetInnerHTML={markdownify(title)}
              ></h1>
              <div className="content">
                <MDXContent content={'דף לא נמצא'} />
              </div>
              <Link href="/" className="btn btn-primary mt-8">
                חזרה לדף הבית
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
