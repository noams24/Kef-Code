import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CommentValidator } from '@/lib/validators/comment'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { ID, type, text, replyToId } = CommentValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (type === 'problem'){
    await db.comment.create({
      data: {
        text,
        problemId: Number(ID),
        authorId: session.user.id,
        replyToId,
      },
    })
  }
  else if (type === 'submission'){
    await db.comment.create({
      data: {
        text,
        submissionsId: ID,
        authorId: session.user.id,
        replyToId,
      },
    })
  }

  else if (type === 'solution'){
    await db.comment.create({
      data: {
        text,
        solutionId: ID,
        authorId: session.user.id,
        replyToId,
      },
    })
  }

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'שגיאה, נסה שובר יותר מאוחר',
      { status: 500 }
    )
  }
}
