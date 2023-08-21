import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CommentVoteValidator } from '@/lib/validators/vote'
import { z } from 'zod'

export async function PATCH(req: Request) {
    try {
        const body = await req.json()

        const SubmissionId = body.submissionId
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        // check if user has already voted on this post
        const existingVote = await db.vote.findFirst({
            where: {
                userId: session.user.id,
                SubmissionId: SubmissionId
            },
        })

        if (existingVote) {
            // if vote type is the same as existing vote, delete the vote
            await db.vote.delete({
                where: {
                    id: existingVote.id,
                },
            })
            return new Response('OK')
        }
        // if no existing vote, create a new vote
        await db.vote.create({
            data: {
                type: 'LIKE',
                userId: session.user.id,
                SubmissionId
            },
        })
        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }

        return new Response(
            'שגיאה,נסה שוב יותר מאוחר',
            { status: 500 }
        )
    }
}
