import { db } from '@/lib/db'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const problemId: number = Number(url.searchParams.get('problemId'))
        const userId = url.searchParams.get('userId')
        if (!problemId) return new Response('Invalid query', { status: 400 })

        const problemData = await db.problem.findFirst({
            where: {
                id: problemId,
            },
            select: {
                difficulty:true,
                img: true,
            }
        })
        if (!problemData) return new Response('prbolemNotFound', { status: 400 })
        
        const likes: number = await db.vote.count({
            where: {
                problemId,
                type: 'LIKE'
            }
        });

        const dislikes: number = await db.vote.count({
            where: {
                problemId,
                type: 'DISLIKE'
            }
        });

        let content = null
        let bookmark = false
        let likeStatus = null
        if (userId) {
                content = await db.submissions.findFirst({
                    where: {
                        problemId: problemId,
                        userId: userId,
                    },
                    select: {
                        content: true,
                    },
                })
                const getBookmark = await db.bookmark.findFirst({
                    where: {
                        problemId: problemId,
                        userId: userId,
                    },
                })
                if (getBookmark) bookmark=true

                likeStatus = await db.vote.findFirst({
                    where: {
                        problemId: problemId,
                        userId: userId,
                    },
                    select: {
                        type: true,
                    }
                })
            }
    
        
        const result = {
            imageUrl: problemData.img,
            difficulty: problemData.difficulty,
            likes: likes,
            dislikes: dislikes,
            content: content,
            bookmark: bookmark,
            likeStatus: likeStatus?.type
        }
        return new Response(JSON.stringify(result))
    }

    catch (error) {
        return new Response('Could not get data', { status: 500 })
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