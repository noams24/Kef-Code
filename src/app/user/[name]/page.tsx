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

    // const data: DataObject[] = await db.submissions.findMany({
    //   where: {
    //     userId: user.id,
    //     // isPublic: true,
    //   },
    //   orderBy: {
    //     updatedAt: "desc",
    //   },
    //   include: {
    //     problem: true,
    //   },
    // });


    const query = `select * from public."Problem" p join public."Submissions" s on p.id = s."problemId" where s."userId" = '${user.id}'`
    const data = await db.$queryRawUnsafe(query)

    const session = await getServerSession(authOptions);
    let localUser = false;
    if (session?.user.username === decodeURIComponent(params.name)) {
      localUser = true
    }
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
    console.log(error);
    return <div>שגיאה</div>;
  }
};

export default UserPage;

// import { humanize, slugify } from "@/lib/utils/textConverter";
// import Image from "next/image";
// import { BiDownload, BiShareAlt } from "react-icons/bi";

// import { SlOptionsVertical } from "react-icons/sl";
// import { GiWorld } from "react-icons/gi";
// import coursesData from "@/content/chapters.json";
// import { AiOutlineCalendar } from "react-icons/ai";
