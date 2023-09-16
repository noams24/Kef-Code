import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PATCH(req: Request) {
    
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const body = await req.json()

    const image = body.url
 
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image
      },
    })

    return new Response('OK')
  } catch (error) {
    return new Response(
      'Could not change image',
      { status: 500 }
    )
  }
}