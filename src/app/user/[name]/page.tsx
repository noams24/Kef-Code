import { db } from "@/lib/db";
import User from "./User";
import SeoMeta from "@/partials/SeoMeta";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface ProblemObject {
  chapter: string;
  img: string;
  title: string;
  id: number;
  course: string;
  difficulty: string;
}

export type UserObject = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  username: string | null;
  image: string | null;
  role: string;
} | null;

export interface DataObject {
  title: any;
  content: any;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  isPublic: boolean;
  problem: ProblemObject;
  problemId: number;
  userId: string;
  videoUrl?: string | null;
}

const UserPage = async ({ params }: { params: { name: string } }) => {
  try {
    const user: UserObject = await db.user.findUnique({
      where: {
        username: decodeURIComponent(params.name),
      },
    });
    if (!user) return <div>משתמש לא קיים</div>;

    const session = await getServerSession(authOptions);
    let localUser = false;
    if (session?.user.username === decodeURIComponent(params.name)) {
      localUser = true;
    }

    let query = `select * from public."Problem" p join public."Submissions" s on p.id = s."problemId" where s."userId" = '${user.id}' and s."latest" = true`
    if (!localUser)
      query += ' and s."isPublic" = true'
    const data = await db.$queryRawUnsafe(query);
    
    return (
      <div className="mx-4">
        <SeoMeta
          title={`כיף קוד - ${user.username}`}
          meta_title={`כיף קוד - ${user.username}`}
          description={`כיף קוד - ${user.username}`}
        />
        <User user={user} data={data} localUser={localUser} />
      </div>
    );
  } catch (error) {
    return <div>שגיאה</div>;
  }
};

export default UserPage;
