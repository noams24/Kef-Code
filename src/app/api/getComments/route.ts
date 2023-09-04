import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
//TODO: handle problem status by user

export async function GET(req: Request) {
    const url = new URL(req.url)
    const problemId = Number(url.searchParams.get('problemId'))
    if (!problemId) return new Response('Invalid query', { status: 400 })
    const session = await getAuthSession()
    const userId = session?.user.id
    try {
        const results = await db.comment.findMany({
            where: {
              problemId,
              replyToId: null, // only fetch top-level comments
            },
            include: {
              author: true,
              votes: true,
              replies: {
                // first level replies
                include: {
                  author: true,
                  votes: true,
                },
              },
            },
          })
        // return new Response(JSON.stringify({results,userId}))
        return new Response(JSON.stringify(results))
    }
    catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}
