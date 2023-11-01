import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const submissionId = body.submissionId;
    const videoUrl = body.values.videoUrl

    if (!submissionId)
      return new Response("submissionId not found", { status: 400 });
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    await db.submissions.update({
      where: {
        id: submissionId,
      },
      data: {
        videoUrl: videoUrl
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response("Could not add video. Please try later", {
      status: 500,
    });
  }
}
