"use client";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { UserAvatar } from "@/components/UserAvatar";
import { humanize, slugify } from "@/lib/utils/textConverter";
import hebrewDateFormat from "@/lib/utils/hebrewDateFormat";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

import dynamic from "next/dynamic";
const PdfRenderer = dynamic(() => import("@/components/PdfRenderer"), {
  ssr: false,
});

export function ApproveProblem(data: any) {
  const { mutate: Submit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      const { data } = await axios.post("/api/approveProblem", values);
      return data;
    },
    onError: (err) => {
      toast({
        title: "שגיאה",
        description: "לא ניתן לשמור את התשובה כרגע",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "הצלחה",
        description: "הבעיה נדחתה/הועלתה",
        variant: "destructive",
      });
      window.location.reload();
    },
  });

  return (
    <div dir="rtl" className="py-3 md:mx-64 lg:mx-96 items-center">
      {data.data.map((item: any) => (
        <div key={item.id} className="border-2 shadow-lg rounded-lg mb-9">
          <div className="flex">
            <UserAvatar
              user={{
                name: item.user.username || null,
                image: item.user.image || null,
              }}
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
          <div dir="ltr">
          {item.img.endsWith("pdf") ? (
            <PdfRenderer url={item.img} />
          ) : (
            <Image src={item.img} alt={item.title} className="w-42 h-42"  />
          )}
          </div>
          {/* <Image src={item.img} alt={item.title} className="w-42 h-42" /> */}
          <p>קורס: {item.course} </p>
          <p>פרק: {item.chapter}</p>
          <p>שם השאלה: {item.title}</p>
          <p>רמת קושי: {item.difficulty}</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => Submit({ data: item, status: "cancel" })}>
              <AiOutlineClose className="h-8 w-8 text-red-500" />
              <h5>דחייה</h5>
            </button>
            <button onClick={() => Submit({ data: item, status: "approve" })}>
              <AiOutlineCheck className="h-8 w-8 text-green-500" />
              <h5>אישור</h5>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
