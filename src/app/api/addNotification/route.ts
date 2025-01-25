import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body.type;
    const message = body.message;
    const link = body.link;

    const session = await getAuthSession();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
    if (!type || !message || !link) {
      return new Response('Missing required fields', { status: 400 });
    }
    await db.notifications.create({
      data: {
        userId: session.user.id,
        type,
        message,
        link,
      },
    });

    return new Response('OK');
  } catch (error) {
    return new Response('Could not add notification', {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;

    const session = await getAuthSession();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
    if (!id) {
      return new Response('Missing required fields', { status: 400 });
    }
    await db.notifications.update({
      where: { id },
      data: { isRead: true },
    });

    return new Response('OK');
  } catch (error) {
    return new Response('Could not update notification', {
      status: 500,
    });
  }
}
