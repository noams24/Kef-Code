import { db } from "@/lib/db";
import { UserAvatar } from "@/components/UserAvatar";
import { humanize, slugify } from "@/lib/utils/textConverter";
import Image from "next/image";
import { BiDownload, BiShareAlt } from "react-icons/bi";
import { SiGoogledocs } from "react-icons/si";
import { SlOptionsVertical } from "react-icons/sl";
import { GiWorld } from "react-icons/gi";

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

    const dat = [
      {
        id: "1",
        userId: "clgfjsgfjfg",
        problemId: 1,
        content: { root: [Object] },
        createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        isPublic: true,
        videoUrl: "B1J6Ou4q8vE",
      },
      {
        id: "3",
        userId: "clgfjsgfjfg",
        problemId: 1,
        content: { root: [Object] },
        createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        isPublic: true,
        videoUrl: null,
      },
      {
        id: "cllkt8q460001mg08cgwccsat",
        userId: "clgfjsgfjfg",
        problemId: 1,
        content: { root: [Object] },
        createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        isPublic: true,
        videoUrl: null,
      },
      {
        id: "cllkt9i0r0001mh08ikegn95k",
        userId: "clgfjsgfjfg",
        problemId: 1,
        content: { root: [Object] },
        createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        isPublic: true,
        videoUrl: null,
      },
      {
        id: "cllkta3k20003mh08dlgbi8mp",
        userId: "clgfjsgfjfg",
        problemId: 1,
        content: { root: [Object] },
        createdAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        updatedAt: new Date("2023-08-20T19:34:51.140Z").toString(),
        isPublic: true,
        videoUrl: null,
      },
    ];

    // let show = false;

    // console.log(data);
    return (
      <div className="w-full min-h-screen pt-8">
        <div className="flex flex-col w-full h-full max-w-6xl mx-auto ">
          <div className="flex items-center justify-between w-full p-2 border border-gray-700 rounded-sm gap-x-5 h-36">
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
          <div className="flex flex-col w-full mt-10 gap-y-5 ">
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
            <div className="grid w-full grid-cols-3 gap-3">
              {dat?.map((item, index) => (
                <div
                  className="flex flex-col p-2 border border-gray-800 rounded-sm gap-y-5"
                  key={index}
                >
                  <div className="flex justify-between space-x-3">
                    <SiGoogledocs className="" size={30} />
                    <div className="flex flex-col w-full gap-y-3 ">
                      <h5 className="text-sm">Lorem ipsum dolor sit amet.</h5>
                      <h5 className="text-sm">Lorem ipsum dolor sit amet.</h5>
                      <h5 className="text-sm">
                        <span className="font-bold ">CreatedAt: </span>
                        {item.createdAt}
                      </h5>
                      <h5 className="text-sm">
                        <span className="font-bold ">UpdatedAt: </span>
                        {item.updatedAt}
                      </h5>
                    </div>
                  </div>
                  <div className="flex justify-between w-full ">
                    <div className="flex items-center px-2 py-1 text-white bg-gray-700 rounded-xl gap-x-1">
                      <GiWorld />
                      Published
                    </div>
                    <div className="flex items-center gap-x-5">
                      <BiShareAlt size={20} />
                      <SlOptionsVertical size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch {}
};

export default User;
