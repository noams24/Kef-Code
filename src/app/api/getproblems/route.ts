import { db } from '@/lib/db'

//TODO: handle problem status by user

export async function GET(req: Request) {
    const url = new URL(req.url)
    const course = url.searchParams.get('course')
    const chapter = url.searchParams.get('chapter')
    if (!course || !chapter) return new Response('Invalid query', { status: 400 })
    try {
        const results = await db.problem.findMany({
            where: {
                course: course,
                chapter: chapter,
            },
            select: {
                title: true,
                difficulty: true,
              },
        })
        return new Response(JSON.stringify(results))
    }
    catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}
