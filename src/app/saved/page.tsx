import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import dictionary from "@/content/dictionary.json";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

const Profile = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return (
      <h3 className="flex justify-center">
        רק משתמשים מחוברים יכולים לראות דף זה
      </h3>
    );
  } else {
    try {
      const query = `
    select id as problemId, course, chapter, title from Bookmark B inner join Problem P on B.problemId = P.id where B.userId = '${session.user.id}' `;
      let problems: any = await db.$queryRawUnsafe(query);

      problems.forEach((problem: { status: string }) => {
        problem.status = "BEGIN";
      });

      const problemStatus = await db.problemStatus.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          problemId: true,
          status: true,
        },
      });
      const object2Map = new Map(
        problemStatus.map((obj) => [obj.problemId, obj]),
      );
      const unitedArray = problems.map((problems: { problemId: number }) => ({
        ...problems,
        ...object2Map.get(problems.problemId),
      }));

      return (
        <div dir="rtl">
          <SeoMeta
            title="שאלות שמורות"
            meta_title="שאלות שמורות"
            description="שאלות שמורות"
          />
          <PageHeader title="שאלות שמורות" />
          <div className="flex justify-center">
            <h3>שאלות שמורות</h3>
          </div>
          <div className="mx-72">
            {unitedArray.map((item: any) => (
              <div key={item.problemId} className="border p-4 m-2 rounded-lg">
                <Link
                  href={`/courses/${item.course}/${item.chapter}/${item.title}`}
                  target="_blank"
                >
                  <div className="flex justify-between">
                    <div>
                      {/* @ts-ignore */}
                      <h5 className="font-bold">{item.title}</h5>
                      <span className="text-sm">
                        {/* @ts-ignore */}
                        {dictionary[item.course]} - {dictionary[item.chapter]}
                      </span>
                    </div>
                    <div className="pt-5">
                      {item.status === "BEGIN" && (
                        <div title="עוד לא התחלתי">
                          <CircleIcon className="h-5 w-5" />
                        </div>
                      )}
                      {item.status === "ONGOING" && (
                        <div title="בתהליך">
                          <StopwatchIcon className="h-5 w-5" />
                        </div>
                      )}
                      {item.status === "STUCK" && (
                        <div title="תקוע">
                          <QuestionMarkCircledIcon className="h-5 w-5" />
                        </div>
                      )}
                      {item.status === "FINISH" && (
                        <div title="סיימתי">
                          <CheckCircledIcon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    } catch {
      return <h3 className="flex justify-center">שגיאה</h3>;
    }
  }
};

export default Profile;
