"use client";
import { UserAvatar } from "@/components/UserAvatar";
import { SiGoogledocs } from "react-icons/si";
import Link from "next/link";
import hebrewDateFormat from "@/lib/utils/hebrewDateFormat";
import { Share } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import dictionary from "@/content/dictionary.json"

const User = ({ user, data }: any) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = (id: any) => {
    navigator.clipboard
      .writeText(`https://kef-code.vercel.app/view/${id}`)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
  };

  return (
    <div className="w-full min-h-screen pt-8">
      <Snackbar
        open={isCopied}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          הקישור הועתק
        </Alert>
      </Snackbar>

      <div className="flex flex-col w-full h-full max-w-6xl mx-auto ">
        <div className="flex items-center justify-between w-full p-2 border border-gray-700 rounded-sm gap-x-5 h-36">
          <div className="flex flex-col justify-between w-full h-full ">
            <div>
              <h3 dir="rtl" className="mt-8 font-primary">
                {user.username}
              </h3>
              {/* <h4>Walter@gmail.com</h4> */}
            </div>
            {/* <i className="self-end w-5 h-5 rounded-full bg-cyan-500"></i> */}
            {/* <BiShareAlt className="self-end w-5 h-5 " /> */}
            {/* <Image src={""} alt={""} /> */}
          </div>
          <div className="">
            <UserAvatar
              user={{ name: "" || null, image: user.image || null }}
              className="w-32 h-32"
            />
          </div>
        </div>
        <div dir="rtl" className="flex flex-col w-full mt-10 gap-y-5 ">
          <div className="flex justify-between w-full">
            <h4>פתרונות שנוספו לאחרונה</h4>
            <div className="flex items-center justify-center">
              {/* <button
                    // type="button"
                    className="px-5 py-[0.8em] text-sm h-10 font-medium text-white bg-gray-800 rounded-l-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    <BiDownload />
                  </button> */}
              {/* 
                  <select className="h-10 text-sm font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ">
                    <option value="">Updated</option>
                    <option value="">Created</option>
                    <option value="">Name</option>
                  </select> */}
            </div>
          </div>
          <div className="grid w-full grid-cols-4 gap-3">
            {data.map((item: any, index: any) => (
              <div
                className="flex flex-col p-2 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-800 dark:border-gray-400 rounded-sm"
                key={index}
              >
                <Link href={`/view/${item.id}`} target="_blank">
                  <div className="flex justify-between space-x-3">
                    <SiGoogledocs className="" size={30} />
                    <div className="flex flex-col w-full gap-y-1 pr-2 ">
                      <h5 className="font-bold">{item.problem.title}</h5>
                      <span className="text-sm">
                        {/* @ts-ignore */}
                        {dictionary[item.problem.course]} - {dictionary[item.problem.chapter]}
                      </span>
                      <span className="text-sm">
                        {hebrewDateFormat(item.updatedAt)}
                      </span>
                    </div>
                    <div className="mt-12">
                      <button
                        title="שיתוף"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleShare(item.problem.id);
                        }}
                      >
                        <Share />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
