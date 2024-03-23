import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
//import { submitValidator } from '@/lib/validators/submit'
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    //const { problemId, content } = submitValidator.parse(body)
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

    const exists = await db.submissions.findFirst({
      where: {
        userId: session.user.id,
        problemId: problemId,
      },
    });

    if (exists) {
      await db.submissions.update({
        where: {
          id: exists.id,
        },
        data: {
          content,
          isPublic,
        },
      });
    } else {
      await db.submissions.create({
        data: {
          userId: session.user.id,
          problemId,
          content,
          isPublic,
        },
      });
      // Mark the status is "FINISH"
      // await db.problemStatus.create({
      //   data: {
      //     userId: session.user.id,
      //     problemId,
      //     status: "FINISH"
      //   },
      // })
    }

    //IF ADMIN, SAVE THE CONTENT AS A SOLUTION ARTICLE
    // if (session.user.role === 'ADMIN' && isPublic) {
    //check if there is already a solution
    // const existSolution = await db.solution.findFirst({
    //   where: {
    //     problemId: problemId
    //   },
    //   select: {
    //     content: true
    //   }
    // })

    // if (!existSolution) {
    //   await db.solution.create({
    //     data: {
    //       problemId,
    //       content,
    //     },
    //   })
    // }
    // else {
    //   await db.solution.update({
    //     where: {
    //       problemId
    //     },
    //     data: {
    //       content,
    //     },
    //   })
    // }
    // }

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
