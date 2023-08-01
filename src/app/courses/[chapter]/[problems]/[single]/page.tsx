//import MDXContent from "@/helpers/MDXContent";
//import { getListPage } from "@/lib/contentParser";
//import { RegularPage } from "@/types";
//import { Editor } from "@/components/text-editor/editor";
//import { authOptions } from '@/lib/auth'
//import { getServerSession } from 'next-auth'
//import { getSinglePage } from "@/lib/contentParser";
//import { db } from '@/lib/db'
//import ProblemDescription from "@/components/problemDescription";

import Workspace from "@/components/workSpace/WorkSpace";
import PageHeader from "@/partials/PageHeaderr";
import Login from "@/components/Login";

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
    {/* 
    try {
        // Fetch all records from the "Problem" table
        const problem = await db.problem.findUnique({
            where: {
                id: params.single,
            },
        })
        //console.log(problem);
    }
    catch (error) {
        console.error('Error finding problem:', error);
    }
*/}
    return (
        <>
            <Login />
            <PageHeader title={params.single} />
            <Workspace/>
        </>
    );
};

export default singleProblem;
//<Tab name="תיאור"> <Likes/> <ImageDisplay imageUrl={imageUrl} /></Tab>
//  <Tab name="תיאור"> <ProblemDescription problem={'1234'} /></Tab>