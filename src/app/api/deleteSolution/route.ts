import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const solutionId = body.solutionId
        if (!solutionId) return new Response('solution id found', { status: 400 })
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        await db.submissions.update({
            where: {
                id: solutionId
            },
            data: {
                isPublic: false
            },
        })

        return new Response('OK')
    } catch (error) {
        return new Response(
            'Could not save status. Please try later',
            { status: 500 }
        )
    }
}