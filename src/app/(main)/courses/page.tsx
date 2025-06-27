import CourseDisplay from '@/components/CourseDisplay';
import { Metadata } from 'next';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { createClient } from '@supabase/supabase-js';
import Header from '@/partials/Header';
export const metadata: Metadata = {
  title: 'כיף קוד - קורסים',
};

async function getCoursesPercent() {
  const session = await getAuthSession();
  if (!session) {
    return null;
  }
  try {
    const query = `select course, COUNT(*) as completed from public."Problem" p join public."problemStatus" ps on p.id = ps."problemId" where ps."userId" = '${session.user.id}' and status = 'FINISH' group by course`;
    const courseCompleted = await db.$queryRawUnsafe(query);

    const courseItems = await db.$queryRawUnsafe(
      'select course, COUNT(*) as items from public."Problem" group by course'
    );
    let results: any = {};
    if (Array.isArray(courseCompleted) && Array.isArray(courseItems)) {
      for (let i = 0; i < courseCompleted.length; i++) {
        let numberOfItems: any = courseItems.filter(
          item => item.course === courseCompleted[i].course
        )[0].items;
        results[courseCompleted[i].course] = Math.trunc(
          (Number(courseCompleted[i].completed) / Number(numberOfItems)) * 100
        );
      }
    }
    return results;
  } catch (error) {
    return null;
  }
}

const Courses = async () => {
  const supabaseUrl = process.env.SUPABASE_STORAGE_ENDPOINT as string;
  const supabaseKey = process.env.SUPABASE_STORAGE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: coursesJson, error } = await supabase.storage
    .from('files')
    .download('courses/courses.json');
  if (error || !coursesJson) {
    throw new Error('Failed to load courses.json');
  }
  const text = await coursesJson.text();
  const coursesData = JSON.parse(text);
  const coursePercent = await getCoursesPercent();
  return (
    <>
      <Header />
      <div className="flex flex-col bg-zinc-100 p-3 dark:bg-zinc-800">
        {Object.entries(coursesData).map(([category, courses]) => (
          <div key={category} className="mb-5">
            <h3 className="flex select-none justify-center p-3 text-zinc-700 dark:text-zinc-300">
              {category}
            </h3>
            <CourseDisplay data={courses} coursePercent={coursePercent} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
