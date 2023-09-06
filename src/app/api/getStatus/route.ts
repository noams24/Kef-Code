import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET(req: Request) {
    const url = new URL(req.url)
    const problemId = Number(url.searchParams.get('problemId'))
    if (!problemId) return new Response('Invalid query', { status: 400 })
    const session = await getAuthSession()
    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }
    try {
        let results = await db.problemStatus.findUnique({
            where: {
                problemId_userId: {
                problemId,
                userId: session?.user.id
                }
            },
            select: {
                status: true,
              },
        })
        if (!results) results = {status : 'BEGIN'}
        return new Response(JSON.stringify(results))
    }
    catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}
