//import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import { Editor } from "@/components/text-editor/editor";
//import { authOptions } from '@/lib/auth'
//import { getServerSession } from 'next-auth'
//import { getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeaderr";
import Tab from "@/shortcodes/Tab";
import Tabs from "@/shortcodes/Tabs";
import Video from "@/shortcodes/Video";
import Likes from "@/shortcodes/Likes";
import Accordion from "@/shortcodes/Accordion";
import ImageDisplay from "@/components/ImageDisplay"

interface PageProps {
    params: {
        chapter: string,
        problems: string,
        single: string
    }
}

const singleProblem = async ({ params }: PageProps) => {
    //const data: RegularPage = getListPage("pages/pageproblemexample.md");
    //const { frontmatter, content } = data;
    //const session = await getServerSession(authOptions);
    const imageUrl = "https://i.ibb.co/Gdz4BTg/problem1.png";
    return (
        <>
            <PageHeader title={params.single} />
                <div className="text-right flex mt-4 justify-center gap-10">
                    <div className="content">
                        <Tabs>
                            <Tab name="פתרונות">כאן יופיעו פתרונות של אנשים</Tab>
                            <Tab name="פתרון רשמי"><Video title="solution" height={500} width={500} src="https://joy1.videvo.net/videvo_files/video/free/video0467/large_watermarked/_import_61516692993d77.04238324_preview.mp4" /></Tab>
                            <Tab name="תיאור"> <Likes /> <ImageDisplay imageUrl={imageUrl} /></Tab>
                        </Tabs>
                        <Accordion title="דיון">
                            תגובה1
                            תגובה2
                            תגובה3
                        </Accordion>
                        <Accordion title="שאלות דומות">
                            שאלה1
                            2שאלה
                            שאלה3
                        </Accordion>
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