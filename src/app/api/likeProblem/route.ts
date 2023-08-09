import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PATCH(req: Request) {
    try {
        const body = await req.json()

        const problemId = body.problemId
        const voteType = body.voteType

        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }
        if (!problemId || !voteType) {
            return new Response('problemId or voteType not found', { status: 400 })
        }

        // check if user has already voted on this post
        const existingVote = await db.vote.findFirst({
            where: {
                userId: session.user.id,
                problemId,
            },
        })

        const post = await db.problem.findUnique({
            where: {
                id: problemId,
            },
            include: {
                vote: true,
            },
        })
        if (!post) {
            return new Response('problem not found', { status: 404 })
        }

        if (existingVote) {
            // if vote type is the same as existing vote, delete the vote
            if (existingVote.type === voteType) {
                await db.vote.delete({
                    where: {
                        userId: session.user.id,
                        problemId
                    },
                })
            }
            // if vote type is different than existing vote, update the vote
            else if (existingVote.type !== voteType) {
                await db.vote.update({
                    where: {
                        userId: session.user.id,
                        problemId
                    },
                    data: {
                        type: voteType,
                    },
                })
            }
        }

        // if no existing vote, create a new vote
        await db.vote.create({
            data: {
                type: voteType,
                userId: session.user.id,
                problemId,
            },
        })
    }

    catch (error) {
        (error)
        return new Response(
            'שגיאה',
            { status: 500 }
        )
    }
}