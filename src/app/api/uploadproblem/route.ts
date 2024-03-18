import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
// import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body.values.title.replace("-", " ");
    const course = body.values.course;
    const chapter = body.values.chapter;
    const difficulty = body.values.difficulty;
    const img = body.url;
    const date = body.values.date;
    const session = await getAuthSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const exists = await db.problem.findFirst({
      where: {
        course,
        chapter,
        title,
      },
    });
    if (exists) return new Response("Title already exists", { status: 501 });

    //admin section:
    if (session.user.role == "ADMIN") {
      await db.problem.create({
        data: {
          title,
          course,
          chapter,
          difficulty,
          date,
          img,
        },
      });
    }

    // normal user
    else {
      await db.problemsneedverify.create({
        data: {
          title,
          course,
          chapter,
          difficulty,
          date,
          img,
          userId: session.user.id,
        },
      });
    }
    return new Response("OK");
  } catch (error) {
    return new Response("Could not create problem. Please try later", {
      status: 500,
    });
  }
}
