import { db } from "@/lib/db";
import { UserAvatar } from "@/components/UserAvatar";
import { humanize, slugify } from "@/lib/utils/textConverter";
import Image from "next/image";
import { BiDownload, BiShareAlt } from "react-icons/bi";

const User = async ({ params }: { params: { name: string } }) => {
  try {
    const user: any = await db.user.findUnique({
      where: {
        username: decodeURIComponent(params.name),
      },
    });
    if (!user) return <div>No user found</div>;

    const data: any = await db.submissions.findMany({
      where: {
        userId: user.id,
        isPublic: true,
      },
    });

    // let show = false;

    // console.log(data);
    return (
      <div className="w-full min-h-screen pt-8">
        <div className="flex flex-col w-full h-full max-w-6xl mx-auto ">
          <div className="flex items-center justify-between w-full p-2 border border-gray-700 gap-x-5 h-36">
            <div className="flex flex-col justify-between w-full h-full ">
              <div>
                <h3 className="mb-2">{humanize(user.username)}</h3>
                <h4>Walter@gmail.com</h4>
              </div>
              {/* <i className="self-end w-5 h-5 rounded-full bg-cyan-500"></i> */}
              <BiShareAlt className="self-end w-5 h-5 " />
              {/* <Image src={""} alt={""} /> */}
            </div>
            <div className="">
              <UserAvatar
                user={{ name: "" || null, image: user.image || null }}
                className="w-32 h-32"
              />
            </div>
          </div>
          <div className="flex flex-col w-full mt-10 ">
            <div className="flex justify-between w-full">
              <h4>Published Documents</h4>
              <div className="flex items-center justify-center">
                <button
                  // type="button"
                  className="px-5 py-[0.8em] text-sm h-10 font-medium text-white bg-gray-800 rounded-l-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  <BiDownload />
                </button>

                <select className="h-10 text-sm font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ">
                  <option value="">Updated</option>
                  <option value="">Created</option>
                  <option value="">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {}
};

export default User;
