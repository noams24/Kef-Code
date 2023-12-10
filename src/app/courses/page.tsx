import CourseDisplay from "@/components/CourseDisplay";
import { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import computerScienceCourses from "@/content/computerScienceCourses.json";
import mathCourses from "@/content/mathCourses.json";
import otherCourses from "@/content/otherCourses.json";
export const metadata: Metadata = {
  title: "כיף קוד - קורסים",
};

async function getCoursesPercent() {
  const session = await getAuthSession();
  if (!session) {
    return null;
  }
  try {
    const query = `select course, COUNT(*) as completed from Problem p join problemStatus ps on p.id = ps.problemId where ps.userId = '${session.user.id}' and status = 'FINISH' group by course`;
    const courseCompleted = await db.$queryRawUnsafe(query);

    const courseItems = await db.$queryRawUnsafe(
      "select course, COUNT(*) as items from Problem group by course",
    );
    let results: any = {};
    if (Array.isArray(courseCompleted) && Array.isArray(courseItems)) {
      for (let i = 0; i < courseCompleted.length; i++) {
        let numberOfItems: any = courseItems.filter(
          (item) => item.course === courseCompleted[i].course,
        )[0].items;
        results[courseCompleted[i].course] = Math.trunc(
          (Number(courseCompleted[i].completed) / Number(numberOfItems)) * 100,
        );
      }
    }
    return results;
  } catch (error) {
    return null;
  }
}

const Courses = async () => {
  const coursePercent = await getCoursesPercent();
  return (
    <div className="flex flex-col gap-y-5 p-3">
      <div>
        <h3 className="p-3 flex justify-center">קורסי מדעי המחשב</h3>
        <CourseDisplay
          data={computerScienceCourses}
          coursePercent={coursePercent}
        />
      </div>
      <div>
        <h3 className="p-3 flex justify-center">קורסי מתמטיקה</h3>
        <CourseDisplay data={mathCourses} coursePercent={coursePercent} />
      </div>
      <div>
        <h3 className="p-3 flex justify-center">קורסי בחירה</h3>
        <CourseDisplay data={otherCourses} coursePercent={coursePercent} />
      </div>
    </div>
  );
};

export default Courses;
