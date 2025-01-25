import { db } from '@/lib/db';
import { generateHtml } from '@/layouts/editor/utils/generateHtml';
import { getAuthSession } from '@/lib/auth';

export async function POST(req: Request) {
  const url = new URL(req.url);
  const problemId = Number(url.searchParams.get('problemId'));
  const page = Number(url.searchParams.get('page'));
  const sortBy = url.searchParams.get('sortBy');
  const session = await getAuthSession();

  if (!problemId) return new Response('Invalid query', { status: 400 });

  try {
    let results = null;
    if (sortBy === 'likes') {
      results = await db.submissions.findMany({
        where: {
          problemId,
          isPublic: true,
        },
        include: {
          user: true,
          votes: true,
          comments: true,
        },

        orderBy: {
          votes: {
            _count: 'desc',
          },
        },

        take: 5,
        skip: (page - 1) * 5,
      });
    } else {
      results = await db.submissions.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          problemId,
          isPublic: true,
        },
        include: {
          user: true,
          votes: true,
          comments: true,
        },
        take: 5,
        skip: (page - 1) * 5,
      });
    }
    const body = await req.json();
    const displaySubmission = body.displaySubmission;

    let additionalResult = null;
    if (displaySubmission) {
      additionalResult = await db.submissions.findFirst({
        where: {
          problemId,
          isPublic: true,
        },
        include: {
          user: true,
          votes: true,
          comments: true,
        },
      });
    }

    //add it to the result in the last index
    if (
      additionalResult &&
      !results.some(result => result.id === additionalResult.id)
    ) {
      results.push(additionalResult);
    }

    if (!results) return new Response('No results', { status: 401 });

    let newResults: { [key: string]: any } = results;
    for (let i = 0; i < results.length; i++) {
      //@ts-ignore
      newResults[i].html = await generateHtml(results[i].content);

      //check if the user has already like the submission
      const flag = newResults[i].votes.some(
        (obj: { userId: string | undefined }) => obj.userId === session?.user.id
      );
      newResults[i].likeStatus = flag;
    }
    return new Response(JSON.stringify(newResults));
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 });
  }
}
