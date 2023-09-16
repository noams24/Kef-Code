import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
// import { z } from 'zod'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const title = body.values.title
        const course = body.values.course
        const chapter = body.values.chapter
        const difficulty = body.values.difficulty
        const img = body.url
        const session = await getAuthSession()
        if (session?.user.role !== 'ADMIN') {
            return new Response('Unauthorized', { status: 401 })
        }

        const exists = await db.problem.findFirst({
            where: {
                course,
                chapter,
                title,
            },
        })
        if (exists) return new Response('Title already exists', { status: 501 })

        await db.problem.create({
            data: {
                title : title,
                course : course,
                chapter : chapter,
                difficulty : difficulty,
                img : img
            },
        })

        return new Response('OK')
    } catch (error) {
        // if (error instanceof z.ZodError) {
        //     return new Response(error.message, { status: 400 })
        // }
        return new Response(
            'Could not create problem. Please try later',
            { status: 500 }
        )
    }
}