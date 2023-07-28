import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import { Editor } from "@/components/text-editor/editor";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getSinglePage } from "@/lib/contentParser";

interface PageProps {
    params: {
        chapter: string,
        problems: string,
        single: string
    }
}

// generate static params
export const generateStaticParams: () => { single?: string }[] = () => {
    const problems: any = getSinglePage("problemss");
  
    const paths = problems.map((problem:any) => ({
      single: problem.slug,
    }));
  
    return paths;
  };

const singleProblem = async ({ params }: PageProps) => {
    const data: RegularPage = getListPage("pages/pageproblemexample.md");
    const { frontmatter, content } = data;
    //const session = await getServerSession(authOptions);
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
                        session={undefined}
                    />
                </div>
            </div>
        </>
    );
};

export default singleProblem;