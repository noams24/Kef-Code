import { db } from '@/lib/db'

//TODO: handle problem status by user

export async function GET(req: Request) {
    const url = new URL(req.url)
    const problemId = Number(url.searchParams.get('problemId'))

    if (!problemId) return new Response('Invalid query', { status: 400 })
    try {
        const results = await db.submissions.findMany({
            orderBy: {
                createdAt: 'desc',
              },
            where: {
                problemId,
                isPublic:true
            },
            include: {
                user:true
            }
        })
        if (!results) return new Response('No results', {status: 401})

        const likes: number = await db.vote.count({
            where: {
                SubmissionId: results[0].id,
                type: 'LIKE'
            }
        });

        const comments: number = await db.vote.count({
            where: {
                SubmissionId: results[0].id,
            }
        });

        const { createdAt, user: { name, image } } = results[0];
        const extractedData = {createdAt,name,image, likes, comments};
        console.log(extractedData)
        return new Response(JSON.stringify(extractedData))
    }
    catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}
