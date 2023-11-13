import { db } from "@/lib/db";
import User from "./User";

const UserPage = async ({ params }: { params: { name: string } }) => {
  try {
    const user: any = await db.user.findUnique({
      where: {
        username: decodeURIComponent(params.name),
      },
    });
    if (!user) return <div>משתמש לא קיים</div>;

    const data: any = await db.submissions.findMany({
      where: {
        userId: user.id,
        isPublic: true,
      },
      orderBy: {
        updatedAt: 'desc',
    },
      include: {
        problem: true,
      },
    });

    return <User user={user} data={data} />;
  } catch {
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

// const dat = [
//   {
//     id: "1",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     isPublic: true,
//     videoUrl: "B1J6Ou4q8vE",
//   },
//   {
//     id: "3",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     isPublic: true,
//     videoUrl: null,
//   },
//   {
//     id: "cllkt8q460001mg08cgwccsat",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     isPublic: true,
//     videoUrl: null,
//   },
//   {
//     id: "cllkt9i0r0001mh08ikegn95k",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     isPublic: true,
//     videoUrl: null,
//   },
//   {
//     id: "cllkta3k20003mh08dlgbi8mp",
//     userId: "clgfjsgfjfg",
//     problemId: 1,
//     content: { root: [Object] },
//     createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
//     isPublic: true,
//     videoUrl: null,
//   },
// ];
