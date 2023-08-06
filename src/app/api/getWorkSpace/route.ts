import { db } from '@/lib/db'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req: Request) {
    const url = new URL(req.url)
    const course = url.searchParams.get('course')
    const chapter = url.searchParams.get('chapter')
    const title = url.searchParams.get('title')
    const userId = url.searchParams.get('userId')
    if (!course || !chapter || !title) return new Response('Invalid query', { status: 400 })
    try {
        let content = null
        if (userId) {
            // result = await prisma.$queryRaw`SELECT * FROM User`
            const problemId = await db.problem.findFirst({
                where: {
                    course: course,
                    chapter: chapter,
                    title: title,
                },
                select: {
                    id: true,
                },
            })

            if (problemId) {
                content = await db.submissions.findFirst({
                    where: {
                        problemId: problemId.id,
                        userId: userId,
                    },
                    select: {
                        content: true,
                    },
                })
            }
        }


        // if (userId) {
        // let query = `select content from Submissions where userId = ${userId} 
        //                and problemId = (select problemId from Problem 
        //                 where course = '${course}' and chapter = '${chapter}' and title = '${title})'`
        //     let query = `select * from Problem`
        //     content = await prisma.$queryRaw`${query}`
        // }
        // let query = `select`
        // const imageUrl = await prisma.$queryRaw`${query}`

        const imageUrl = await db.problem.findFirst({
            where: {
                course: course,
                chapter: chapter,
                title: title,
            },
            select: {
                img: true,
            }
        })

        const result = {
            content: content,
            imageUrl: imageUrl,
        }
        return new Response(JSON.stringify(result))
    }

    catch (error) {
        return new Response('Could not get data', { status: 500 })
    }
}
