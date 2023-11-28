import { db } from '@/lib/db'

export async function GET(req: Request) {
    const url = new URL(req.url)
    const ID = url.searchParams.get('ID')
    const type = url.searchParams.get('type')
    if (!ID || !type) return new Response('Invalid query', { status: 400 })
   
    try {
      let results = null
      if (type === 'problem') {
        results = await db.comment.findMany({
            where: {
              problemId: Number(ID),
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
        }

        else if (type === 'submission') {
          results = await db.comment.findMany({
              where: {
                submissionsId: ID,
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
          }

          else if (type === 'solution') {
            results = await db.comment.findMany({
                where: {
                  solutionId: ID,
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
            }



        // return new Response(JSON.stringify({results,userId}))
        return new Response(JSON.stringify(results))
    }
    catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}
