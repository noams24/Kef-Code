import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
//import { submitValidator } from '@/lib/validators/submit'
import { z } from 'zod'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const problemId: number = Number(body.values.problemId)
        const videoUrl = body.values.videoUrl
        const content = body.jsonState
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const exists = await db.solution.findFirst({
            where: {
                problemId,
            },
        })

        if (exists) {
            await db.solution.update({
                where: {
                    problemId,
                },
                data: {
                    content,
                    videoUrl,
                },
            })
        }
        else {
            await db.solution.create({
                data: {  
                    problemId,
                    content,
                    videoUrl,
                },
            })
        }

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
        return new Response(
            'Could not submit solution. Please try later',
            { status: 500 }
        )
    }
}