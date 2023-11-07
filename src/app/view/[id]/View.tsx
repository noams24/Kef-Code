"use client";
import ImageDisplay from "@/components/ImageDisplay";
import AppDrawer from "./AppDrawer";
import { ReactInstance, useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { UserAvatar } from "@/components/UserAvatar";
import { humanize, slugify } from "@/lib/utils/textConverter";
import hebrewDateFormat from "@/lib/utils/hebrewDateFormat";
import { Box, IconButton } from "@mui/material";
import { Share, Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";

const View = ({ data, children }: any) => {
  const [open, setOpen] = useState(false);
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  //   console.log(data);
  return (
    <div dir="rtl">
      <button
        className="absolute right-10 top-23"
        onClick={() => setOpen(true)}
      >
        <AiOutlineInfoCircle className="h-8 w-8" />
      </button>
      {/*@ts-ignore*/}
      <div className="mx-36 mt-5" ref={printRef}>
        <div className="flex justify-center">
          <ImageDisplay imageUrl={data.problem.img} />
        </div>
        <div className="pt-10">{children}</div>
      </div>
      <AppDrawer isOpen={open} setOpen={setOpen}>
        <div dir="rtl" className="flex mt-3">
          {/* <FaRegUserCircle className={"mt-2 inline-block text-2xl"} /> */}
          <UserAvatar
            user={{
              name: data.user.username || null,
              image: data.user.image || null,
            }}
            className="h-12 w-12"
          />
          <div className="mr-1">
            <a
              href={`/user/${slugify(data.user.username)}`}
              className="mr-4 font-bold text-center text-lg hover:text-blue-500 dark:hover:text-blue-500"
            >
              {humanize(data.user.username)}
            </a>
            <div className="flex">
              <span className="mr-4">{hebrewDateFormat(data.createdAt)}</span>
            </div>
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            alignSelf: "flex-end",
          }}
        >
          <IconButton
            aria-label="Print"
            color="inherit"
            onClick={() => {
              window.print();
            }}
          ></IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            justifyContent: "center",
          }}
        >
          <button className="group-hover:text-slate-900">
            <Share />
          </button>
          <button
            onClick={() => {
              handlePrint();
              //   window.print();
            }}
            className="group-hover:text-slate-900"
          >
            <Print />
          </button>
        </Box>
      </AppDrawer>
    </div>
  );
};

export default View;
