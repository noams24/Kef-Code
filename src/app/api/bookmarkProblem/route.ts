import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const problemId = Number(body)
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const bookmark = await db.bookmark.findFirst({
            where: {
                userId: session.user.id,
                problemId: problemId
            },
        })
        if (bookmark) {
            await db.bookmark.delete({
                where: {
                    userId: session.user.id,
                    problemId: problemId
                },
            })
        }

        else {
            await db.bookmark.create({
                data: {
                    userId: session.user.id,
                    problemId: problemId
                },
            })
        }
        return new Response('OK')
    }

    catch (error) {
        (error)
        return new Response(
            'שגיאה',
            { status: 500 }
        )
    }
}