"use client";

import { Button } from "@/components/ui/Button2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UsernameValidator = z.object({
  name: z
    .string()
    .min(3, {
      message: "* שם המשתמש צריך להיות לפחות באורך 3",
    })
    .max(20, {
      message: "* שם המשתמש צריך להיות פחות מאורך 20",
    })
    .regex(/^[a-zA-Z0-9_א-ת]+$/, "שם לא תיקני"),
});

type FormData = z.infer<typeof UsernameValidator>;

export default function FirstTime() {
  const firstTime = localStorage.getItem("firstTime");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    mode: "onChange",
    defaultValues: {
      name: "",
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
      localStorage.setItem("firstTime", "2");
      // wait 3 seconds and then reload page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });

  return (
    <Dialog open={firstTime === "1"}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div
            onClick={() => {localStorage.setItem("firstTime", "2"), window.location.reload()}}
            className="hover:cursor-pointer absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </div>
          <DialogTitle>ברוכים הבאים לכיף קוד!</DialogTitle>
          <DialogDescription>בחירת שם משתמש:</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              שם:
            </Label> */}
            <form onSubmit={handleSubmit((e) => updateUsername(e))}>
              <div className="mb-6">
                <div className="flex justify-between gap-4">
                  <Input
                    id="name"
                    className="col-span-3 min-w-[270px] font-arial"
                    placeholder="שם משתמש"
                    type="text"
                    {...register("name")}
                  />
                  <Button type="submit">שמירה</Button>
                </div>
              </div>
              {errors?.name && (
                <p className=" w-[700px] text-red-600 text-xs -mt-5">
                  {errors.name.message}
                </p>
              )}
            </form>
          </div>
        </div>
        <DialogFooter>
          <p className="absolute bottom-7 right-7 text-xs">
            ניתן גם להחליט מאוחר יותר
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
