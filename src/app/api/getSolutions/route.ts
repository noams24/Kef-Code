import { db } from '@/lib/db'

//TODO: handle problem status by user

export async function GET(req: Request) {
    const url = new URL(req.url)
    const problemId = Number(url.searchParams.get('problemId'))
    const page = Number(url.searchParams.get('page'))
    if (!problemId) return new Response('Invalid query', { status: 400 })
    try {
        const results = await db.submissions.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                problemId,
                isPublic: true
            },
            include: {
                user: true,
                votes: true,
                comments: true
            },
            take:5,
            skip: (page - 1) * 5
        })

        // console.log(results)
        if (!results) return new Response('No results', { status: 401 })
        return new Response(JSON.stringify(results))
    }
    catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}
