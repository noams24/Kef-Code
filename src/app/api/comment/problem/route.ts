import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { CommentValidator } from '@/lib/validators/comment';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { ID, type, text, replyToId, link } = CommentValidator.parse(body);

    const session = await getAuthSession();

    // delete:
    // return new Response('TEST', { status: 401 });

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (type === 'problem') {
      await db.comment.create({
        data: {
          text,
          problemId: Number(ID),
          authorId: session.user.id,
          replyToId,
        },
      });
    } else if (type === 'solution') {
      await db.comment.create({
        data: {
          text,
          solutionId: ID,
          authorId: session.user.id,
          replyToId,
        },
      });
    } else if (type === 'submission') {
      await db.comment.create({
        data: {
          text,
          submissionsId: ID,
          authorId: session.user.id,
          replyToId,
        },
      });

      //notify
      // const link = body.link;
      if (!link) {
        return new Response('OK');
      }

      const submission = await db.submissions.findFirst({
        where: {
          id: ID,
        },
      });

      const notifyUserId = submission?.userId;
      if (notifyUserId && notifyUserId !== session.user.id)
        await db.notifications.create({
          data: {
            userId: notifyUserId,
            type: 'COMMENT',
            message: `${session.user.name} הגיב להגשה שלך`,
            link,
          },
        });

      if (replyToId && replyToId !== session.user.id) {
        await db.notifications.create({
          data: {
            userId: replyToId,
            type: 'COMMENT',
            message: `${session.user.username} הגיב לתגובה שלך`,
            link,
          },
        });
      }
    }

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('שגיאה, נסה שובר יותר מאוחר', { status: 500 });
  }
}
