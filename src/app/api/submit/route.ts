import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const problemId: number = Number(body.problemId);
    const content = body.jsonState;
    const isPublic = body.isPublic;
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (JSON.stringify(content).length > 1000000) {
      return new Response("Content too long", { status: 400 });
    }

    const exists = await db.submissions.findMany({
      where: {
        userId: session.user.id,
        problemId: problemId,
      },
    });

    if (exists.length > 3) {
      return new Response("Too many submissions", { status: 402 });
    }

    if (exists.length > 1) {
      await db.submissions.updateMany({
        data: {
          latest: false,
        },
        where: {
          userId: session.user.id,
          problemId,
        },
      });
    }

    if (isPublic === true) {
      const update = await db.submissions.updateMany({
        where: {
          userId: session.user.id,
          problemId,
          isPublic: true,
        },
        data: {
          content,
        },
      });
      if (update.count === 0) {
        await db.submissions.create({
          data: {
            userId: session.user.id,
            problemId,
            content,
            isPublic,
            latest: true,
          },
        });
      }
    } else {
      await db.submissions.create({
        data: {
          userId: session.user.id,
          problemId,
          content,
          isPublic,
          latest: true,
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Could not submit solution. Please try later", {
      status: 500,
    });
  }
}
