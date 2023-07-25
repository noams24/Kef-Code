import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { UserAccountNav } from '@/components/UserAccountNav'
import Link from "next/link";

const About = async () => {
  const data: RegularPage = getListPage("pages/about.md");
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;
  const session = await getServerSession(authOptions);
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
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
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              {image && (
                <ImageFallback
                  className="mx-auto mb-6 rounded-lg"
                  src={image}
                  width={200}
                  height={200}
                  alt={title}
                />
              )}
              <h2
                dangerouslySetInnerHTML={markdownify(title)}
                className="h3 mb-6"
              />
              <div className="content">
                <MDXContent content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
