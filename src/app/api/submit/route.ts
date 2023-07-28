import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { submitValidator } from '@/lib/validators/submit'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(body)
    const {problemId, content } = submitValidator.parse(body)
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    await db.submissions.create({
      data: {
        userId: session.user.id,
        problemId,
        content,
        isPublic: true
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not submit solution. Please try later',
      { status: 500 }
    )
  }
}