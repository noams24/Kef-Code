import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { formatTimeToNow } from '@/lib/utils';

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    let notifications = await db.notifications.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    var result = notifications.map(notification => {
      return {
        id: notification.id,
        userId: notification.userId,
        type: notification.type,
        message: notification.message,
        createdAt: formatTimeToNow(new Date(notification.createdAt)),
        isRead: notification.isRead,
        link: notification.link,
      };
    });
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response('Could not fetch Notifications', { status: 500 });
  }
}
