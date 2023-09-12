import { db } from '@/lib/db'
import { getAuthSession } from "@/lib/auth"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const course = url.searchParams.get('course')
    const chapter = url.searchParams.get('chapter')
    const problemId = url.searchParams.get('problemId')
    if (!course || !chapter || !problemId) return new Response('Invalid query', { status: 400 })
    const session = await getAuthSession()
    try {
        let problems: any = await db.problem.findMany({
            where: {
                course,
                chapter,
            },
            select: {
                id: true,
                title: true,
                difficulty: true,
            },
            orderBy: {
                difficulty: 'desc',
            },
        })

        // for (let i = 0; i < problems.length; i++) problems[i].status = "BEGIN"
        problems.forEach((problem: { status: string }) => {
            problem.status = "BEGIN";
        });

        if (session) {
            const query = `select id, status from Problem p join problemStatus ps on p.id = ps.problemId where course = '${course}' and chapter = '${chapter}' and ps.userId = '${session.user.id}'`
            const problemStatus = await db.$queryRawUnsafe(query)

            if (Array.isArray(problemStatus)) {
                for (const p of problemStatus) {
                    const index = Number(problems.findIndex((item: { id: any }) => item.id === p.id))
                    problems[index].status = p.status
                }
            }
        }

            const currentIndex = Number(problems.findIndex((item: { id: any }) => String(item.id) === problemId))
            let prevIndex = currentIndex - 1
            if (currentIndex === 0)
                prevIndex = problems.length - 1

            let nextIndex = currentIndex + 1
            if (currentIndex === problems.length - 1)
                nextIndex = 0

            const newResults = {
                problems: problems,
                prevLink: `/courses/${course}/${chapter}/${problems[prevIndex].id}`,
                nextLink: `/courses/${course}/${chapter}/${problems[nextIndex].id}`
            }
            return new Response(JSON.stringify(newResults))
        }
    catch (error) {
            return new Response(null)
            // return new Response('Could not fetch problems', { status: 500, })
        }
    }



            //     if (session) {
        //     const resultss = await db.problem.findMany({
        //         where: {
        //             course,
        //             chapter,
        //         },
        //         include: {
        //             problemStatus: {
        //                 where : {
        //                     userId: session.user.id,
        //                 }
        //             }
        //         },
        //         orderBy: {
        //             difficulty: 'desc',
        //         },
        //     })
        //     console.log(resultss)
        // }
