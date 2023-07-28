import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const type = body.type
    const problemId = body.problemId
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    await db.vote.create({
      data: {
        type,
        userId: session.user.id,
        problemId,
      },
    })

    return new Response('OK')
  } catch (error) {
    return new Response(
      'Could not submit solution. Please try later',
      { status: 500 }
    )
  }
}