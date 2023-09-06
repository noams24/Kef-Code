import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
//import { submitValidator } from '@/lib/validators/submit'
import { z } from 'zod'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        //const { problemId, content } = submitValidator.parse(body)
        const problemId = Number(body.problemId)
        const status = body.status
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }
        console.log(problemId, status)
        const exists = await db.problemStatus.findFirst({
            where: {
                userId: session.user.id,
                problemId,
            },
        })

        if (exists) {
            await db.problemStatus.update({
                where: {
                    problemId_userId: {
                        userId: session.user.id,
                        problemId,
                    }
                },
                data: {
                    userId: session.user.id,
                    problemId,
                    status,
                },
            })
        }

        else {
            await db.problemStatus.create({
                data: {
                    userId: session.user.id,
                    problemId,
                    status,
                },
            })
        }

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
        return new Response(
            'Could not save status. Please try later',
            { status: 500 }
        )
    }
}