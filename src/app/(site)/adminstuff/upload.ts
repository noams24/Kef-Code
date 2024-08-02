'use server';

import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export async function uploadStartSolution(jsonData: any, problemId: any) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await db.problem.update({
      where: {
        id: problemId,
      },
      data: {
        solutionStart: jsonData,
      },
    });
    console.log('updated start solution');
    return 'updated';
  } catch (error: unknown) {
    console.error(error);
    return 'error';
  }
}

export async function saveHint(hintData: any, problemId: any) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await db.problem.update({
      where: {
        id: problemId,
      },
      data: {
        hint: hintData,
      },
    });
    console.log('updated hint');
    return 'updated';
  } catch (error: unknown) {
    console.error(error);
    return 'error';
  }
}
