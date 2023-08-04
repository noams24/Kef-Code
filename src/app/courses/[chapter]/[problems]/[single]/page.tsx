//import { db } from '@/lib/db'

import Workspace from "@/components/workSpace/WorkSpace";
import TopBar from "@/components/topBar/TopBar";

interface PageProps {
    params: {
        chapter: string,
        problems: string,
        single: string
    }
}

const singleProblem = async ({ params }: PageProps) => {
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
            {/* <PageHeader title={params.single} /> */}
            <div className="my-5">
            <TopBar title={params.single} />
            </div>
            <Workspace/>
        </>
    );
};
export default singleProblem;
