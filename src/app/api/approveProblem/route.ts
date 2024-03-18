import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
// import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== "ADMIN")
      return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const id = body.data.id;
    const course = body.data.course;
    const chapter = body.data.chapter;
    const title = body.data.title;
    const difficulty = body.data.difficulty;
    const date = body.data.date;
    const img = body.data.img;
    const status = body.status;

    if (status === "approve") {
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
    // delete it from need verified table
    await db.problemsneedverify.delete({
      where: {
        id,
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response("Could not create problem. Please try later", {
      status: 500,
    });
  }
}
