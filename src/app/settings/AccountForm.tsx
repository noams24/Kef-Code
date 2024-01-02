"use client";
// import { Input } from "@/components/ui/Input";
import SeoMeta from "@/partials/SeoMeta";
import PageHeader from "@/partials/PageHeader";
import { UploadDropzone } from "@/lib/uploadthing";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { cancelSubscription, getSubscription } from "../action";
import hebrewDateFormat from "@/lib/utils/hebrewDateFormat";
import Link from "next/link";
import { X } from "lucide-react";
import { QueryContext } from "@/partials/ChildrenProviders";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useContext } from "react";

const UsernameValidator = z.object({
  name: z.string().min(3).max(32),
  // .regex(/^[a-zA-Z0-9_]+$/),
});

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "username">;
}

type FormData = z.infer<typeof UsernameValidator>;

const AccountForm = ({ user, className, ...props }: UserNameFormProps) => {
  const router = useRouter();
  const queryClient = useContext(QueryContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  });

  const { data: existSubscription, isFetched } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const data = getSubscription(user.id);
      return data;
    },
  });

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: FormData) => {
      const payload: FormData = { name };

      const { data } = await axios.patch(`/api/changeUserName/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "שם המשתמש תפוס",
            description: "נא לבחור שם אחר",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "שגיאה",
        description: "שם המשתמש לא עודכן בהצלחה, נסה שוב יותר מאוחר",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "שם המשתמש שונה בהצלחה",
      });
      router.refresh();
    },
  });

  const { mutate: uploadImage } = useMutation({
    mutationFn: async (url) => {
      const { data } = await axios.patch(`/api/changeUserImage/`, { url });
      return data;
    },
    onError: (err) => {
      return toast({
        title: "שגיאה",
        description: "לא ניתן להחליף תמונה, נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "תמונתך שונתה בהצלחה",
      });
      router.refresh();
    },
  });

  const handleCancel = async () => {
    const isCancled = await cancelSubscription(user.id)
    queryClient.invalidateQueries({ queryKey: ["subscription"] });
    if (isCancled === 'failed') {
      toast({
        title: "שגיאה",
        description: "לא ניתן לבטל את המנוי כרגע, נסה שוב מאוחר יותר",
        variant: "destructive",
      });
  }
  else{
    toast({
      title: "הצלחה",
      description: "המנוי בוטל בהצלחה",
      variant: "destructive",
    });
  }
}


  return (
    <>
      <SeoMeta title="הגדרות" meta_title="הגדרות" description="הגדרות" />
      <Modal
        dir="rtl"
        isDismissable={false}
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        hideCloseButton={true}
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-black dark:border-white bg-white dark:bg-neutral-700  rounded-lg shadow-lg",
          header: "border-b-[1px]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <button
                  className="h-6 w-6 p-0 rounded-md dark:bg-zinc-700 dark:text-white"
                  onClick={onClose}
                >
                  <X aria-label="close modal" className="h-6 w-6" />
                </button>
                <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                  <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight"></h1>
                    <p className="text-sm max-w-xs mx-auto">
                      האם אתה בטוח שאתה רוצה לבטל את המנוי?
                    </p>
                    <div className="flex justify-center">
                      <button onClick={()=>{handleCancel(), onClose()}}
                       className="bg-red-500 rounded-[5px] h-10 w-32 text-[#fff] text-[14px] leading-[17px] font-semibold mt-3">
                        אישור
                      </button>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
      <PageHeader title="הגדרות" />
      {/* <section dir="rtl" className="section-sm mx-96"> */}
      <section dir="rtl" className="mx-80 mt-5">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              {/* <form onSubmit={updateUsername} method="POST"> */}
              {/* <form onSubmit={handleSubmit} > */}
              <form
                onSubmit={handleSubmit((e) => updateUsername(e))}
                {...props}
              >
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    שם משתמש
                  </label>
                  <div className="flex gap-4">
                    <input
                      id="name"
                      className="form-input font-primary"
                      placeholder="שם משתמש"
                      type="text"
                      {...register("name")}
                    />
                    {errors?.name && (
                      <p className="px-1 text-xs text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn border-1 border-gray-200"
                    >
                      שנה
                    </button>
                  </div>
                </div>
              </form>
              <hr className="my-5 border-t-1 border-t-gray-400"></hr>
              <label htmlFor="name" className="form-label">
                תמונה
              </label>
              <UploadDropzone
                className="dark:border-sky-200"
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  uploadImage(res[0].fileUrl);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <h3>המנוי שלך</h3>
          {existSubscription ? (
            <div>
              <p>
                {existSubscription.subscriptionType === "MONTH"
                  ? "מנוי חודשי"
                  : "מנוי שנתי"}
              </p>
              <div className="flex gap-2">
                <p>תאריך התחלה: </p>
                <span>
                  {hebrewDateFormat(
                    JSON.stringify(existSubscription.startDate).replaceAll(
                      '"',
                      "",
                    ),
                  )}
                </span>
              </div>
              <div className="flex gap-2">
                <p>תאריך סיום: </p>
                <span>
                  {hebrewDateFormat(
                    JSON.stringify(existSubscription.endDate).replaceAll(
                      '"',
                      "",
                    ),
                  )}
                </span>
              </div>
              <div className="flex gap-2">
                <p> עלות:</p>
                <p>{existSubscription.amount} ₪</p>
              </div>
              <button
                onClick={onOpen}
                className="bg-red-500 rounded-[5px] h-10 w-32 text-[#fff] text-[14px] leading-[17px] font-semibold mt-3"
              >
                בטל מנוי
              </button>
            </div>
          ) : (
            <div>
              <p>אין לך מנוי</p>
              <Link href={"/subscription"}>
                <button className="bg-[#006EF5] rounded-[5px] h-10 w-32 text-[#fff] text-[14px] leading-[17px] font-semibold mt-3">
                  שדרג לפרמיום
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AccountForm;
