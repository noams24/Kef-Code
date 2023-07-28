import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import { Editor } from "@/components/text-editor/editor";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeaderr";

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
    //const session = await getServerSession(authOptions);
    return (
        <>
            <PageHeader title={params.single}/>
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