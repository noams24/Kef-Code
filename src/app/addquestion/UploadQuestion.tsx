"use client";

// import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// import { cn } from "@/lib/utils";
import { Button } from "@/components/table/registry/new-york/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
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
// import { Textarea } from "@/components/table/registry/new-york/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";
import "@uploadthing/react/styles.css";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { difficulties } from "@/components/table/data/data";
import Notice from "@/shortcodes/Notice";

const profileFormSchema = z.object({
  title: z
    .string({
      required_error: "* חובה",
    })
    .min(3, {
      message: "* שם השאלה חייב להיות לפחות 3 תווים",
    })
    .max(15, {
      message: "* שם השאלה צריך להיות עד 20 תווים",
    }).regex(/^[a-zA-Z0-9א-ת ]+$/, {
      message: "* שם שאלה לא תקין"
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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function UploadQuestion(courses: any) {
  const { loginToast } = useCustomToasts();
  const [url, setUrl] = useState<string | undefined>();

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
      window.location.reload()
    },
  });

  let mappedCourses: any = null;
  if (Array.isArray(courses.courses)) {
    mappedCourses = courses.courses.map((item: any, index: number) => (
      <SelectItem key={index} value={item.courseName}>
        {item.hebrew}
      </SelectItem>
    ));
  }

  const [chapters, setchapters] = useState([]);

  function handleCourseChange(event: any) {
    const filteredList = courses.courses.filter(
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
              <FormItem>
                <FormLabel>קורס</FormLabel>
                <Select
                  onValueChange={(event) => {
                    field.onChange(event);
                    handleCourseChange(event);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl className="border-gray-400">
                    <SelectTrigger dir="rtl">
                      <SelectValue placeholder="בחר קורס" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    dir="rtl"
                    className="max-h-32 overflow-y-auto bg-body dark:bg-darkmode-body"
                  >
                    {mappedCourses}
                  </SelectContent>
                </Select>
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
                    className="max-h-32 overflow-y-auto bg-body dark:bg-darkmode-body"
                  >
                    {/* <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem> */}
                    {chapters &&
                      chapters.map((item: any, index: number) => (
                        <SelectItem key={index} value={item.link}>
                          {item.title}
                        </SelectItem>
                      ))}
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

          <Button
            type="submit"
            disabled={isLoading}
            className="hover:dark:text-sky-100 hover:dark:border-gray-500"
          >
            העלאת שאלה{" "}
          </Button>
        </form>
      </Form>
      <UploadDropzone
        className="mb-8 dark:border-sky-200"
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
      />
    </div>
  );
}
