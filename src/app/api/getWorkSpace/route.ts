import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { generateHtml } from '@/layouts/editor/utils/generateHtml';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const problemId: number = Number(url.searchParams.get('problemId'));
    if (!problemId) return new Response('Invalid query', { status: 400 });
    const session = await getAuthSession();
    const userId = session?.user.id;

    const problemData = await db.problem.findFirst({
      where: {
        id: problemId,
      },
      select: {
        difficulty: true,
        img: true,
        hint: true,
        solutionStart: true,
      },
    });
    if (!problemData) return new Response('problemNotFound', { status: 400 });

    const likes: number = await db.vote.count({
      where: {
        problemId,
        type: 'LIKE',
      },
    });

    const dislikes: number = await db.vote.count({
      where: {
        problemId,
        type: 'DISLIKE',
      },
    });

    let bookmark = false;
    let likeStatus = null;
    let rawSubmissions = null;
    let content = null;
    let submissions = null;
    if (userId) {
      rawSubmissions = await db.submissions.findMany({
        where: {
          problemId: problemId,
          userId: userId,
        },
        select: {
          id: true,
          content: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      content = rawSubmissions[0]?.content;
      submissions = await processSubmissions(rawSubmissions);

      const getBookmark = await db.bookmark.findFirst({
        where: {
          problemId: problemId,
          userId: userId,
        },
      });

      if (getBookmark) bookmark = true;

      likeStatus = await db.vote.findFirst({
        where: {
          problemId: problemId,
          userId: userId,
        },
        select: {
          type: true,
        },
      });
    }

    // get solution article and video url:
    const solution = await db.solution.findFirst({
      where: {
        problemId: problemId,
      },
      select: {
        id: true,
        content: true,
        videoUrl: true,
      },
    });

    const totalSubmissions = await db.submissions.count({
      where: {
        problemId: problemId,
        isPublic: true,
      },
    });
    let htmlData = null;
    if (solution?.content) {
      //@ts-ignore
      htmlData = await generateHtml(solution.content);
    }

    const result = {
      submissions,
      content,
      imageUrl: problemData.img,
      difficulty: problemData.difficulty,
      hint: problemData.hint,
      likes: likes,
      dislikes: dislikes,
      bookmark: bookmark,
      likeStatus: likeStatus?.type,
      solutionArticle: htmlData,
      videoUrl: solution?.videoUrl,
      solutionId: solution?.id,
      totalSubmissions: totalSubmissions,
      solutionStart: problemData.solutionStart,
    };
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response('Could not get data', { status: 500 });
  }
}

async function processSubmissions(rawSubmissions: any) {
  const submissions = await Promise.all(
    rawSubmissions
      .slice()
      .reverse()
      .map(async (item: any) => {
        const htmlData = await generateHtml(item.content);
        return {
          id: item.id,
          html: htmlData,
          content: item.content,
          updatedAt: item.updatedAt,
        };
      })
  );

  return submissions;
}
