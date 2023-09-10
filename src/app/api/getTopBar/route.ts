import { db } from '@/lib/db'

export async function GET(req: Request) {
    const url = new URL(req.url)
    const course = url.searchParams.get('course')
    const chapter = url.searchParams.get('chapter')
    const problemId = url.searchParams.get('problemId')
    if (!course || !chapter || !problemId) return new Response('Invalid query', { status: 400 })

    try {
        const results = await db.problem.findMany({
            where: {
                course,
                chapter,
            },
            select: {
                id: true,
                title: true,
                difficulty: true,
            },
            orderBy: {
                difficulty: 'desc',
            },

        })

        const currentIndex = Number(results.findIndex((item: { id: any }) => String(item.id) === problemId))
        let prevIndex = currentIndex - 1
        if (currentIndex === 0)
            prevIndex = results.length - 1

        let nextIndex = currentIndex + 1
        if (currentIndex === results.length - 1)
            nextIndex = 0

        const newResults = { prevLink: `/courses/${course}/${chapter}/${results[prevIndex].id}`, nextLink: `/courses/${course}/${chapter}/${results[nextIndex].id}` }
        return new Response(JSON.stringify(newResults))
    }
    catch (error) {
        return new Response('Could not fetch problems', { status: 500 })
    }
}
