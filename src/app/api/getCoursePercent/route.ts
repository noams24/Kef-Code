import { db } from '@/lib/db'
import { getAuthSession } from "@/lib/auth"

export async function GET(req: Request) {
    const session = await getAuthSession()
    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }
    try {
        const query = `select course, COUNT(*) as completed from Problem p join problemStatus ps on p.id = ps.problemId where ps.userId = '${session.user.id}' and status = 'FINISH' group by course`
        const courseCompleted = await db.$queryRawUnsafe(query)
        // console.log(courseCompleted)


        const courseItems = await db.$queryRawUnsafe('select course, COUNT(*) as items from Problem group by course')
        // console.log(courseItems)
        let results:any = {}
        if (Array.isArray(courseCompleted) && Array.isArray(courseItems)) {
            for (let i = 0; i < courseCompleted.length; i++) {
                // console.log(courseCompleted[i].completed)
                let numberOfItems:any = courseItems.filter(item => item.course === courseCompleted[i].course)[0].items

                // console.log(numberOfItems)
                // console.log(courseCompleted[i].completed)
                // console.log(courseItems.filter(item => item.course === courseCompleted[i].course))
                results[courseCompleted[i].course] = (Number(courseCompleted[i].completed) / Number(numberOfItems)) * 100
            }
        }
        // console.log(results)


        return new Response(JSON.stringify(results))
    }
    catch (error) {
        // console.log("error", error)
        return new Response('Could not fetch courses percents', { status: 500 })
    }
}

// const courseItems = await db.problem.groupBy({
//     by: ["course"],
//     _count: {
//         course: true,
//     },
// });

// const courseCompleted = await db.problem.groupBy({
//       by: ["course"],
//       _count: {
//         course: true,
//       },
//     });
// console.log(courseCompleted)