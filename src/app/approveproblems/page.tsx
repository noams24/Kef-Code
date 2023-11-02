import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { UserAvatar } from "@/components/UserAvatar";
import { humanize, slugify } from "@/lib/utils/textConverter";
import hebrewDateFormat from "@/lib/utils/hebrewDateFormat";

const approveproblem = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const problems: any = await db.problemsneedverify.findMany({
    include: {
        user: true,
    }
  });
    // console.log(problems);
  return (
    <>
      <div dir="rtl" className="py-3 md:mx-64 lg:mx-96 items-center">
        {problems.map((item: any) => (
          <div key={item.id} className="border-2 shadow-lg rounded-lg mb-9">
            <div className="flex">
          <UserAvatar
            user={{ name: item.user.username || null, image: item.user.image || null }}
            className="h-12 w-12"
          />
          <div className="mr-1">
            <a
              href={`/authors/${slugify(item.user.username)}`}
              className="mr-4 font-bold text-center text-lg hover:text-blue-500 dark:hover:text-blue-500"
            >
              {humanize(item.user.username)}
            </a>
            <div className="flex">
              <span className="mr-4">{hebrewDateFormat(item.createdAt)}</span>
            </div>
          </div>
        </div>
            <img src={item.img} alt={item.title} className="w-42 h-42" />
            <p>קורס: {item.course} </p>
            <p>פרק: {item.chapter}</p>
            <p>שם השאלה: {item.title}</p>
            <p>רמת קושי: {item.difficulty}</p>
            <div className="flex justify-center gap-3">
              <button>
                <AiOutlineClose className="h-8 w-8 text-red-500"/>
                <h5>ביטול</h5>
              </button>
              <button>
                <AiOutlineCheck className="h-8 w-8 text-green-500"/>
                <h5>אישור</h5>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default approveproblem;
