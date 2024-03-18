"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/table/registry/new-york/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/table/registry/new-york/ui/form";
import { Input } from "@/components/table/registry/new-york/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/table/registry/new-york/ui/select";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { difficulties } from "@/components/table/data/data";
import Notice from "@/shortcodes/Notice";
import dynamic from "next/dynamic";
import ImageDisplay from "@/components/ImageDisplay";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";

const PdfRenderer = dynamic(() => import("@/components/PdfRenderer"), {
  ssr: false,
});

const profileFormSchema = z.object({
  title: z
    .string({
      required_error: "* חובה",
    })
    .min(3, {
      message: "* שם השאלה חייב להיות לפחות 3 תווים",
    })
    .max(50, {
      message: "* שם השאלה צריך להיות עד 50 תווים",
    })
    .regex(/^[a-zA-Z0-9א-ת ]+$/, {
      message: "* שם שאלה לא תקין",
    }),
  course: z.string({
    required_error: "* נא לבחור קורס",
  }),
  chapter: z.string({
    required_error: "* נא לבחור פרק",
  }),
  difficulty: z.string({
    required_error: "* נא לבחור רמת קושי",
  }),
  date: z
    .string({
      required_error: "* נא לבחור מועד",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "* שם המועד לא תקין",
    })
    .length(7, {
      message: "* שם המועד לא תקין",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function UploadQuestion({ courses, session }: any) {
  const { loginToast } = useCustomToasts();
  const [url, setUrl] = useState<string | undefined | null>(null);
  const [isOpenCourses, setOpenCourses] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    if (!url) {
      return toast({
        title: "שגיאה",
        description: "יש להעלות תמונה לשאלה",
        variant: "destructive",
      });
    }
    Submit(data);
  }

  const { mutate: Submit, isLoading } = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const payload = { values, url };
      const { data } = await axios.post("/api/uploadproblem", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        } else if (err.response?.status === 501) {
          return toast({
            title: "שגיאה",
            description: "שם השאלה כבר קיים",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "שגיאה",
        description: "לא ניתן להעלות שאלה",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "נשמר",
        description: "השאלה נשמרה בהצלחה",
        variant: "destructive",
      });
      window.location.reload();
    },
  });

  const [chapters, setchapters] = useState([]);

  function handleCourseChange(event: any) {
    const filteredList = courses.filter(
      (item: { courseName: any }) => item.courseName === event,
    );
    setchapters(filteredList[0].chapters);
  }

  return (
    <div className="lg:mx-96 xl:mx-96 md:mx-72">
      <div dir="rtl" className="mt-4">
        <Notice type="note">מנהל האתר מאשר את השאלות</Notice>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 m-5"
          dir="rtl"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם השאלה</FormLabel>
                <FormControl className="bg-transparent border-gray-400">
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>קורס</FormLabel>
                <Popover open={isOpenCourses} onOpenChange={setOpenCourses}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between border-zinc-400",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? courses.find(
                              (course: any) =>
                                course.courseName === field.value,
                            )?.hebrew
                          : "בחר קורס"}
                        <CaretSortIcon className="h-4 w-4 -ml-0.5 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="חפש קורס" className="h-9" />
                      <CommandEmpty>הקורס לא נמצא</CommandEmpty>
                      <CommandGroup>
                        {courses.map((course: any) => (
                          <CommandItem
                            value={course.hebrew}
                            key={course.hebrew}
                            onSelect={() => {
                              form.setValue("course", course.courseName);
                              handleCourseChange(course.courseName);
                              setOpenCourses(false);
                            }}
                          >
                            {course.hebrew}
                            <CheckIcon
                              className={cn(
                                "ml-2 h-4 w-4",
                                course.courseName === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chapter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>פרק</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="border-gray-400">
                    <SelectTrigger dir="rtl">
                      <SelectValue placeholder="נא לבחור קודם קורס" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    dir="rtl"
                    className=" bg-body dark:bg-darkmode-body"
                  >
                    <div className="max-h-[400px] overflow-y-auto">
                      {chapters &&
                        chapters.map((item: any, index: number) => (
                          <SelectItem key={index} value={item.link}>
                            {item.title}
                          </SelectItem>
                        ))}
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>רמת קושי</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="border-gray-400">
                    <SelectTrigger dir="rtl">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    dir="rtl"
                    className="max-h-32 overflow-y-auto bg-body dark:bg-darkmode-body"
                  >
                    {difficulties.map(({ label, value }) => {
                      return (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>מועד</FormLabel>
                <FormControl className="bg-transparent border-gray-400">
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="hover:dark:text-sky-100 hover:dark:border-gray-500"
          >
            העלאת שאלה{" "}
          </Button>
        </form>
      </Form>

      {url && (
        <div className="my-4">
          <h4 className="flex justify-center mb-4">תצוגה מקדימה</h4>
          {url.endsWith("pdf") ? (
            <PdfRenderer url={url} />
          ) : (
            <ImageDisplay imageUrl={url} />
          )}
        </div>
      )}
      {session ? (
        <UploadDropzone
          className="mb-8 dark:border-sky-200 "
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res) {
              setUrl(res[0].fileUrl);
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          appearance={{
            button: "w-[200px] rounded-xl bg-blue-500",
          }}
        />
      ) : (
        <h4 className="flex justify-end">יש להתחבר כדי להעלות שאלה</h4>
      )}
    </div>
  );
}
