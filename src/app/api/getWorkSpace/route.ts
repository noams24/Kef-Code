import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const problemId: number = Number(url.searchParams.get('problemId'))
        if (!problemId) return new Response('Invalid query', { status: 400 })
        const session = await getAuthSession()
        const userId = session?.user.id

        const problemData = await db.problem.findFirst({
            where: {
                id: problemId,
            },
            select: {
                difficulty: true,
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

        let bookmark = false
        let likeStatus = null
        let content = null

        if (userId) {
            content = await db.submissions.findFirst({
                where: {
                    problemId: problemId,
                    userId: userId
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

            if (getBookmark) bookmark = true

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

        // get solution article:
        const solutionArticle = await db.solution.findFirst({
            where: {
                problemId: problemId,
            },
            select: {
                content: true
            }
        })

        const totalSubmissions = await db.submissions.count({
            where: {
                problemId: problemId,
            }
        })

        const result = {
            content: content,
            imageUrl: problemData.img,
            difficulty: problemData.difficulty,
            likes: likes,
            dislikes: dislikes,
            bookmark: bookmark,
            likeStatus: likeStatus?.type,
            solutionArticle: solutionArticle,
            totalSubmissions: totalSubmissions
            //todo:
            //videoUrl
        }
        return new Response(JSON.stringify(result))
    }

    catch (error) {
        return new Response('Could not get data', { status: 500 })
    }
}