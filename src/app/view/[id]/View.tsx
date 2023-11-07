"use client";
import ImageDisplay from "@/components/ImageDisplay";
import AppDrawer from "./AppDrawer";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { UserAvatar } from "@/components/UserAvatar";
import { humanize, slugify } from "@/lib/utils/textConverter";
import hebrewDateFormat from "@/lib/utils/hebrewDateFormat";
import {
  Avatar,
  Box,
  Chip,
  Fab,
  IconButton,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { Share, Print } from "@mui/icons-material";

const View = ({ data, children }: any) => {
  const [open, setOpen] = useState(false);
  console.log(data);
  return (
    <div dir="rtl" className="mt-2">
      <div>
        <button onClick={() => setOpen(true)}>
          <AiOutlineInfoCircle className="h-8 w-8" />
        </button>
      </div>
      <div className="flex justify-center">
        <ImageDisplay imageUrl={data.problem.img} />
      </div>
      <div className="pt-10">{children}</div>
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
          <button className="group-hover:text-slate-900">
            <Print />
          </button>
        </Box>
      </AppDrawer>
    </div>
  );
};

export default View;
